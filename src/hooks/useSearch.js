import { useState } from "react";

const useSearch = () => {
  const [q, setQ] = useState("");
  return { q, setQ };
};

export default useSearch;
