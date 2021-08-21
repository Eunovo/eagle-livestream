import AgoraRTC, { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import { IBroadcastService } from "../IStreamService";

export class AgoraBroadcastService implements IBroadcastService {

    private localVideoTrack: Promise<ILocalVideoTrack>;
    private localAudioTrack: Promise<ILocalAudioTrack>;

    constructor(
        private client: IAgoraRTCClient
    ) {
        this.localVideoTrack = AgoraRTC.createCameraVideoTrack();
        this.localAudioTrack = AgoraRTC.createMicrophoneAudioTrack();
    }
    
    start(): Promise<string> {
        throw new Error("Method not implemented.");
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
