import { useState } from "react";

const useLimit = () => {
  const [limit, setLimit] = useState(5);
  return { limit, setLimit };
};

export default useLimit;
