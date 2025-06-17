const CustomTableCopy = ({ data = [], columns = [], onSort, sort }) => {
    const getSortIcon = (field) => {
        if (sort?.field !== field) return null;
        if (sort.order === "asc") return " ▲";
        if (sort.order === "desc") return " ▼";
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
                                className={isSortable ? "cursor-pointer select-none" : ""}
                                onClick={isSortable ? () => onSort && onSort(column.field_name) : undefined}
                            >
                                {column.label}
                                {isSortable && getSortIcon(column.field_name)}
                            </th>
                        );
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
