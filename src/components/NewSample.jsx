import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/task.slice";
import useSearch from "../hooks/useSearch";
import useLimit from "../hooks/useLimit";

const NewSample = () => {
    const [filter, setFilter] = useState({});
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.items);
    const { q, setQ } = useSearch();
    const { limit, setLimit } = useLimit();

    useEffect(() => {
        dispatch(
            fetchTasks({
                params: {
                    ...filter,
                },
            })
        );
    }, [dispatch, filter]);

    useEffect(() => {
        setFilter((prev) => ({
            ...prev,

            q: q ? q : undefined,
            _limit: limit ? limit : undefined,
        }));
    }, [q, limit]);
    console.log('tasks', tasks)
    return (
        <div>
            <label>
                Input:{" "}
                <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Enter a text"
                />
            </label>
            <select value={limit} onChange={(e) => setLimit(e.target.value)}>
                <option value="">Select limit</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
        </div>
    );
};

export default NewSample;
