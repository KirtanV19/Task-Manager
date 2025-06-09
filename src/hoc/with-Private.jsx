import { useSelector } from "react-redux";
import { URLS } from "../constants/urls";
import { Navigate } from "react-router-dom";

const withPrivate = (RenderComponent) => {
    const WrappedComponent = (props) => {
        const currentUser = useSelector((state) => state.users.currentUser);

        if (!currentUser) {
            return <Navigate to={URLS.LOGIN} replace />;
        }
        return <RenderComponent {...props} />;
    };

    WrappedComponent.displayName = `withPrivate(${RenderComponent.displayName || RenderComponent.name || "Component"
        })`;

    return WrappedComponent;
};

export default withPrivate;
