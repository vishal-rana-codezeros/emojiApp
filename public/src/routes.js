import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Users = React.lazy(() => import('./views/Users/UsersModal'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const UserForm = React.lazy(() => import('./views/Users/UserForm'));
const Keyboards = React.lazy(() => import('./views/Pages/Keyboards/Keyboards')); 
const AboutUs=React.lazy(() => import('./views/Pages/About_Us/AboutUs')); 
const ContactUs=React.lazy(() => import('./views/Pages/Contact_Us/ContactUs')); 
// const Keyboards = React.lazy(() => import('./views/Pages/Keyboards/Keyboards')); 
const Categories = React.lazy(() => import('./views/Pages/Categories/Categories')); 
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Users },
  { path: '/add-user', name: 'Users', component: UserForm },
  {path:'/keyboards', exact:true, name: 'Keyboards', component:Keyboards},
  {path:'/AboutUs', name: 'AboutUs', component:AboutUs},
  {path:'/ContactUs', name: 'ContactUs', component:ContactUs },
  {path:'/keyboards/Categories', name: 'Categories', component:Categories },
  {path:'/keyboards/Keyboards', name: 'Keyboards', component:Keyboards }
];

export default routes;
