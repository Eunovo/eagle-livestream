import { ILocalVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { useEffect, useRef, useState } from "react"
import { Observable, useObservable } from "../../Observable";

export interface AgoraVideoProps {
    className?: string
    videoTrack: Observable<IRemoteVideoTrack | ILocalVideoTrack | null>
}

export const AgoraVideo: React.FC<AgoraVideoProps> = ({ className, videoTrack }) => {
    const vidContainer = useRef<HTMLDivElement | null>(null);
    const track = useObservable<IRemoteVideoTrack | ILocalVideoTrack | null>(videoTrack);

    useEffect(() => {
        if (!track) return;

        try {
            if (!vidContainer.current) return;
            if (track.isPlaying) return;

            track.play(vidContainer.current);
        } catch (e) {
            console.log('Could not play video track');
        }

        return () => {
            if ((track as ILocalVideoTrack).setEnabled)
                (track as ILocalVideoTrack).setEnabled(false);
            else track.stop();
        };
    }, [vidContainer, track]);

    return <div ref={vidContainer} className={className}>

    </div>
}
