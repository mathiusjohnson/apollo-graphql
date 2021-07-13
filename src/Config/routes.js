import HomePage from '../components/Home';
import LoginPage from '../components/Login';

const routes = [
  {
    path: '/',
    component: HomePage,
    isPrivate: true,
  },
  {
    path: '/login',
    component: LoginPage,
    isPrivate: false,
  },
];

export default routes;
