export type ErrorCode =
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
