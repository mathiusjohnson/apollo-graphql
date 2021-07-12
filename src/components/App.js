import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import SignUp from './Login/SignUp';
import Login from './Login';
import Home from './Home';

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
