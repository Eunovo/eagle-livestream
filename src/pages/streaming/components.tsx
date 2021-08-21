import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { CircularProgress, IconButton } from '@material-ui/core';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import { IBroadcastService, IConnectionObserver, Status } from '../../streaming';

export interface ToggleProps {
    broadcastService: IBroadcastService
}

export const ToggleCamera: React.FC<ToggleProps> = ({ broadcastService }) => {
    const [on, setOn] = useState(true);

    return <IconButton
        className={clsx('icon-btn', { 'icon-btn--on': on })}
        onClick={() => setOn((on) => {
            if (on) {
                broadcastService.disableVideo();
                return false;
            } else {
                broadcastService.enableVideo();
                return true;
            }
        })}
    >
        {!on
            ? <Videocam />
            : <VideocamOff />
        }
    </IconButton>;
}

export const ToggleMicrophone: React.FC<ToggleProps> = ({ broadcastService }) => {
    const [on, setOn] = useState(true);

    return <IconButton
        className={clsx('icon-btn', { 'icon-btn--on': on })}
        onClick={() => setOn((on) => {
            if (on) {
                broadcastService.disableMic();
                return false;
            } else {
                broadcastService.enableMic();
                return true;
            }
        })}
    >
        {!on
            ? <Mic />
            : <MicOff />
        }
    </IconButton>;
}

export const ToggleScreenShare: React.FC<ToggleProps> = ({ broadcastService }) => {
    const [on, setOn] = useState(false);

    return <IconButton
        className={clsx('icon-btn', { 'icon-btn--on': on })}
        onClick={() => setOn((on) => {
            if (on) {
                // broadcastService.disableMic();
                return false;
            } else {
                // broadcastService.enableMic();
                return true;
            }
        })}
    >
        {!on
            ? <ScreenShare />
            : <StopScreenShare />
        }
    </IconButton>;
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
