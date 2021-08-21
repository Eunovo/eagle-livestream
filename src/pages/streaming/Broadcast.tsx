import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { Header } from "../../components/header";
import { AgoraBroadcastService, AgoraVideo } from "../../streaming";
import { ToggleCamera, ToggleMicrophone } from "./components";
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

        <ul className='stream-view__menu'>
            <li><ToggleMicrophone broadcastService={broadcastService} /></li>
            <li><ToggleCamera broadcastService={broadcastService} /></li>
        </ul>
    </div>
}
