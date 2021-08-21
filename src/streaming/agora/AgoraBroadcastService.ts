import AgoraRTC, { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack, IRemoteVideoTrack, UID } from "agora-rtc-sdk-ng";
import { Observable } from "../../Observable";
import { IBroadcastService } from "../IStreamService";
import { AgoraService } from "./AgoraService";

export class AgoraBroadcastService extends AgoraService implements IBroadcastService {

    private localVideoTrack: Promise<ILocalVideoTrack>;
    private localAudioTrack: Promise<ILocalAudioTrack>;
    private localScreenTrack: ILocalVideoTrack | null = null;
    public readonly currentVideoTrack = new Observable<
        IRemoteVideoTrack | ILocalVideoTrack | null>();

    constructor(
        client: IAgoraRTCClient,
        channel: string
    ) {
        super(client, channel);
        this.getClient().setClientRole('host');
        this.localVideoTrack = AgoraRTC.createCameraVideoTrack();
        this.localAudioTrack = AgoraRTC.createMicrophoneAudioTrack();
        this.init();
    }

    async init() {
        this.currentVideoTrack.push(await this.localVideoTrack);
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

    async shareScreen() {
        const result = await AgoraRTC.createScreenVideoTrack({
            encoderConfig: "1080p_1",
            optimizationMode: "detail"
        });

        if (Array.isArray(result)) this.localScreenTrack = result[0];
        else this.localScreenTrack = result;

        try {
            await this.getClient().unpublish(await this.localVideoTrack);
            await this.getClient().publish(this.localScreenTrack);
        } catch (error) {
            console.log(error);
        }

        this.localScreenTrack.on('track-ended', this.unshareScreen.bind(this));
        (await this.localVideoTrack).stop();
        this.currentVideoTrack.push(this.localScreenTrack);
    }

    async unshareScreen() {
        if (!this.localScreenTrack) return;

        try {
            await this.getClient().unpublish(this.localScreenTrack);
            await this.getClient().publish(await this.localVideoTrack);
        } catch (error) {
            console.log(error);
        }
        this.localScreenTrack.stop();
        this.currentVideoTrack.push(await this.localVideoTrack);
        this.localScreenTrack = null;
    }

}
