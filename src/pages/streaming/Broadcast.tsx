import { useEffect, useRef } from "react";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { AgoraBroadcastService, AgoraVideo, IBroadcastService } from "../../streaming";
import { ToggleCamera, ToggleMicrophone, ToggleScreenShare } from "./components";
import "./streaming.css";

const client: IAgoraRTCClient = AgoraRTC
    .createClient({ mode: "live", codec: "vp8" });


export const Broadcast: React.FC = () => {
    const serviceRef = useRef(
        new AgoraBroadcastService(client, 'test_channel'));
    const user = {};

    return <div className='stream-view'>

        <AgoraVideo
            className='stream-view__video'
            videoTrack={serviceRef.current.getVideoTrack()}
        />

        <ul className='stream-view__menu'>
            <li><ToggleMicrophone broadcastService={serviceRef.current} /></li>
            <li><ToggleCamera broadcastService={serviceRef.current} /></li>
            <li><ToggleScreenShare broadcastService={serviceRef.current} /></li>
        </ul>
    </div>
}
