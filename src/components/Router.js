import React from "react";
import { HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";


const AppRouter = ({ isLoggedIn , userObj}) => {
    return(
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                <>
                <Route excat path="/" >
                    <Home userObj={userObj} />
                </Route>
                <Route excat path="/profile" >
                    <Profile />
                </Route>
               
                </> 
                ) : (
                 <Route excat path="/"> 
                   <Auth />
                 </Route>
                  
                )} 
            </Switch>
        </Router>
    ) 
}
export default AppRouter