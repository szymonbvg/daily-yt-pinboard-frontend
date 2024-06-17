import { createContext } from "react";

export type ToggleFuncProps = {
	value: boolean;
};

type NavbarContextType = {
	toggleMenu: (props?: ToggleFuncProps) => void;
};

export const NavbarContext = createContext<NavbarContextType | null>(null);