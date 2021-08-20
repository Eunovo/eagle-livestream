import React from 'react';
import { Actions, IAction } from './actions';

export const reducer: React.Reducer<any, IAction> = (state, action) => {
    switch (action.type) {
        case Actions.LOGIN:
            return state;

        case Actions.SIGNUP:
            return state;

        default:
            throw new Error('Invalid Action type');
    }
}
