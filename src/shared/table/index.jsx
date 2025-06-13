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
                    {columns.map((column) => {
                        const isSortable = column.sortable !== false;
                        return (
                            <th
                                key={column.id}
                                className={`${isSortable ? "hover:cursor-pointer select-none" : ""
                                    }`}
                                onClick={
                                    isSortable
                                        ? () => onSort && onSort(column.field_name)
                                        : undefined
                                }
                            >
                                {column.label}
                                {isSortable && getSortIcon(column.field_name)}
                            </th>
                        );
                    })}
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
