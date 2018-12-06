import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Users = React.lazy(() => import('./views/Users/UsersModal'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const UserForm = React.lazy(() => import('./views/Users/UserForm'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Users },
  { path: '/add-user', name: 'Users', component: UserForm },
];

export default routes;
