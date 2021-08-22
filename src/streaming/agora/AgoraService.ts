import AgoraRTC, { ConnectionState, IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack, UID } from "agora-rtc-sdk-ng";
import { IConnectionObserver, IUserObserver, Status } from "../IStreamService";

export class AgoraService implements IConnectionObserver, IUserObserver {

    private uid: Promise<UID>;

    constructor(
        private client: IAgoraRTCClient,
        private channel: string
    ) {
        const appId = process.env.REACT_APP_AGORA_APPID;
        const token = process.env.REACT_APP_AGORA_TOKEN;
        if (!appId) throw new Error('Missing Agora AppId');
        if (!token) throw new Error('Missing Agora token');

        this.uid = this.client.join(
            appId, this.channel, token, null);
        this.client.setClientRole('host');
    }

    getClient() {
        return this.client;
    }


    getConnectionStatus(): Status {
        return this.mapToStatus(this.client.connectionState);
    }

    protected mapToStatus(status: ConnectionState): Status {
        return {
            CONNECTED: Status.LIVE,
            CONNECTING: Status.CONNECTING,
            DISCONNECTED: Status.DISCONNECTED,
            RECONNECTING: Status.CONNECTING,
            DISCONNECTING: Status.CONNECTING
        }[status];
    }

    onConnectionStatusChanged(listener: (newStatus: Status, oldStatus: Status) => void): () => void {
        this.client.on('connection-state-change', (curState, prevState) => {
            listener(
                this.mapToStatus(curState), this.mapToStatus(prevState));
        });

        return () => { this.client.off('connection-state-change', listener); }
    }

    onUserAdded(listener: () => void): () => void {
        this.client.on('user-joined', () => {
            listener();
        });

        return () => this.client.off('user-joined', listener);
    }

    onUserRemoved(listener: () => void): () => void {
        this.client.on('user-left', () => {
            listener();
        });

        return () => this.client.off('user-left', listener);
    }

}
