import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	isAuthenticated: boolean;
	userRole: string | null; // Añadido para el rol del usuario
}

const initialState: AuthState = {
	isAuthenticated: false,
	userRole: null, // Inicialmente null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state) {
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.userRole = null; // Limpiar el rol del usuario al cerrar sesión
		},
		setUserRole(state, action: PayloadAction<string>) {
			state.userRole = action.payload;
		},
	},
});

export const { login, logout, setUserRole } = authSlice.actions;
export default authSlice.reducer;
