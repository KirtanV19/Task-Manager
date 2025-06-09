import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { URLS } from "../constants/urls";

const withPublic = (RenderComponent) => {
    const WrappedComponent = (props) => {
        const currentUser = useSelector((state) => state.users.currentUser);

        if (currentUser) {
            return <Navigate to={URLS.INITIAL} replace />;
        }
        return <RenderComponent {...props} />;
    };

    WrappedComponent.displayName = `withPublic(${RenderComponent.displayName || RenderComponent.name || "Component"
        })`;

    return WrappedComponent;
};

export default withPublic;
