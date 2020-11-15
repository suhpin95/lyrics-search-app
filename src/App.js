import "./App.css";
import React from "react";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "./context";
function App() {
  return (
    <Provider>
      <Router>
        <React.Fragment>
          <Navbar />
        </React.Fragment>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Index} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
