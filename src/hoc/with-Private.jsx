const withPrivate = (RenderComponent) => {
    const WrappedComponent = (props) => {
        return;
    };

    WrappedComponent.displayName = `withPrivate(${RenderComponent.displayName || RenderComponent.name || "Component"
        })`;

    return WrappedComponent;
};

export default withPrivate;
