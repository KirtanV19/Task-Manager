import { useState } from "react";

const usePage = () => {
  const [page, setPage] = useState(1);
  return { page, setPage };
};

export default usePage;
