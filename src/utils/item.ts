import { ItemModel, KeyedItem } from '@/models/item'
import { Row, Table } from '@deephaven/jsapi-types'

/**
 * Create a `rowToKeyedItem` function.
 * @param table
 */
export function createRowToKeyedItem(table: Table, offset: number) {
  return function rowToKeyedItem(
    row: Row & { offsetInSnapshot: number },
  ): KeyedItem<ItemModel> {
    const item = table.columns.reduce((item, col) => {
      item[col.name] = row.get(col)
      return item
    }, {} as ItemModel)

    return { key: String(offset + row.offsetInSnapshot), item }
  }
}
