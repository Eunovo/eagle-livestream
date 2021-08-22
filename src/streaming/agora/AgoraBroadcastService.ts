import AgoraRTC, { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
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
        try {
            await this.localVideoTrack
            this.isVideoOn.push(true);
            (await this.localVideoTrack)
                .on('track-ended', () => this.isVideoOn.push(false));
        } catch (error) {
            console.log('Counld not start video');
        }

        try {
            await this.localAudioTrack
            this.isMicOn.push(true);
            (await this.localAudioTrack)
                .on('track-ended', () => this.isMicOn.push(false));
        } catch (error) {
            console.log('Counld not start mic');
        }
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
        this.isLive.push(false);
    }

    async destroy() {
        await this.stop();
        (await this.localAudioTrack).close();
        (await this.localVideoTrack).close();
        this.localScreenTrack?.close();
    }

    async enableMic() {
        await (await this.localAudioTrack).setEnabled(true);
        this.isMicOn.push(true);
    }

    async disableMic() {
        await (await this.localAudioTrack).setEnabled(false);
        this.isMicOn.push(false);
    }

    async enableVideo() {
        await (await this.localVideoTrack).setEnabled(true);
        this.isVideoOn.push(true);
    }

    async disableVideo() {
        await (await this.localVideoTrack).setEnabled(false);
        this.isVideoOn.push(false);
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

    // protected mapToStatus(status: ConnectionState) {
    //     const newStatus = super.mapToStatus(status);
    //     return newStatus;
    // }

}
