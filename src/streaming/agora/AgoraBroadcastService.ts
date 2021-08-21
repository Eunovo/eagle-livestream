import AgoraRTC, { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack, UID } from "agora-rtc-sdk-ng";
import { IBroadcastService } from "../IStreamService";
import { AgoraService } from "./AgoraService";

export class AgoraBroadcastService extends AgoraService implements IBroadcastService {

    private localVideoTrack: Promise<ILocalVideoTrack>;
    private localAudioTrack: Promise<ILocalAudioTrack>;

    constructor(
        client: IAgoraRTCClient,
        channel: string
    ) {
        super(client, channel);
        this.getClient().setClientRole('host');
        this.localVideoTrack = AgoraRTC.createCameraVideoTrack();
        this.localAudioTrack = AgoraRTC.createMicrophoneAudioTrack();
    }

    async start() {
        this.getClient().publish([
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

    unshareScreen(): Promise<void> {
        throw new Error('Method not implemented');
    }

    getVideoTrack() {
        return this.localVideoTrack;
    }

}
