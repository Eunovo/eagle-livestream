import AgoraRTC, { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";

export class AgoraBroadcastService {

    private localVideoTrack: Promise<ILocalVideoTrack>;
    private localAudioTrack: Promise<ILocalAudioTrack>;

    constructor(
        private client: IAgoraRTCClient
    ) {
        this.localVideoTrack = AgoraRTC.createCameraVideoTrack();
        this.localAudioTrack = AgoraRTC.createMicrophoneAudioTrack();
    }

    getVideoTrack() {
        return this.localVideoTrack;
    }

}
