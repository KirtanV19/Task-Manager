import React from 'react'

const CustomSelect = ({ limit, setLimit, setPage }) => {
    return (
        <div className="flex items-center mb-2 md:mb-0">
            <select
                value={limit}
                className="border border-gray-300 rounded-md px-2 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                }}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
            <label htmlFor="entries" className="font-medium ml-2">
                entries per page
            </label>
        </div>
    )
}

export default CustomSelect;