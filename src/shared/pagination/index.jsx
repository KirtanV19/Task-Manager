import React from "react";

const CustomPagination = ({ limit, page, setPage, tasks }) => {
    return (
        <div className="flex items-center gap-4 mt-2 md:mt-0">
            <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
            >
                Previous
            </button>
            <span>Page {page}</span>
            <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={tasks.length < limit}
            >
                Next
            </button>
        </div>
    );
};

export default React.memo(CustomPagination);
