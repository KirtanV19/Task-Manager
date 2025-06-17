import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

const CustomTableCopy = ({ data = [], columns = [], onSort, sort }) => {
    const getSortIcon = (field) => {
        if (sort?.field !== field) return null;
        if (sort.order === "asc") return <ArrowUpIcon className="inline ml-1" />;
        if (sort.order === "desc") return <ArrowDownIcon className="inline ml-1" />;
        return null;
    };

    return (
        <table className="min-w-full border border-gray-200 overflow-x-auto bg-white rounded-xl ">
            <thead>
                <tr>
                    {columns.map((column) => {
                        const isSortable = column.sortable !== false;
                        const isSorted = sort?.field === column.field_name;
                        return (
                            <th
                                key={column.id}
                                className={
                                    `px-4 py-2 border-b border-gray-200 text-left ` +
                                    (isSortable ? "cursor-pointer select-none " : "") +
                                    (isSorted ? "bg-blue-100 " : "bg-gray-50 ")
                                }
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
                        <td colSpan={columns.length} className="text-center py-4">
                            No Items Found.
                        </td>
                    </tr>
                ) : (
                    data.map((a, index) => (
                        <tr
                            key={a.id}
                            className="hover:bg-blue-50 transition-colors"
                        >
                            {columns.map((column) => (
                                <td key={column.id} className="px-4 py-2 border-b border-gray-100">
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
