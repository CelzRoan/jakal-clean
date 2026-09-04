import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [city, setCity] = useState(() => readLS("jakal_city", "Bandung"));
  const [savedIds, setSavedIds] = useState(() => readLS("jakal_saved", []));
  const [hasOnboarded, setHasOnboarded] = useState(() => readLS("jakal_onboarded", false));

  useEffect(() => {
    localStorage.setItem("jakal_city", JSON.stringify(city));
  }, [city]);

  useEffect(() => {
    localStorage.setItem("jakal_saved", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem("jakal_onboarded", JSON.stringify(hasOnboarded));
  }, [hasOnboarded]);

  function toggleSaved(id) {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const value = useMemo(
    () => ({
      city,
      setCity,
      savedIds,
      toggleSaved,
      isSaved: (id) => savedIds.includes(id),
      hasOnboarded,
      setHasOnboarded,
    }),
    [city, savedIds, hasOnboarded]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
