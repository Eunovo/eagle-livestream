export enum Actions {
    LOGIN = 'login',
    SIGNUP = 'signup',
    STATE_READY = 'ready'
}

export interface IAction {
    type: Actions,
    payload: any
}
