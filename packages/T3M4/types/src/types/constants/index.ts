export type DEFAULT = "default";

export type COLOR_SCHEMES = {
  light: "light";
  dark: "dark";
};
export type COLOR_SCHEME = COLOR_SCHEMES[keyof COLOR_SCHEMES];

export type MODES = COLOR_SCHEMES & {
  system: "system";
};
export type MODE = MODES[keyof MODES];

export type STRATS = {
  mono: "mono";
  multi: "multi";
  system: "system";
};
export type STRAT = STRATS[keyof STRATS];

export type CONTROLLER = {
  class: "class"
  data_attribute: 'data-attribute',
  attribute: 'attribute'
}
export type CS_INDICATOR = CONTROLLER[keyof CONTROLLER];