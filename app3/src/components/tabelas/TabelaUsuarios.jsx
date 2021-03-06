import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TabelaUsuarios(props) {
  const theme = useTheme();

  const themeWithLocale = React.useMemo(() =>
    createTheme(theme, locales["ptBR"])
  );

  const columns = [
    { id: "name", label: "Nome", minWidth: 100 },
    { id: "funcao", label: "Função", minWidth: 170 },
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

  function remove(usuario) {
    console.log(usuario);
    const baseApiUrl = 'https://teste-producao1.herokuapp.com';
    const id = usuario.id;
    axios
      .delete(`${baseApiUrl}/users/${id}`)
      .then(() => {
        notify("success");
        props.recarregar()
      })
      .catch();
  }

  const notify = (tipo) => {
    if (tipo === "success") {
      toast.success("Cliente excluido com sucesso!");
    } else {
      toast.error("");
    }
  };

  const rows = props.usuarios;

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <ThemeProvider theme={themeWithLocale}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {[...columns, {id:"acao", label: "", minWidth:100}].map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return <TableCell key={column.id}>{value}</TableCell>;
                        })}
                        <Button
                          variant="outlined"
                          onClick={() => remove(row)}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.usuarios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePagina}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </ThemeProvider>
      </Paper>
      <ToastContainer />
    </>
  );
}
