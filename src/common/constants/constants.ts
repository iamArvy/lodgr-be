export const DEFAULTS = {
  items_per_page: 20,
  max_page_size: 100,
} as const;

export type Defaults = typeof DEFAULTS;
