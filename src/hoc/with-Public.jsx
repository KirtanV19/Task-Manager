const withPublic = (RenderComponent) => {
    const WrappedComponent = (props) => {
        return;
    };

    WrappedComponent.displayName = `withPublic(${RenderComponent.displayName || RenderComponent.name || "Component"
        })`;

    return WrappedComponent;
};

export default withPublic;
