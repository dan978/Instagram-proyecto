import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TokenContextProvider } from "./components/TokenContextProvider";
import Instanow from "./Pages/InstanowPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import SeeUser from "./Pages/SeeUserPage";
import PhotoPage from "./Pages/PhotoPage";
import ProfilePage from "./Pages/ProfilePage";
import ProfileEditPage from "./Pages/ProfileEditPage";
import Upload from "./components/Upload";

function App() {
  return (
    <div className="App">
      <TokenContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Instanow />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/user/:id">
              <SeeUser />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/profile/edit">
              <ProfileEditPage />
            </Route>
            <Route exact path="/upload">
              <Upload />
            </Route>
            <Route exact path="/photo/:id">
              <PhotoPage />
            </Route>
          </Switch>
        </Router>
      </TokenContextProvider>
      <footer>©2021 Instanow Creado por: Daniel Borges y Oliver Santos</footer>
    </div>
  );
}

export default App;
