import './App.css';
import { Route, useLocation } from "react-router-dom";
import { LandingPage, Home, Form, DetailDog } from './views';
import NavBar from './components/NavBar/NavBar'

function App() {
  const location = useLocation();
  console.log(location)
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/create">
        <Form />
      </Route>
      <Route exact path="/detaildog">
        <DetailDog />
      </Route>
    </div>
  );
}

export default App;
