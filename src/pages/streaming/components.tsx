import clsx from 'clsx';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import { IBroadcastService } from '../../streaming';

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
