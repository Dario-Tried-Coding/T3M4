import { Options, Schema } from "@t3m4/types";

export function buildOptions(schema: Schema.Generic) {
  return Object.entries(schema).reduce((opts, [i, { mode, facets }]) => {
    const iOpts: Options.AsObj[keyof Options.AsObj] = {};

    if (mode) {
      if (typeof mode === "string") iOpts.mode = [mode];
      else if (Array.isArray(mode)) iOpts.mode = mode;
      else
        iOpts.mode = [
          mode.light,
          mode.dark,
          ...(mode.system ? [mode.system] : []),
          ...(mode.custom ? mode.custom : []),
        ];
    }

    if (facets)
      iOpts.facets = Object.entries(facets).reduce(
        (fOpts, [f, fSchema]) => {
          if (typeof fSchema === "string") fOpts[f] = [fSchema];
          else fOpts[f] = fSchema;

          return fOpts;
        },
        {} as Record<string, Array<string>>,
      );
    
    opts[i] = iOpts
    return opts;
  }, {} as Options.AsObj);
}
