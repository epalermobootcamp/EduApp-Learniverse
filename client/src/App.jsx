
import { Outlet } from 'react-router-dom';
import Navigation from './components/NavBar.jsx';
import './style/general.css';

function App() {
  
  return (
    <>
      <Navigation />
      <main className="mx-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;