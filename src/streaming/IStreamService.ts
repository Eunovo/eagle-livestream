/**
 * 
 */
export interface IBroadcastService {
    start(): Promise<string>
    stop(): Promise<void>
    enableMic(): Promise<void>
    disableMic(): Promise<void>
    enableVideo(): Promise<void>
    disableVideo(): Promise<void>
    shareScreen(): Promise<void>
    onUserAdded(listener: () => void): void
    onUserRemoved(listener: () => void): void
}

export interface IStreamService {
    join(id: string): Promise<void>
    leave(): Promise<void>
}
