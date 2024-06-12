import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface PrivateRouteProps {
	children: React.ReactNode;
	requiredRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
	requiredRoles,
}) => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);
	const userRole = useSelector((state: RootState) => state.auth.userRole);
	const location = useLocation();

	if (!isAuthenticated || (userRole && !requiredRoles.includes(userRole))) {
		return <Navigate to="/pedidos" replace state={{ from: location }} />;
	}

	return <>{children}</>;
};

export default PrivateRoute;
