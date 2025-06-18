import React, { useState } from "react";

const CustomDateRangePicker = ({ value, onChange }) => {
  const [start, setStart] = useState(value?.start || "");
  const [end, setEnd] = useState(value?.end || "");

  const handleStartChange = (e) => {
    setStart(e.target.value);
    onChange && onChange({ start: e.target.value, end });
  };

  const handleEndChange = (e) => {
    setEnd(e.target.value);
    onChange && onChange({ start, end: e.target.value });
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={start}
        onChange={handleStartChange}
        className="border rounded px-2 py-1"
        max={end || undefined}
      />
      <span className="mx-1">to</span>
      <input
        type="date"
        value={end}
        onChange={handleEndChange}
        className="border rounded px-2 py-1"
        min={start || undefined}
      />
    </div>
  );
};

export default React.memo(CustomDateRangePicker);