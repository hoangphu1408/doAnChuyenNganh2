import "./App.css";
import Login from "./layouts/login/";
import { BrowserRouter, Router, Route, Redirect } from "react-router-dom";
import { Fragment } from "react";
import { Auth, NotAuth } from "./routes/Auth";
import Test from "./layouts/test";
import history from "./routes/history";
import Admin from "./layouts/Admin";
function App() {
  return (
    <BrowserRouter>
      <Router history={history}>
        <Fragment>
          <Route exact path="/">
            <Redirect to="/login"></Redirect>
          </Route>

          <Route exact path="/test2" Component={Test}></Route>
          <Auth path="/admin" Component={Admin}></Auth>
          <NotAuth path="/login" Component={Login}></NotAuth>
          <NotAuth exact path="/verify-mail/:id" Component={Login}></NotAuth>
        </Fragment>
      </Router>
    </BrowserRouter>
  );
}

export default App;
