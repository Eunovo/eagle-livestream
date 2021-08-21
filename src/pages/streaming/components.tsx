import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import { IBroadcastService } from '../../streaming';

export interface ToggleProps {
    broadcastService: IBroadcastService
}

export const ToggleCamera: React.FC<ToggleProps> = ({ broadcastService }) => {
    const [on, setOn] = useState(true);

    return <IconButton
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
            ? <Videocam htmlColor='white' />
            : <VideocamOff htmlColor='red' />
        }
    </IconButton>;
}

export const ToggleMicrophone: React.FC<ToggleProps> = ({ broadcastService }) => {
    const [on, setOn] = useState(true);

    return <IconButton
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
            ? <Mic htmlColor='white' />
            : <MicOff htmlColor='red' />
        }
    </IconButton>;
}
