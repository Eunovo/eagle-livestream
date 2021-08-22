import { IRemoteVideoTrack, ILocalVideoTrack, IAgoraRTCClient, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { IStreamService } from "..";
import { Observable } from "../../Observable";
import { AgoraService } from "./AgoraService";

export class AgoraStreamService extends AgoraService implements IStreamService {
    public readonly isVideoOn: Observable<boolean> = new Observable();
    public readonly isAudioOn: Observable<boolean> = new Observable();
    public readonly currentVideoTrack = new Observable<
        IRemoteVideoTrack | ILocalVideoTrack | null>();

    private remoteVideoTrack: IRemoteVideoTrack | null = null;
    private remoteAudioTrack: IRemoteAudioTrack | null = null;

    constructor(
        client: IAgoraRTCClient,
        channel: string
    ) {
        super(client, channel);
        this.getClient().setClientRole('audience');
    }

    async join() {
        this.isVideoOn.push(true);
        this.isAudioOn.push(true);
        this.getClient().on('user-published', async (user, mediaType) => {
            await this.getClient().subscribe(user, mediaType);

            if (mediaType === 'video' && user.videoTrack) {
                this.remoteVideoTrack = user.videoTrack;
                this.currentVideoTrack.push(user.videoTrack);
            }
            if (mediaType === "audio" && user.audioTrack) {
                this.remoteAudioTrack = user.audioTrack;
                this.remoteAudioTrack.play();
            }
        });
    }

    async leave() {
        await this.getClient().leave();
    }

    async enableVideo() {
        this.currentVideoTrack.push(this.remoteVideoTrack);
        this.isVideoOn.push(true);
    }

    async disableVideo() {
        this.remoteVideoTrack?.stop();
        this.isVideoOn.push(false);
    }

    async enableAudio() {
        this.remoteAudioTrack?.play();
        this.isAudioOn.push(true);
    }

    async disableAudio() {
        this.remoteAudioTrack?.stop();
        this.isAudioOn.push(false);
    }

}
