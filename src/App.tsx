import { BrowserRouter as Router, Switch, Route, RouteProps, Redirect, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AppStateProvider, useAppState } from './state/AppContext';
import { Home } from './pages/home';
import { Broadcast, Stream } from './pages/streaming';
import { Login } from './pages/auth';
import './App.css';
import './utilities.css';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AppStateProvider>
        <Router>
          <div className="App">
            <Switch>
              <Route path='/login'><Login /></Route>
              <ProtectedRoute path='/broadcast'><Broadcast /></ProtectedRoute>
              <ProtectedRoute path='/join/:channel'><Stream /></ProtectedRoute>
              <Route path='/'><Home /></Route>
            </Switch>
          </div>
        </Router>
      </AppStateProvider>
    </SnackbarProvider>
  );
}

const ProtectedRoute: React.FC<RouteProps> = ({ path, children, ...props }) => {
  const state = useAppState();
  const location = useLocation();

  if (!state.user) return <Redirect to={`/login?next=${location.pathname}`} />;

  return <Route path={path} {...props}>{children}</Route>
};

export default App;
