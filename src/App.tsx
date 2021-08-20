import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppStateProvider } from './state/AppContext';
import { Home } from './pages/home';
import { Login } from './pages/auth';
import './App.css';
import './utilities.css';

function App() {
  return (
    <AppStateProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path='/login'><Login /></Route>
            <Route path='/'><Home /></Route>
          </Switch>
        </div>
      </Router>
    </AppStateProvider>
  );
}

export default App;
