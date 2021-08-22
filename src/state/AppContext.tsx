import React, { useContext, useEffect, useReducer } from "react";
import { Actions, IAction } from "./actions";
import { reducer } from "./reducer";
import { IState } from "./state";

export const AppContext = React.createContext<IState>({});
const DispatchContext = React.createContext<React.Dispatch<IAction> | null>(null);

export const AppStateProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(reducer, {});

    useEffect(() => {
        let storedState = localStorage.getItem('STATE');
        storedState = JSON.parse(storedState || '{}');
        dispatch({ type: Actions.STATE_READY, payload: storedState });
    }, []);
    useEffect(() => {
        if (!state.ready) return;
        localStorage.setItem('STATE', JSON.stringify(state));
    }, [state]);

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
