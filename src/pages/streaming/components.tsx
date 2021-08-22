import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { CircularProgress, IconButton, Tooltip, Typography } from '@material-ui/core';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import { LinkOffOutlined, LinkOutlined, RemoveRedEyeOutlined } from '@material-ui/icons';
import { IBroadcastService, IConnectionObserver, IUserObserver, Status } from '../../streaming';
import { useObservable } from '../../Observable';
import { CopyButton } from '../../components/CopyButton';

export interface ToggleProps {
    broadcastService: IBroadcastService
}

export const ToggleCamera: React.FC<ToggleProps> = ({ broadcastService }) => {
    const on = useObservable(broadcastService.isVideoOn);

    return <Tooltip title={on ? 'Turn off camera' : 'Turn on camera'}>
        <IconButton
            className={clsx('icon-btn', { 'icon-btn--on': on })}
            onClick={() => {
                if (on) {
                    broadcastService.disableVideo();
                } else {
                    broadcastService.enableVideo();
                }
            }}
        >
            {!on
                ? <Videocam />
                : <VideocamOff />
            }
        </IconButton>
    </Tooltip>;
}

export const ToggleMicrophone: React.FC<ToggleProps> = ({ broadcastService }) => {
    const on = useObservable(broadcastService.isMicOn);

    return <Tooltip title={on ? 'Turn off mic' : 'Turn on mic'}>
        <IconButton
            className={clsx('icon-btn', { 'icon-btn--on': on })}
            onClick={() => {
                if (on) {
                    broadcastService.disableMic();
                } else {
                    broadcastService.enableMic();
                }
            }}
        >
            {!on
                ? <Mic />
                : <MicOff />
            }
        </IconButton>
    </Tooltip>;
}

export const ToggleScreenShare: React.FC<ToggleProps> = ({ broadcastService }) => {
    const on = useObservable(broadcastService.isScreenShareOn);

    return <Tooltip title={on ? 'Stop presenting screen' : 'Present screen'}>
        <IconButton
            className={clsx('icon-btn', { 'icon-btn--on': on })}
            onClick={() => {
                if (on) {
                    broadcastService.unshareScreen();
                } else {
                    broadcastService.shareScreen();
                }
            }}
        >
            {!on
                ? <ScreenShare />
                : <StopScreenShare />
            }
        </IconButton>
    </Tooltip>;
}

export const ToggleBroadcast: React.FC<ToggleProps> = ({ broadcastService }) => {
    const [loading, setLoading] = useState(false);
    const started = useObservable(broadcastService.isLive);

    return <button
        className={clsx('btn btn-primary', { 'btn-danger': started })}
        onClick={async () => {
            if (started) {
                broadcastService.stop();
                return;
            }
            setLoading(true);
            await broadcastService.start();
            setLoading(false);
        }}
        disabled={loading}
    >
        {loading && <CircularProgress
            color='inherit' size={20}
            style={{ marginRight: '0.5rem' }} />}
        {
            started ? 'Stop' : 'Broadcast'
        }
    </button>
}

export interface ConnectionStatusProps {
    connectionObserver: IConnectionObserver
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ connectionObserver }) => {
    const [status, setStatus] = useState<Status>(connectionObserver.getConnectionStatus());

    useEffect(() => connectionObserver
        .onConnectionStatusChanged((newStatus) => setStatus(newStatus)),
        []);

    return <div className={clsx('conn-status', `conn-status--${status}`)}>
        {
            status === Status.CONNECTING &&
            <CircularProgress size={20} style={{ marginRight: '0.5rem' }} />
        }
        {status}
    </div>
}

export interface UserCountProps {
    userObserver: IUserObserver
}

export const UserCount: React.FC<UserCountProps> = ({ userObserver }) => {
    const [count, setCount] = useState<number>(0);
    const [displayCount, setDisplayCount] = useState<string>(count.toString());
    const [updating, setUpdating] = useState(false);

    const formatCount = (count: number) => {
        if (count < 1000) return count.toString();
        if (count < 1000000) return `${Math.round(count / 1000)}K+`;
        return `${Math.round(count / 1000000)}M+`;
    }

    useEffect(() => {
        const subcriptions = [
            userObserver.onUserAdded(() => setCount(c => c + 1)),
            userObserver.onUserRemoved(() => setCount(c => c - 1))
        ];

        return () => subcriptions
            .forEach(unsubscribe => unsubscribe());
    }, []);

    useEffect(() => {
        const update = formatCount(count);
        if (update === displayCount) return;

        setUpdating(true);
        const timeout = setTimeout(() => {
            setUpdating(false);
            setDisplayCount(update);
        }, 300);

        return () => clearTimeout(timeout);
    }, [count])

    return <div
        className={clsx('user-count', { 'user-count--updating': updating })}>
        <Typography style={{ maxWidth: '2rem', marginRight: '0.5rem' }} noWrap>
            {displayCount}
        </Typography> <RemoveRedEyeOutlined />
    </div>
}

export interface LinkContainerProps {
    link: string
}

export const LinkContainer: React.FC<LinkContainerProps> = ({ link }) => {
    const [extended, setExtended] = useState(false);

    return <div className='link-container'>
        <IconButton className='icon-btn'
            color='inherit' onClick={() => setExtended(o => !o)}>
            {
                extended
                ? <LinkOffOutlined />
                : <LinkOutlined />
            }
        </IconButton>

        <div className={clsx('extend', { 'extend--show': extended })}>
            <Typography
                style={{ maxWidth: '12rem', marginRight: '0.5rem' }}
                noWrap
            >
                {link}
            </Typography>

            <CopyButton className='icon-btn' text={link} />
        </div>
    </div>
}
