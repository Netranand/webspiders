import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import LoginPage from '../containers/LoginPage';
import Logout from '../containers/Logout';
import SignupPage from '../containers/SignupPage';
import NotFound from './NotFound';
import HomePage from '../containers/HomePage';
import UserHomePage from '../containers/UserHomePage';
import FileManager from './context/FileManager';
import SubFolder from './context/SubFolder';


export const history = createHistory();

const Root = () => (
  <Switch>
    <Route exact path="/adminhomepage" component={HomePage} />
    <Route exact path="/" component={UserHomePage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/logout" component={Logout} />
    <Route exact path="/filemanager" component={FileManager} />
    <Route path="/subfolder" component={SubFolder} />
    <Route component={NotFound} />
  </Switch>
);

const App = withRouter(Root);

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;
