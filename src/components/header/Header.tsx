import { PersonOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useAppState } from '../../state/AppContext';
import './header.css';

export const Header = () => {
    const appState = useAppState();

    const profileIcon = <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '0.5rem' }}>{appState.user?.email}</div>
        <PersonOutlined />
    </div>;
    const loginOrSignup = <nav>
        <ul>
            <li>
                <Link className='link-primary' to="/login">Login</Link>
            </li>
            <li className='or'>or</li>
            <li>
                <Link className='link-primary' to="/signup">Signup</Link>
            </li>
        </ul>
    </nav>

    return <header>
        <h1>
            <img className='logo' src={`${process.env.PUBLIC_URL}/logo.webp`} alt='logo' />
            Eagle Livestream
        </h1>

        {
            appState.user
                ? profileIcon
                : loginOrSignup
        }
    </header>
}
