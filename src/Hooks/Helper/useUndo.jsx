import { useState } from "react";

const useUndo = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [undoValue, setUndoValue] = useState(null);

  const undo = () => {
    setValue(undoValue);
  };

  const set = (newValue) => {
    setUndoValue(value);
    setValue(newValue);
  };

  return [value, set, undo];
};

export default useUndo;
