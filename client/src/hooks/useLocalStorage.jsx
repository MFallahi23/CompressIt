import React, { useEffect, useState } from "react";

const getLocalValue = (key, initValue) => {
  // for SSR
  if (typeof window === "undefined") return initValue;

  // if a value is already stored
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  // return result of a function
  if (initValue instanceof Function) return initValue();
  return initValue;
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(getLocalValue(key, initialValue));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;
