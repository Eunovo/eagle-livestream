export enum Actions {
    LOGIN = 'login',
    SIGNUP = 'signup'
}

export interface IAction {
    type: Actions,
    payload: any
}
