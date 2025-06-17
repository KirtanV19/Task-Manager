import React from "react";

const useFilter = () => {
  const [filter, setFilter] = React.useState({});
  return { filter, setFilter };
};

export default useFilter;
