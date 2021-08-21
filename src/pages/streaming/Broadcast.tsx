import { useEffect, useRef } from "react";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { Typography } from "@material-ui/core";
import { CopyButton } from "../../components/CopyButton";
import { AgoraBroadcastService, AgoraVideo } from "../../streaming";
import {
    ConnectionStatus,
    ToggleCamera,
    ToggleMicrophone,
    ToggleScreenShare,
    UserCount
} from "./components";
import "./streaming.css";


const client: IAgoraRTCClient = AgoraRTC
    .createClient({ mode: "live", codec: "vp8" });


export const Broadcast: React.FC = () => {
    const channel = 'test_channel';
    const link = `${process.env.REACT_APP_HOME || ''}/join/${channel}`;
    const serviceRef = useRef(
        new AgoraBroadcastService(client, channel));
    const user = {};

    return <div className='stream-view'>

        <UserCount userObserver={serviceRef.current} />
        <ConnectionStatus connectionObserver={serviceRef.current} />

        <AgoraVideo
            className='stream-view__video'
            videoTrack={serviceRef.current.currentVideoTrack}
        />

        <ul className='container stream-view__menu'>
            <li className='link-container'>
                <Typography
                    style={{ maxWidth: '12rem', marginRight: '0.5rem' }}
                    noWrap
                >
                    {link}
                </Typography>

                <CopyButton className='icon-btn' text={link} />
            </li>

            <li><ToggleMicrophone broadcastService={serviceRef.current} /></li>
            <li><ToggleCamera broadcastService={serviceRef.current} /></li>
            <li><ToggleScreenShare broadcastService={serviceRef.current} /></li>

            <li style={{ marginLeft: 'auto' }}>
                
            </li>
        </ul>
    </div>
}
