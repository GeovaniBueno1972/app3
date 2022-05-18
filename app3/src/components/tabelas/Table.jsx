import { Delete } from "@mui/icons-material";
import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

/**
 * @typedef Column
 * @property {string} id
 * @property {string} label
 * @property {number} minWidth
 */

/**
 * @typedef TableProps
 * @property {Column[]} columns
 * @property {Function} remove
 * @property {Function} notify
 * @property {Object[]} rows
 *
 */
// const columns = [
//   { id: "numero", label: "Número", minWidth: 10 },
//   { id: "data_lancamento", label: "Data de lançamento", minWidth: 30 },
//   { id: "data_entrega", label: "Data de entrega", minWidth: 30 },
//   { id: "usuario", label: "Vendedor", minWidth: 50 },
//   { id: "cliente", label: "Cliente", minWidth: 50 },
//   { id: "bairro", label: "Bairro", minWidth: 50 },
//   { id: "estado", label: "Situação", minWidth: 50 },
// ];

// function remove(cliente) {
//   console.log(cliente);
//   const baseApiUrl = "https://teste-producao1.herokuapp.com";
//   const id = cliente.id;
//   axios
//     .delete(`${baseApiUrl}/clientes/${id}`)
//     .then(() => {
//       notify("success");
//       props.recarregar();
//     })
//     .catch();
// }

// const notify = (tipo) => {
//   if (tipo === "success") {
//     toast.success("Cliente excluido com sucesso!");
//   } else {
//     toast.error("");
//   }
// };

export default function Table({ columns, remove, rows }) {
  const [page, setPagina] = useState(0);
  const [rowsPerPage, setLinhasPorPagina] = useState(10);

  const handleChangePagina = (event, newPage) => {
    setPagina(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLinhasPorPagina(+event.target.value);
    setPagina(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {[...columns, { id: "acao", label: "", minWidth: 100 }].map(
                (column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => remove(row)}
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePagina}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
