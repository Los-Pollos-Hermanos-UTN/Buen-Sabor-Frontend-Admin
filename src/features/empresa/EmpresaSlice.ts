import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Empresa } from "../../types/Empresa";

interface EmpresaState {
	selectedEmpresa: Empresa | null;
}

const initialState: EmpresaState = {
	selectedEmpresa: null,
};

const empresaSlice = createSlice({
	name: "empresa",
	initialState,
	reducers: {
		selectEmpresa(state, action: PayloadAction<Empresa>) {
			state.selectedEmpresa = action.payload;
		},
	},
});

export const { selectEmpresa } = empresaSlice.actions;
export default empresaSlice.reducer;
