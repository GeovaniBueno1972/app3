import { Delete } from "@mui/icons-material";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TabelaMateriais(props) {
  const columns = [
    { id: "codigo", label: "Código", minWidth: 20 },
    { id: "nome", label: "Nome", minWidth: 200 },
    { id: "unidade", label: "unidade", minWidth: 20 },
  ];

  const [page, setPagina] = React.useState(0);
  const [rowsPerPage, setLinhasPorPagina] = React.useState(10);

  const handleChangePagina = (event, newPage) => {
    setPagina(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLinhasPorPagina(+event.target.value);
    setPagina(0);
  };

  function remove(material) {
    console.log(material);
    const baseApiUrl = "https://teste-producao1.herokuapp.com";
    const id = material.codigo;
    axios
      .delete(`${baseApiUrl}/materiais/${id}`)
      .then(() => {
        notify("success");
        props.recarregar();
      })
      .catch();
  }

  const notify = (tipo) => {
    if (tipo === "success") {
      toast.success("Material excluido com sucesso!");
    } else {
      toast.error("");
    }
  };

  const rows = props.materiais;

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
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
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.materiais.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePagina}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ToastContainer />
    </>
  );
}
