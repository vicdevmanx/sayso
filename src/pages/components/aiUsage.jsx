import { useState, useEffect } from "react";

const MAX_USES_PER_DAY = 5;

const useAiUsage = () => {
  const [usesLeft, setUsesLeft] = useState(MAX_USES_PER_DAY);
  const [disabled, setDisabled] = useState(false);

  // Helper to get today's date as YYYY-MM-DD
  const getToday = () => new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const today = getToday();
    const storedDate = localStorage.getItem("aiUsesDate");
    let storedUses = parseInt(localStorage.getItem("aiUsesLeft"), 10);

    if (storedDate !== today || isNaN(storedUses)) {
      // New day or no stored value, reset usage
      localStorage.setItem("aiUsesDate", today);
      localStorage.setItem("aiUsesLeft", MAX_USES_PER_DAY);
      setUsesLeft(MAX_USES_PER_DAY);
      setDisabled(false);
    } else {
      // Same day, load stored usage left
      setUsesLeft(storedUses);
      setDisabled(storedUses <= 0);
    }
  }, []);

  const consumeUse = () => {
    if (usesLeft <= 0) return false; // no uses left

    const newUsesLeft = usesLeft - 1;
    localStorage.setItem("aiUsesLeft", newUsesLeft);
    setUsesLeft(newUsesLeft);
    setDisabled(newUsesLeft <= 0);
    return true;
  };

  return { usesLeft, disabled, consumeUse };
};

export { MAX_USES_PER_DAY, useAiUsage };