import { Home, Landing, Form, Detail } from './views';
import NavBar from './components/NavBar/NavBar.jsx';
import { Route, useLocation } from 'react-router-dom';


function App() {

const location = useLocation();

  return (
    <div className="App">

      {location.pathname !== '/' && <NavBar />}

      <Route exact path='/'>
      <Landing />
      </Route>

      <Route path='/home'>
      <Home />
      </Route>
      
      <Route path='/create'>
      <Form />
      </Route>

      <Route path='/detail/:id'>
      <Detail />
      </Route>


    </div>
  );
}

export default App;
