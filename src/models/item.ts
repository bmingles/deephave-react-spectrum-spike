export type ItemModel = Record<string, unknown> & { _offsetInSnapshot?: number }

export interface KeyedItem<T> {
  key: string
  item: T
}
