import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import {  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch } from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import MyAccount from "./components/MyAccount";
import Guests from "./components/Guests";

import { Bookings } from "./components/Bookings";
import Rooms from "./components/Rooms";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
        <Route exact path="/">
        <SignIn/>
        </Route>
        <Route exact path="/MyAccount">
        <MyAccount/>
        </Route>
        <Route exact path="/Guests">
        <Guests/>
        </Route>
        <Route exact path="/Bookings">
        <Bookings/>
        </Route>
          <Route exact path={'/Dashboard'} element={<Dashboard/>}/>
          {/* <Route exact path={'/MyAccount'} element={<MyAccount/>}/> */}
          {/* <Route exact path={'/Guests'} element={<Guests/>}/> */}
          {/* <Route exact path={'/Bookings'} element={<Bookings/>}/> */}
          {/* <Route exact path={'/Rooms'} element={<Rooms/>}/> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
