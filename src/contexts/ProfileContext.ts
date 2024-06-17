import { createContext } from "react";
import { ProfileResponse } from "../types/Response";

export const ProfileContext = createContext<ProfileResponse>({ status: null, content: [] });
