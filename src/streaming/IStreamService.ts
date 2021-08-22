import { Observable } from "../Observable";

export enum Status {
    CONNECTING = 'CONNECTING',
    LIVE = 'LIVE',
    DISCONNECTED = 'DISCONNECTED'
}

export interface IConnectionObserver {
    getConnectionStatus(): Status
    onConnectionStatusChanged(listener:
        (newStatus: Status, oldStatus: Status) => void): () => void
}

export interface IUserObserver {
    onUserAdded(listener: () => void): () => void
    onUserRemoved(listener: () => void): () => void
}

/**
 * 
 */
export interface IBroadcastService {
    isLive: Observable<boolean>
    isVideoOn: Observable<boolean>
    isMicOn: Observable<boolean>
    isScreenShareOn: Observable<boolean>

    start(): Promise<void>
    stop(): Promise<void>
    enableMic(): Promise<void>
    disableMic(): Promise<void>
    enableVideo(): Promise<void>
    disableVideo(): Promise<void>
    shareScreen(): Promise<void>
    unshareScreen(): Promise<void>
}

export interface IStreamService {
    isVideoOn: Observable<boolean>
    isAudioOn: Observable<boolean>

    join(): Promise<void>
    leave(): Promise<void>
    enableVideo(): Promise<void>
    disableVideo(): Promise<void>
    enableAudio(): Promise<void>
    disableAudio(): Promise<void>
}
