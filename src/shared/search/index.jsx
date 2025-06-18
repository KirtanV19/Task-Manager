import React from 'react'

const CustomSearch = ({ q, setQ }) => {
    return (
        <div className="flex items-center">
            <label htmlFor="search" className="font-medium">
                Search:
            </label>
            <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
        </div>
    );
};

export default React.memo(CustomSearch);