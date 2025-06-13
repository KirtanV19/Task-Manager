const CustomTable = ({
    data = [],
    columns = [],
    onSort,
    sortField,
    sortOrder,
}) => {
    const getSortIcon = (field) => {
        if (sortField !== field) return null;
        if (sortOrder === "asc") return "▲";
        if (sortOrder === "desc") return "▼";
        return null;
    };

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.id}
                            className="hover:cursor-pointer select-none"
                            onClick={() => onSort && onSort(column.field_name)}
                        >
                            {column.label}
                            {getSortIcon(column.field_name)}
                        </th>
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
