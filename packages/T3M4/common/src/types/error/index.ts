import { Config, Schema } from "@t3m4/types";
import { ErrorCode } from "./error-codes";

export type PathSegment = string | number;
export type ErrorSeverity = "error";

export interface ValidationError {
  code: ErrorCode;
  severity: ErrorSeverity;
  message: string;
  path: PathSegment[];
  value: unknown;
}

export interface ValidationResult<Valid extends Schema.Generic | Config.Static> {
  ok: boolean; // true se nessun errore
  value: Valid; // oggetto sanificato (anche se ok=false)
  errors: ValidationError[];
}
