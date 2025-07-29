import type { UserContextType } from "@src/types/UserContextType";
import { createContext } from "react";

const UserContext = createContext<UserContextType>(null);

export default UserContext;
