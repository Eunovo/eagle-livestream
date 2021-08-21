import { ILocalVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { useEffect, useRef } from "react"

export interface AgoraVideoProps {
    className?: string
    videoTrack: Promise<ILocalVideoTrack | IRemoteVideoTrack>
}

export const AgoraVideo: React.FC<AgoraVideoProps> = ({ className, videoTrack }) => {
    const vidContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const track = await videoTrack;
                if (!vidContainer.current) return;
                if (track.isPlaying) return;

                track.play(vidContainer.current);
            } catch (e) {
                console.log('Could not play video track');
            }
        })();

        return () => {
            videoTrack.then((track) => track.stop());
        }
    }, [vidContainer, videoTrack]);

    return <div ref={vidContainer} className={className}>

    </div>
}
