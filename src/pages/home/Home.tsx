import { Card, CardContent } from '@material-ui/core';
import { LinkOutlined, SecurityOutlined, VolumeUpOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { Header } from '../../components/header';
import { useAppState } from '../../state/AppContext';
import './home.css';

export const Home = () => {
    const history = useHistory();
    const appState = useAppState();

    return <>
        <Header />
        <div className='container home'>

            <div className='home__main'>
                <div className='top'>
                    <div className='main-text'>
                        Broadcast your events to the World
                    </div>

                    <button className='get-started btn btn-primary'
                        onClick={() => history.push(appState.user ? '/broadcast' : '/login')}>
                        {appState.user ? 'Start a Broadcast' : 'Get Started' }
                    </button>
                </div>

                <div className='bottom'>
                    <Card className='card bg-light'>
                        <CardContent>
                            <div className='card__icon'>
                                <VolumeUpOutlined fontSize='inherit' />
                            </div>

                            <h2 className='card__title'>
                                Broadcast
                            </h2>

                            <div className='card__body'>
                                Share your events with the world over our low latency network
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='card bg-light'>
                        <CardContent>
                            <div className='card__icon'>
                                <LinkOutlined fontSize='inherit' />
                            </div>

                            <h2 className='card__title'>
                                Invite
                            </h2>

                            <div className='card__body'>
                                Invite your audience by sharing your link with them
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='card bg-light'>
                        <CardContent>
                            <div className='card__icon'>
                                <SecurityOutlined fontSize='inherit' />
                            </div>

                            <h2 className='card__title'>
                                Secure
                            </h2>

                            <div className='card__body'>
                                Only users that have your link can join
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </>
}
