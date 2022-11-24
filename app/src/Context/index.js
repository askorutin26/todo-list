import { useContext } from "react";

import { AppContext, AppProvider } from "./AppContext";
import {AuthContext, AuthProvider} from './AuthContext.jsx'

const useAppContext = () => useContext(AppContext);
const useAuthContext = () => useContext(AuthContext);


export {useAppContext, AppProvider};
export {useAuthContext, AuthProvider};