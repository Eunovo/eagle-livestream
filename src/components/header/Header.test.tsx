import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContext } from '../../state/AppContext';
import { Header } from './Header';

test('Header shows auth links when user is logged out', () => {
    render(<Router>
        <AppContext.Provider value={{}}>
            <Header />
        </AppContext.Provider>
    </Router>);

    const loginEl = screen.getByText('Login');
    const signupEl = screen.getByText('Signup');

    expect(loginEl).toBeInTheDocument();
    expect(signupEl).toBeInTheDocument();
});

test('Header shows logged in user', () => {
    render(<AppContext.Provider value={{
        user: {
            firstName: 'John',
            lastName: 'Jonnes',
            email: 'john4life@gmail.com'
        }
    }}>
        <Header />
    </AppContext.Provider>);

    const header = screen.getByRole('banner');

    expect(header).not.toHaveTextContent('Login');
    expect(header).not.toHaveTextContent('Signup');
    expect(screen.getByAltText('user')).toBeInTheDocument();
});
