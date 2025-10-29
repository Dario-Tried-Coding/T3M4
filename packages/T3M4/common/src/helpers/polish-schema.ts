import { Schema } from "@t3m4/types";

// ---------- helpers ----------
const RESERVED_KEYS = new Set(["__proto__", "prototype", "constructor"]);

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && Object.getPrototypeOf(v) === Object.prototype;
}

function normKey(k: unknown): string | null {
  if (typeof k !== "string") return null;
  const s = k.trim().toLowerCase();
  if (!s || RESERVED_KEYS.has(s)) return null;
  return s;
}

function normStr(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim().toLowerCase();
  return s || null;
}

function toStringArraySafe(v: unknown): string[] | null {
  if (typeof v === "string") {
    const s = normStr(v);
    return s ? [s] : null;
  }
  if (Array.isArray(v)) {
    const out: string[] = [];
    const seen = new Set<string>();
    for (const x of v) {
      const s = normStr(x);
      if (s && !seen.has(s)) {
        seen.add(s);
        out.push(s);
      }
    }
    return out.length ? out : null;
  }
  return null;
}

function mergeStringArraysCaseInsensitive(a: string[] | null, b: string[] | null): string[] | null {
  if (!a && !b) return null;
  const out: string[] = [];
  const seen = new Set<string>();
  for (const arr of [a, b]) {
    if (!arr) continue;
    for (const s of arr) {
      if (!seen.has(s)) {
        seen.add(s);
        out.push(s);
      }
    }
  }
  return out.length ? out : null;
}

// Keep 1 => string, >1 => array
function packStrOrArray(items: string[]): string | string[] {
  return items.length === 1 ? items[0]! : items;
}

function sanitizeFacets(input: unknown): Schema.Generic.Island["facets"] | null {
  if (!isPlainObject(input)) return null;
  const out: Record<string, string | string[]> = {};
  for (const rawFacetKey in input) {
    const facetKey = normKey(rawFacetKey);
    if (!facetKey) continue;

    const val = (input as Record<string, unknown>)[rawFacetKey];
    const arr = toStringArraySafe(val);
    if (!arr) continue;

    // merge con facet esistenti che differivano solo per il case
    const existing = out[facetKey];
    if (existing) {
      const merged = mergeStringArraysCaseInsensitive(Array.isArray(existing) ? existing : [existing], arr)!;
      out[facetKey] = packStrOrArray(merged);
    } else {
      out[facetKey] = packStrOrArray(arr);
    }
  }
  return Object.keys(out).length ? out : null;
}

function sanitizeMode(input: unknown): Schema.Generic.Island.Facets.Mode | null {
  // string / array branch
  const asList = toStringArraySafe(input);
  if (asList) {
    return asList.length ? packStrOrArray(asList) : null;
  }

  // object branch
  if (!isPlainObject(input)) return null;

  // Prendiamo solo le chiavi consentite
  const light = normStr((input as any).light);
  const dark = normStr((input as any).dark);
  const system = normStr((input as any).system);

  // custom
  let custom = toStringArraySafe((input as any).custom);

  // se mancano i campi obbligatori, l'intero mode oggetto è invalido
  if (!light || !dark) return null;

  // rimuovi riservati da custom
  if (custom) {
    const filtered = custom.filter((s) => s !== "light" && s !== "dark" && s !== "system");
    custom = filtered.length ? filtered : null;
  }

  const out: Schema.Generic.Island.Facets.Mode.System = { light, dark };
  if (system) out.system = system;
  if (custom) out.custom = custom;
  return out;
}

// Merge di 2 "mode" già sanificati, preferendo il primo valido (per evitare override sorprendenti).
function mergeMode(
  a: ReturnType<typeof sanitizeMode>,
  b: ReturnType<typeof sanitizeMode>,
): ReturnType<typeof sanitizeMode> {
  if (a && b) {
    // Se entrambi presenti:
    // - se sono string/array, uniamo come lista deduplicata e ripackiamo
    const listA = toStringArraySafe(a);
    const listB = toStringArraySafe(b);
    if (listA && listB) {
      const merged = mergeStringArraysCaseInsensitive(listA, listB)!;
      return packStrOrArray(merged);
    }
    if (listA && !listB) return a; // preferiamo A
    if (!listA && listB) return b; // se A era oggetto e B lista, potresti preferire oggetto; qui scegliamo B per semplicità
    // Entrambi oggetti: preferiamo A (prima definizione vince)
    return a;
  }
  return a ?? b ?? null;
}

// ---------- main ----------
export function polishSchema(input: unknown): Schema.Generic {
  const safeRoot: Schema.Generic = {};

  if (!isPlainObject(input)) return safeRoot;

  // mappa provvisoria per unire island con chiavi che differiscono solo per case/whitespace
  const islandsAcc: Record<string, Pick<Schema.Generic.Island, "facets"> & { mode?: any }> = {};

  for (const rawIslandKey in input) {
    const islandKey = normKey(rawIslandKey);
    if (!islandKey) continue;

    const islandVal = (input as Record<string, unknown>)[rawIslandKey];
    if (!isPlainObject(islandVal)) continue;

    // prendi solo facets e mode
    const facets = sanitizeFacets((islandVal as any).facets);
    const mode = sanitizeMode((islandVal as any).mode);

    // se entrambi null → island vuota → skip
    if (!facets && !mode) continue;

    // merge con eventuale island già presente (collisione case-insensitive)
    const prev = islandsAcc[islandKey];
    if (prev) {
      // merge facets
      if (facets) {
        const mergedFacets: Record<string, Schema.Generic.Island.Facets.Facet> = prev.facets ? { ...prev.facets } : {};
        for (const fk in facets) {
          const v = facets[fk]!;
          if (mergedFacets[fk]) {
            const vArr = toStringArraySafe(v)!;
            const prevArr = toStringArraySafe(mergedFacets[fk])!;
            const merged = mergeStringArraysCaseInsensitive(prevArr, vArr)!;
            mergedFacets[fk] = packStrOrArray(merged);
          } else {
            mergedFacets[fk] = v;
          }
        }
        prev.facets = Object.keys(mergedFacets).length ? mergedFacets : undefined;
      }
      // merge mode
      if (mode) {
        prev.mode = mergeMode(prev.mode ? sanitizeMode(prev.mode) : null, mode) ?? prev.mode;
      }
    } else {
      islandsAcc[islandKey] = { ...(facets ? { facets } : {}), ...(mode ? { mode } : {}) };
    }
  }

  // Copia finale
  for (const key in islandsAcc) {
    const node = islandsAcc[key]!;
    if (!node.facets && !node.mode) continue;
    safeRoot[key] = {};
    if (node.facets) safeRoot[key]!.facets = node.facets;
    if (node.mode) safeRoot[key]!.mode = node.mode;
  }

  return safeRoot;
}
