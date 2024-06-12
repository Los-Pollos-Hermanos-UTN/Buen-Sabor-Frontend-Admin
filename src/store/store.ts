import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import empresaReducer from "../features/empresa/EmpresaSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		empresa: empresaReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
