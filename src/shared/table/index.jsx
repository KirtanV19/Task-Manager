const CustomTable = ({ data = [], columns = [] }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.id} className="hover:cursor-pointer" onClick={() => alert(`${column.label} is clicked`)}>{column.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((a, index) => (
                    <tr key={a.id}>
                        {columns.map((column) => (
                            <td key={column.id}>
                                {column.render
                                    ? column.render({ row: a, rowIndex: index })
                                    : a[column.field_name]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomTable;
