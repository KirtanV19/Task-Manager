const Container = ({ children, maxWidth = 'lg', className = '' }) => {

    const maxWidthClasses = {
        xs: 'max-w-screen-sm',
        sm: 'max-w-screen-md',
        md: 'max-w-screen-lg',
        lg: 'max-w-screen-xl',
        xl: 'max-w-screen-2xl',
        '2xl': 'max-w-[1536px]',
    };

    return (
        <div
            className={`mx-auto w-full px-4 sm:px-6 md:px-8 ${maxWidthClasses[maxWidth]} ${className}`}
        >
            {children}
        </div>
    );
};

export default Container;