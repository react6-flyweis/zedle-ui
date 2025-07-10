import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageState {
  locale: string;
  setLocale: (locale: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      locale: "en-US",
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "locale",
      partialize: (state) => ({ locale: state.locale }),
    },
  ),
);
