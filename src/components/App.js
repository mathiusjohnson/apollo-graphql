import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import CreateUser from './CreateUser';
import Login from './Login';
import UserList from './UserList';

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route exact path="/create" component={CreateUser} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
