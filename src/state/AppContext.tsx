import React, { useContext, useReducer } from "react";
import { IAction } from "./actions";
import { reducer } from "./reducer";
import { IState } from "./state";

export const AppContext = React.createContext<IState>({});
const DispatchContext = React.createContext<React.Dispatch<IAction> | null>(null);

export const AppStateProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(reducer, {});

    return <AppContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
            {props.children}
        </DispatchContext.Provider>
    </AppContext.Provider>
}

export const useAppState = () => {
    return useContext(AppContext);
}

export const useAppStateDispatch = () => {
    return useContext(DispatchContext);
}
