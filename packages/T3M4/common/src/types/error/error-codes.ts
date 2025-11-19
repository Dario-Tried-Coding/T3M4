export type SchemaValidationErrorCode =
  // root
  | "ROOT_NOT_OBJECT"
  | "ROOT_IS_ARRAY"

  // island key (chiave di primo livello)
  | "ISLAND_KEY_EMPTY"
  | "ISLAND_KEY_HAS_SPACES"

  // island value (valore di primo livello)
  | "ISLAND_VALUE_NOT_OBJECT"
  | "ISLAND_VALUE_IS_ARRAY"
  | "ISLAND_UNKNOWN_KEY"
  | "ISLAND_EMPTY_OBJECT" // nessuna delle due: né facets né mode

  // facets (proprietà dell'island)
  | "FACETS_NOT_OBJECT"
  | "FACETS_IS_ARRAY"
  | "FACETS_EMPTY"

  // singoli facet
  | "FACET_KEY_EMPTY"
  | "FACET_KEY_HAS_SPACES"
  | "FACET_VALUE_INVALID_TYPE" // non string e non string[]
  | "FACET_VALUE_STRING_EMPTY"
  | "FACET_VALUE_ARRAY_EMPTY"
  | "FACET_VALUE_ARRAY_INVALID_ITEM" // elemento non string o string vuota

  // mode (proprietà dell'island, tipo di base)
  | "MODE_INVALID_TYPE" // non string, non array, non object

  // mode come string
  | "MODE_STRING_EMPTY"

  // mode come string[]
  | "MODE_ARRAY_EMPTY"
  | "MODE_ARRAY_INVALID_ITEM" // non string o string vuota

  // mode come oggetto
  | "MODE_OBJECT_NOT_OBJECT"
  | "MODE_OBJECT_IS_ARRAY"
  | "MODE_OBJECT_MISSING_LIGHT"
  | "MODE_OBJECT_MISSING_DARK"
  | "MODE_OBJECT_LIGHT_EMPTY"
  | "MODE_OBJECT_DARK_EMPTY"
  | "MODE_OBJECT_SYSTEM_EMPTY"
  | "MODE_OBJECT_CUSTOM_NOT_ARRAY"
  | "MODE_OBJECT_CUSTOM_EMPTY"
  | "MODE_OBJECT_CUSTOM_INVALID_ITEM"; // non string o string vuota

export type ConfigValidationErrorCode =
  // ---------- ROOT / STRUTTURA GENERALE ----------
  | "CONFIG_ROOT_NOT_OBJECT" // config non è un object
  | "CONFIG_ROOT_IS_ARRAY" // config è un array
  | "CONFIG_ISLAND_MISSING" // island presente in schema, assente in config
  | "CONFIG_ISLAND_UNKNOWN" // island presente in config, assente in schema
  | "CONFIG_ISLAND_NOT_OBJECT" // valore island in config non è object
  | "CONFIG_ISLAND_IS_ARRAY" // valore island è array
  | "CONFIG_ISLAND_EMPTY" // valore island è vuoto (né facets né mode)

  // ---------- FACETS: PRESENZA / STRUTTURA ----------
  | "CONFIG_FACETS_MISSING" // schema ha facets, config no
  | "CONFIG_FACETS_UNEXPECTED" // config ha facets ma schema no
  | "CONFIG_FACETS_NOT_OBJECT" // config.facets non è object
  | "CONFIG_FACETS_IS_ARRAY" // config.facets è array
  | "CONFIG_FACET_MISSING" // facet presente in schema, assente in config
  | "CONFIG_FACET_UNEXPECTED" // facet presente in config, assente in schema
  | "CONFIG_FACET_CONFIG_NOT_OBJECT" // config.facets[facet] non è object
  | "CONFIG_FACET_CONFIG_IS_ARRAY" // config.facets[facet] è array

  // ---------- FACET: VALORI ----------
  | "CONFIG_FACET_DEFAULT_MISSING" // manca "default"
  | "CONFIG_FACET_DEFAULT_INVALID_TYPE" // default non è string
  | "CONFIG_FACET_DEFAULT_NOT_ALLOWED" // default non combacia con lo schema (string singola o una dell'array)
  | "CONFIG_FACET_STORE_INVALID_TYPE" // store definito ma non boolean
  | "CONFIG_FACET_UNKNOWN_KEY" // chiave extra in config.facets[facet]

  // ---------- MODE: PRESENZA / STRUTTURA ----------
  | "CONFIG_MODE_MISSING" // schema ha mode, config no
  | "CONFIG_MODE_UNKNOWN" // config ha mode, schema no
  | "CONFIG_MODE_UNKNOWN_KEY" // chiave extra in config.mode
  | "CONFIG_MODE_UNEXPECTED" // schema non ha mode, config sì
  | "CONFIG_MODE_NOT_OBJECT" // config.mode non è object
  | "CONFIG_MODE_IS_ARRAY" // config.mode è array
  | "CONFIG_MODE_STORE_INVALID_TYPE" // mode.store definito ma non boolean
  | "CONFIG_MODE_CONTROLLER_INVALID_TYPE" // mode.controller non è string né string[]
  | "CONFIG_MODE_CONTROLLER_ARRAY_EMPTY" // controller come array ma vuoto
  | "CONFIG_MODE_CONTROLLER_INVALID_VALUE" // string non è "class"|"attribute"|"data-attribute"
  | "CONFIG_MODE_CONTROLLER_ARRAY_INVALID_ITEM" // item non string o non valido

  // ---------- MODE: CASO schema.mode = string ----------
  | "CONFIG_MODE_STRING_SHAPE_INVALID" // la forma non è { default, colorScheme } (+ opzionali store/controller)
  | "CONFIG_MODE_STRING_DEFAULT_EMPTY" // mode string vuota
  | "CONFIG_MODE_STRING_DEFAULT_MISSING" // manca default
  | "CONFIG_MODE_STRING_DEFAULT_INVALID_TYPE" // default non string
  | "CONFIG_MODE_STRING_DEFAULT_MISMATCH" // default != schema.mode (string)
  | "CONFIG_MODE_STRING_COLOR_SCHEME_MISSING" // manca colorScheme
  | "CONFIG_MODE_STRING_COLOR_SCHEME_INVALID" // colorScheme non "light"|"dark"

  // ---------- MODE: CASO schema.mode = string[] ----------
  | "CONFIG_MODE_ARRAY_SHAPE_INVALID" // forma non è { default, colorSchemes }
  | "CONFIG_MODE_ARRAY_DEFAULT_MISSING"
  | "CONFIG_MODE_ARRAY_DEFAULT_INVALID"
  | "CONFIG_MODE_ARRAY_DEFAULT_NOT_IN_OPTIONS" // default non è tra le stringhe dello schema
  | "CONFIG_MODE_ARRAY_COLOR_SCHEMES_MISSING" // manca colorSchemes
  | "CONFIG_MODE_ARRAY_COLOR_SCHEMES_NOT_OBJECT" // colorSchemes non è object
  | "CONFIG_MODE_ARRAY_COLOR_SCHEMES_IS_ARRAY" // colorSchemes è array
  | "CONFIG_MODE_ARRAY_COLOR_SCHEMES_KEY_MISSING" // manca una chiave presente in schema.mode[]
  | "CONFIG_MODE_ARRAY_COLOR_SCHEMES_UNEXPECTED_KEY" // chiave extra non presente in schema.mode[]
  | "CONFIG_MODE_ARRAY_COLOR_SCHEMES_INVALID_VALUE" // valore non "light"|"dark"

  // ---------- MODE: CASO schema.mode = object ----------
  | "CONFIG_MODE_OBJECT_SHAPE_INVALID" // forma non è { default, fallback?, colorSchemes? }
  | "CONFIG_MODE_OBJECT_DEFAULT_MISSING"
  | "CONFIG_MODE_OBJECT_DEFAULT_INVALID"
  | "CONFIG_MODE_OBJECT_DEFAULT_NOT_IN_ALLOWED_SET" // non è light/dark/system/custom[*]
  | "CONFIG_MODE_OBJECT_FALLBACK_MISSING_WHEN_SYSTEM" // schema ha system, ma fallback manca
  | "CONFIG_MODE_OBJECT_FALLBACK_INVALID"
  | "CONFIG_MODE_OBJECT_FALLBACK_UNEXPECTED" // schema non ha system, ma c'è fallback
  | "CONFIG_MODE_OBJECT_FALLBACK_NOT_IN_ALLOWED_SET" // non è light/dark/custom[*]
  | "CONFIG_MODE_OBJECT_COLOR_SCHEMES_REQUIRED_BUT_MISSING" // schema ha custom, ma manca colorSchemes
  | "CONFIG_MODE_OBJECT_COLOR_SCHEMES_NOT_OBJECT"
  | "CONFIG_MODE_OBJECT_COLOR_SCHEMES_IS_ARRAY"
  | "CONFIG_MODE_OBJECT_COLOR_SCHEMES_KEY_MISSING" // manca una chiave custom[*]
  | "CONFIG_MODE_OBJECT_COLOR_SCHEMES_UNEXPECTED_KEY" // chiave extra non in custom[*]
  | "CONFIG_MODE_OBJECT_COLOR_SCHEMES_INVALID_VALUE"; // valore non "light"|"dark"

export type ErrorCode = SchemaValidationErrorCode | ConfigValidationErrorCode;
