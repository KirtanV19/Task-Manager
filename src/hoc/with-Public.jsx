import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { URLS } from "../constants/urls";

const withPublic = (RenderComponent) => {
    const WrappedComponent = (props) => {
        const currentUser = useSelector((state) => state.users.currentUser);

        if (currentUser?.role === "admin") {
            return <Navigate to={URLS.DASHBOARD} replace />;
        }
        if (currentUser?.role === "user") {
            return <Navigate to={URLS.USERDASHBOARD} replace />;
        }
        return <RenderComponent {...props} />;
    };

    WrappedComponent.displayName = `withPublic(${RenderComponent.displayName || RenderComponent.name || "Component"
        })`;

    return WrappedComponent;
};

export default withPublic;
