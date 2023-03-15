import dh from "@/dh";
import { RemoverFn, Row, Table } from "@deephaven/jsapi-types";
import React from "react";

export function useRows(
  table: Table | null,
  firstRow: number,
  lastRow: number
): Row[] {
  const [rows, setRows] = React.useState<Row[]>([]);
  const removerFnRef = React.useRef<RemoverFn>();

  React.useEffect(() => {
    if (!table) {
      return;
    }

    removerFnRef.current = table.addEventListener(
      dh.Table.EVENT_UPDATED,
      (event) => {
        const rows: Row[] = event.detail.rows;
        setRows(rows);
      }
    );

    table.setViewport(firstRow, lastRow);

    return () => {
      removerFnRef.current?.();
    };
  }, [table]);

  return rows;
}
