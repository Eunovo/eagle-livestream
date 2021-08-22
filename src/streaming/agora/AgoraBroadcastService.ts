import AgoraRTC, { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack, IRemoteVideoTrack, UID } from "agora-rtc-sdk-ng";
import { Observable } from "../../Observable";
import { IBroadcastService } from "../IStreamService";
import { AgoraService } from "./AgoraService";

export class AgoraBroadcastService extends AgoraService implements IBroadcastService {

    public readonly isLive: Observable<boolean> = new Observable();
    public readonly isVideoOn: Observable<boolean> = new Observable();
    public readonly isMicOn: Observable<boolean> = new Observable();
    public readonly isScreenShareOn: Observable<boolean> = new Observable();
    public readonly currentVideoTrack = new Observable<
        IRemoteVideoTrack | ILocalVideoTrack | null>();


    private localVideoTrack: Promise<ILocalVideoTrack>;
    private localAudioTrack: Promise<ILocalAudioTrack>;
    private localScreenTrack: ILocalVideoTrack | null = null;

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
        (await this.localVideoTrack).on('track-ended', () => this.isVideoOn.push(false));
        (await this.localAudioTrack).on('track-ended', () => this.isMicOn.push(false));
        this.currentVideoTrack.push(await this.localVideoTrack);
    }

    async start() {
        await this.getClient().publish([
            await this.localAudioTrack,
            await this.localVideoTrack
        ]);
        this.isLive.push(true);
    }

    async stop() {
        await this.getClient().leave();
    }

    async enableMic() {
        this.isVideoOn.push(true);
        (await this.localAudioTrack).setEnabled(true);
    }

    async disableMic() {
        (await this.localAudioTrack).setEnabled(false);
    }

    async enableVideo() {
        this.isVideoOn.push(true);
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
        this.isScreenShareOn.push(true);
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
        this.isScreenShareOn.push(false);
        this.currentVideoTrack.push(await this.localVideoTrack);
        this.localScreenTrack = null;
    }

}
