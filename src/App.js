import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';
import MenuBar from './components/MenuBar';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import EditUser from './pages/EditUser'
import ForgotPassowrd from './pages/ForgotPassword';







function App() {
  return (
    <AuthProvider>
      <Router>
        <Container >
          <MenuBar />
          <AuthRoute exact path='/' component={Dashboard} />
          <AuthRoute exact path='/edit/:id' component={EditUser} />
          <AuthRoute exact path='/add' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/forgotPassword' component={ForgotPassowrd} />
        </Container>
      </Router >
    </AuthProvider>
  );
}

export default App;
