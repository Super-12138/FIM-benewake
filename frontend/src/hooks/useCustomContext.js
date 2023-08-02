import { useContext } from "react";
import { AlertContext, QueryContext, UpdateQueryContext, AuthContext, TabContext, UpdateTabContext, TableDataContext, UpdateTableDataContext, TableStatesContext, UpdateTableStatesContext} from "../contexts/createContext";

export const useAlertContext = () => { return useContext(AlertContext); }

export const useQueryContext = () => { return useContext(QueryContext); }
export const useUpdateQueryContext = () => { return useContext(UpdateQueryContext); }

export const useAuthContext = () => { return useContext(AuthContext); }

export const useTabContext = () => { return useContext(TabContext); }
export const useUpdateTabContext = () => { return useContext(UpdateTabContext); }



export const useTableDataContext = () => { return useContext(TableDataContext); }
export const useUpdateTableDataContext = () => { return useContext(UpdateTableDataContext); }

export const useTableStatesContext = () => { return useContext(TableStatesContext); }
export const useUpdateTableStatesContext = () => { return useContext(UpdateTableStatesContext); }