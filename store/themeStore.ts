import { isObject } from "@/lib/type-helpers/typeof";
import { isBrowser } from "@/lib/utils/constants";
import { on } from "@/lib/utils/on";
import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";

type ThemeStore = {
	theme: "light" | "dark";
	isDarkMode: boolean;

	actions: {
		toggleTheme: () => void;
		initThemeOnLoad: () => void;
	};
};

const prefersDarkMode = () => isBrowser() && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Store Object Initialization
const themeStoreObjectFn: StateCreator<ThemeStore> = (set, get) => ({
	theme: prefersDarkMode() ? "dark" : "light",

	isDarkMode: prefersDarkMode() ? true : false,

	actions: {
		toggleTheme: () => {
			const newTheme = get().theme === "light" ? "dark" : "light";

			document.documentElement.dataset.theme = newTheme;

			document.documentElement.classList.add("theme-transition");

			on("transitionend", document.documentElement, () => {
				document.documentElement.removeAttribute("class");
			});

			set({ theme: newTheme, isDarkMode: newTheme === "dark" });
		},

		initThemeOnLoad: () => {
			const { theme: persistedTheme } = get();

			document.documentElement.dataset.theme = persistedTheme;
		},
	},
});

const assertState = <TState>(state: unknown) => {
	if (!isObject(state)) {
		throw new TypeError("Invalid app state");
	}

	return state as TState;
};

// Store hook Creation
const useInitThemeStore = create<ThemeStore>()(
	persist(themeStoreObjectFn, {
		name: "themeStore",
		version: 1,
		partialize: ({ theme }) => ({ theme }),
		migrate(persistedState) {
			const validPersistedState = assertState<ThemeStore>(persistedState);

			return validPersistedState;
		},
	})
);

export const useThemeStore = <TResult>(selector: SelectorFn<ThemeStore, TResult>) => {
	const state = useInitThemeStore(useShallow(selector));

	return state;
};