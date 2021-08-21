import AgoraRTC, { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack, UID } from "agora-rtc-sdk-ng";
import { IBroadcastService } from "../IStreamService";

export class AgoraBroadcastService implements IBroadcastService {

    private uid: Promise<UID>;
    private localVideoTrack: Promise<ILocalVideoTrack>;
    private localAudioTrack: Promise<ILocalAudioTrack>;

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
        this.localVideoTrack = AgoraRTC.createCameraVideoTrack();
        this.localAudioTrack = AgoraRTC.createMicrophoneAudioTrack();
    }

    async start() {
        this.client.publish([
            await this.localAudioTrack,
            await this.localVideoTrack
        ]);
    }

    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async enableMic() {
        (await this.localAudioTrack).setEnabled(true);
    }

    async disableMic() {
        (await this.localAudioTrack).setEnabled(false);
    }

    async enableVideo() {
        (await this.localVideoTrack).setEnabled(true);
    }

    async disableVideo() {
        (await this.localVideoTrack).setEnabled(false);
    }

    shareScreen(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    onUserAdded(listener: () => void): void {
        throw new Error("Method not implemented.");
    }
    onUserRemoved(listener: () => void): void {
        throw new Error("Method not implemented.");
    }

    getVideoTrack() {
        return this.localVideoTrack;
    }

}
