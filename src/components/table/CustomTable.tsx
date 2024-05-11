import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { TableEditButton } from "./TableEditButton";
import { TableDeleteButton } from "./TableDeleteButton";
import { Stack } from "@mui/material";
import "./CustomTableStyles.css";

export interface TableColumn {
	label: string;
	key: string;
}

export interface TableProps<T> {
	data: T[];
	columns: TableColumn[];
	handleDelete: (id: number) => void;
}

// La coma después de T es necesaria debido a una peculiaridad de JSX.
// JSX interpreta <T> como una etiqueta HTML, por lo que TypeScript introdujo la sintaxis <T,> para diferenciarla de las etiquetas HTML.
// La coma no tiene ningún efecto en el tipo genérico T, simplemente le indica a TypeScript que esto es una definición de tipo genérico y no una etiqueta JSX.
export const CustomTable = <T,>({
	data,
	columns,
	handleDelete,
}: TableProps<T>) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (_: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "8px" }}>
				<TableContainer className="custom-scrollbar" sx={{ maxHeight: "59vh" }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column: any, i: number) => (
									<TableCell
										key={i}
										align={"center"}
										sx={{
											backgroundColor: "rgba(10, 9, 8, 0.9)",
											color: "white",
										}}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row: any, index: number) => {
									return (
										<TableRow
											role="checkbox"
											tabIndex={-1}
											key={index}
											sx={{
												"&:hover": { backgroundColor: "rgba(73, 17, 28, 0.5)" },
											}}
										>
											{columns.map((column: any, i: number) => {
												const cellValue = row[column.key];
												return (
													<TableCell key={i} align={"center"}>
														{column.label === "Acciones" ? (
															<Stack
																direction="row"
																spacing={2}
																justifyContent="center"
															>
																<TableEditButton />
																<TableDeleteButton />
															</Stack>
														) : (
															cellValue
														)}
													</TableCell>
												);
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
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
};
