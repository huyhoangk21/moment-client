import React from 'react';
import { Switch } from 'react-router-dom';
import DynamicRoute from './components/DynamicRoute';
import AuthProvider from './contexts/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <div>
        <Switch>
          <DynamicRoute
            exact
            path='/'
            authenticated
            component={Home}
            redirectTo='/login'
          />
          <DynamicRoute path='/login' component={Login} redirectTo='/' />
          <DynamicRoute path='/register' component={Register} redirectTo='/' />
        </Switch>
      </div>
    </AuthProvider>
  );
};

export default App;
