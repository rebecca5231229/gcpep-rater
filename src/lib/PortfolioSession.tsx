"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface PortfolioSessionValue {
  raterInitials: string;
  setRaterInitials: (v: string) => void;
  portfolioId: string;
  setPortfolioId: (v: string) => void;
}

const PortfolioSessionContext = createContext<PortfolioSessionValue | null>(null);

const STORAGE_KEY = "gcpep_portfolio_session";

export function PortfolioSessionProvider({ children }: { children: React.ReactNode }) {
  const [raterInitials, setRaterInitialsState] = useState("");
  const [portfolioId, setPortfolioIdState] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Load from sessionStorage on mount (per-browser-tab, cleared when the tab closes --
  // avoids one rater's session leaking into another rater's later use of the same browser).
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.raterInitials) setRaterInitialsState(parsed.raterInitials);
        if (parsed.portfolioId) setPortfolioIdState(parsed.portfolioId);
      }
    } catch {
      // ignore -- storage may be unavailable
    }
    setLoaded(true);
  }, []);

  // Persist whenever either value changes, after the initial load.
  useEffect(() => {
    if (!loaded) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ raterInitials, portfolioId }));
    } catch {
      // ignore
    }
  }, [raterInitials, portfolioId, loaded]);

  return (
    <PortfolioSessionContext.Provider
      value={{
        raterInitials,
        setRaterInitials: setRaterInitialsState,
        portfolioId,
        setPortfolioId: setPortfolioIdState,
      }}
    >
      {children}
    </PortfolioSessionContext.Provider>
  );
}

export function usePortfolioSession() {
  const ctx = useContext(PortfolioSessionContext);
  if (!ctx) {
    throw new Error("usePortfolioSession must be used within a PortfolioSessionProvider");
  }
  return ctx;
}
