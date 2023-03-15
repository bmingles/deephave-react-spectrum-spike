import dh from "@/dh";
import create_remote_table_script from "@/assets/remote_table.py?raw";

export async function initIDESession() {
  const client = new dh.CoreClient(
    window.location.protocol + "//" + window.location.host
  );

  await client.login({ type: dh.CoreClient.LOGIN_TYPE_ANONYMOUS });
  const cn = await client.getAsIdeConnection();
  const ideSession = await cn.startSession("python");

  // Create a table
  await ideSession.runCode(create_remote_table_script);

  return ideSession;
}

// export function useRemoteTable2() {
//   const [table, setTable] = React.useState<Table | null>(null);
//   const [rows, setRows] = React.useState<Row[]>([]);

//   async function init() {
//     const ide = await initIDESession();
//     await ide.runCode(create_remote_table_script);
//     const table = await ide.getTable("remote_table");
//     setTable(table);

//     table.addEventListener(dh.Table.EVENT_UPDATED, (event) => {
//       const rows: Row[] = event.detail.rows;
//       setRows(rows);
//     });

//     table.setViewport(0, 9);
//   }

//   React.useEffect(() => {
//     void init();
//   }, []);

//   return { table, rows };
// }
