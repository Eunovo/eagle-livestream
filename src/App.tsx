import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AppStateProvider } from './state/AppContext';
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
              <Route path='/broadcast'><Broadcast /></Route>
              <Route path='/join/:channel'><Stream /></Route>
              <Route path='/'><Home /></Route>
            </Switch>
          </div>
        </Router>
      </AppStateProvider>
    </SnackbarProvider>
  );
}

export default App;
