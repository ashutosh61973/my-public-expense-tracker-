import React from 'react'
// import { NavBar } from './Components/NavBar';
import {Login} from './Components/Login';
import {Signup} from './Components/Signup';
import ForgetPassword from './Components/ForgetPassword'
import ResetPassword from './Components/ResetPassword'
import App from './App.js'
import {
    Switch,
    Route,
  } from "react-router-dom";  

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/"><App /></Route>
                <Route exact path="/home"><App /></Route>
                <Route  path="/login"><Login /></Route>
                <Route  path="/signup"><Signup /></Route>
                <Route  path="/forgotpassword"><ForgetPassword /></Route>
                <Route
                exact path="/passwordreset/:resetToken"
                component={ResetPassword}
                />
            </Switch>
        </div>
    )
}

export default Routes;
