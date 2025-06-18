import { useCallback, useState } from "react";

const useSortFilter = () => {
  const [sort, setSort] = useState({
    field: "",
    order: "",
  });

  const handleSort = useCallback((field) => {
    setSort((prev) => {
      if (prev.field !== field) return { field, order: "asc" };
      if (prev.order === "asc") return { field, order: "desc" };
      if (prev.order === "desc") return { field: "", order: "" };
      return { field, order: "asc" };
    });
  }, []);

  return { sort, setSort, handleSort };
};

export default useSortFilter;
