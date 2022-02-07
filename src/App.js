import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import MyAccount from "./components/MyAccount";
import Guests from "./components/Guests";
import { AuthProvider } from '../src/contexts/AuthContext'
import { Bookings } from "./components/Bookings";
import Rooms from "./components/Rooms";
import Forgetpassword from "./components/Forgetpassword";
import Register from "./components/Register";
import { useState } from "react";
import { useAuth } from '../src/contexts/AuthContext'
import { auth } from './firebase';

function App() {
  // const signedin = false;
  const [signedin,setSignedin]=useState(false);
  auth.onAuthStateChanged((user)=>{
    if(user){
      setSignedin(true);
       console.log(user, 'dfghjj')
    }else{
     
      setSignedin(false);
    }
});
  // const {currentUser}= useAuth()
  // console.log(auth.currentUser,"user")
  // console.log(useAuth,"user")

 // !auth.currentUser ? ( 

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Switch>
            
             {
              !signedin ? ( 
                <>
                 
                <Route exact path="/">
                    <SignIn />
                  </Route>
                  <Route exact path="/Register">
                    <Register />
                  </Route>
                  <Route exact path="/Forgetpassword">
                    <Forgetpassword />
                  </Route>
              
                 

                  

                </>
                 ) : (   
                <>
                    <Header />
                  <Route exact path="/Dashboard">
                    <Dashboard />
                  </Route>
                  <Route exact path="/MyAccount">
                    <MyAccount />
                  </Route>
                  <Route exact path="/Guests">
                    <Guests />
                  </Route>
                  <Route exact path="/Bookings">
                    <Bookings />
                  </Route>
                  <Route exact path="/Rooms">
                    <Rooms />
                  </Route>
                  </>
                 )
            }   



            {/* <Route exact path="/D">
        <Header/>
        </Route> */}


            {/* <Route exact path={'/Dashboard'} element={<Dashboard/>}/> */}
            {/* <Route exact path={'/MyAccount'} element={<MyAccount/>}/> */}
            {/* <Route exact path={'/Guests'} element={<Guests/>}/> */}
            {/* <Route exact path={'/Bookings'} element={<Bookings/>}/> */}
            {/* <Route exact path={'/Rooms'} element={<Rooms/>}/> */}
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
