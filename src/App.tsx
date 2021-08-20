import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from './pages/home';
import './App.css';
import './utilities.css';
import { AppStateProvider } from './state/AppContext';

function App() {
  return (
    <AppStateProvider>
      <Router>
        <div className="App">
          <Home />
        </div>
      </Router>
    </AppStateProvider>
  );
}

export default App;
