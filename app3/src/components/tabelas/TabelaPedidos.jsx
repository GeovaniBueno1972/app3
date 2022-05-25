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


export default function TabelaPedidos(props) {
  const theme = useTheme();

  const themeWithLocale = React.useMemo(() =>
    createTheme(theme, locales["ptBR"])
  );

  const columns = [
    { id: "numero", label: "Número", minWidth: 10 },
    { id: "data_lancamento", label: "Data de lançamento", minWidth: 30 },
    { id: "data_entrega", label: "Data de entrega", minWidth: 30 },
    { id: "usuario", label: "Vendedor", minWidth: 50 },
    { id: "cliente", label: "Cliente", minWidth: 50 },
    { id: "bairro", label: "Bairro", minWidth: 50 },
    { id: "estado", label: "Situação", minWidth: 50 },
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

  

  const rows = props.pedidos;

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <ThemeProvider theme={themeWithLocale}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                 
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
                        
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.pedidos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePagina}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </ThemeProvider>
      </Paper>
      
    </>
  );
}
