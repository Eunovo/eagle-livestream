import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { Header } from "../../components/header";
import { AgoraBroadcastService, AgoraVideo } from "../../streaming";
import "./streaming.css";

const client: IAgoraRTCClient = AgoraRTC
    .createClient({ mode: "live", codec: "vp8" });
const broadcastService = new AgoraBroadcastService(client);

export const Broadcast: React.FC = () => {
    const user = {};

    return <div className='container stream-view'>
        <Header />
        <AgoraVideo
            className='stream-view__video'
            videoTrack={broadcastService.getVideoTrack()}
        />
        <div>
            
        </div>
    </div>
}
