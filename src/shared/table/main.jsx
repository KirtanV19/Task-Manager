const CustomTableCopy = ({ data = [], columns = [] }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => {
                        return <th key={column.id}>{column.label}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {data.length <= 0 ? (
                    <tr>
                        <td colSpan={columns.length}>No Items Found.</td>
                    </tr>
                ) : (
                    data.map((a, index) => (
                        <tr key={a.id}>
                            {columns.map((column) => (
                                <td key={column.id}>
                                    {column.render
                                        ? column.render({ row: a, rowIndex: index })
                                        : a[column.field_name]}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default CustomTableCopy;
