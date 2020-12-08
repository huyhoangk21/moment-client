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
      <div className='bg-gradient-to-r from-cyan-400 to-light-blue-500 w-full min-h-screen'>
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
