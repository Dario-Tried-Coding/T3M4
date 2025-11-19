import { Config, Schema } from "@t3m4/types";
import { PathSegment, ValidationError, ValidationResult } from "../types/error";
import { ErrorCode } from "../types/error/error-codes";

export function createError(params: {
  code: ErrorCode;
  path: PathSegment[];
  value: unknown;
  message: string;
}): ValidationError {
  return {
    code: params.code,
    severity: "error",
    path: params.path,
    value: params.value,
    message: params.message,
  };
}

export function pushError(errors: ValidationError[], error: ValidationError): void {
  errors.push(error);
}

function groupErrorsByIsland(errors: ValidationError[]) {
  const groups: Record<string, ValidationError[]> = {};

  for (const e of errors) {
    const island = e.path[0] ?? "root";

    if (!groups[island]) groups[island] = [];
    groups[island].push(e);
  }

  return groups;
}

export function logValidationResult(result: ValidationResult<Schema.Generic | Config.Static>) {
  if (result.ok) return;

  const groups = groupErrorsByIsland(result.errors);

  for (const [island, errs] of Object.entries(groups)) {
    console.log(`\n\x1b[31m✖ Errors in island "${island}":\x1b[0m\n`);

    for (const e of errs) {
      const path = e.path.join(" > ");
      console.log(`  • ${e.message}\n    ↳ Path: ${path}\n    ↳ Code: ${e.code}\n`);
    }
  }
}
