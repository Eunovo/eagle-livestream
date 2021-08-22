import React from 'react';
import { Actions, IAction } from './actions';

export const reducer: React.Reducer<any, IAction> = (state, action) => {
    switch (action.type) {
        case Actions.STATE_READY:
            return { ...action.payload, ready: true };

        case Actions.LOGIN:
            return { ...state, user: action.payload };

        case Actions.SIGNUP:
            return { ...state, user: action.payload };

        default:
            throw new Error('Invalid Action type');
    }
}
