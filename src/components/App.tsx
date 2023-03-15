import React from "react";
import { Button } from "@adobe/react-spectrum";
import { useRemoteTable } from "@/utils/useRemoteTable.hook";
import { useRows } from "@/utils/useRows.hook";

function App() {
  const table = useRemoteTable("remote_table");
  const rows = useRows(table, 0, 9);

  console.log(table, rows);

  return (
    <>
      <table>
        <thead>
          <tr>
            {table?.columns.map((col) => (
              <th key={col.name}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {table?.columns.map((col) => (
                <td key={col.name}>{String(row.get(col))}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Button variant="accent" onPress={() => console.log("test")}>
        Click me
      </Button>
    </>
  );
}

export default App;
