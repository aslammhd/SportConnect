import {
    Navigate,
} from "react-router-dom";

import {
    useAuth,
} from "../hooks/useAuth";

interface AdminRouteProps {
    children: React.ReactNode;
}

function AdminRoute({
    children,
}: AdminRouteProps) {
    const {
        user,
    } = useAuth();

    

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (user.role !== "admin") {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return children;
}

export default AdminRoute;