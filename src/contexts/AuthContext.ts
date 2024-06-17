import { createContext } from "react";
import { AuthData, AuthFuncProps } from "../types/Auth";

type AuthContextType = {
  handleAuth: (props: AuthFuncProps) => void;
  handleLogout: () => void;
  data: AuthData;
};

export const AuthContext = createContext<AuthContextType>({
  data: { status: false },
  handleAuth: () => {},
  handleLogout: () => {},
});
