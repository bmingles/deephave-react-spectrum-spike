import { ItemModel } from '@/models/item'
import { Row, Table } from '@deephaven/jsapi-types'

export function toItem(table: Table) {
  return (row: Row & { offsetInSnapshot: number }): ItemModel => {
    const item = table.columns.reduce((item, col) => {
      item[col.name] = row.get(col)
      return item
    }, {} as ItemModel)

    item._offsetInSnapshot = row.offsetInSnapshot

    return item
  }
}

export function toItemList(
  table: Table,
  rows: (Row & { offsetInSnapshot: number })[],
): ItemModel[] {
  return rows.map(toItem(table))
}
