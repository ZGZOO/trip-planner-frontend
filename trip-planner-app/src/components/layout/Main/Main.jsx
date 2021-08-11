import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./main.scss";
import Home from "../../routes/Home/Home";
import TeamPage from "../../routes/TeamPage/TeamPage";
import About from "../../routes/About/About";
import TripPage from "../../routes/TripPage/TripPage";
import "./main.scss"

const Main = () => {

  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={About} />
        <Route path="/trip/:id" component={TripPage} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </main>
  );
};

export default Main;
