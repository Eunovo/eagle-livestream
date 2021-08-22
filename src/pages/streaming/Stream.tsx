import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { AgoraStreamService, AgoraVideo } from "../../streaming";
import { UserCount, ConnectionStatus, ToggleAudio, ToggleVideo } from "./components";
import "./streaming.css";

export const Stream: React.FC = () => {
    const { channel } = useParams<{ channel: string }>();
    const serviceRef = useRef(
        new AgoraStreamService(
            AgoraRTC.createClient({ mode: "live", codec: "vp8" }),
            channel
        )
    );

    useEffect(() => {
        const service = serviceRef.current;
        service.join();
        return () => {
            service.leave();
        }
    }, []);

    return <div className='stream-view'>
        <UserCount userObserver={serviceRef.current} />
        <ConnectionStatus connectionObserver={serviceRef.current} />

        <AgoraVideo
            className='stream-view__video'
            videoTrack={serviceRef.current.currentVideoTrack}
        />

        <ul className='container stream-view__menu'>

            <li style={{ marginLeft: 'auto' }}>
                <ToggleAudio streamService={serviceRef.current} />
            </li>
            <li><ToggleVideo streamService={serviceRef.current} /></li>

            <li style={{ marginLeft: 'auto' }}>
                <button className='btn btn-danger'>
                    Leave
                </button>
            </li>
        </ul>
    </div>
}
