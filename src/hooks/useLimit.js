import { useState } from "react";

const useLimit = () => {
  const [limit, setLimit] = useState(10);
  return { limit, setLimit };
};

export default useLimit;
