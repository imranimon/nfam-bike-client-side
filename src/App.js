import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Header from './Pages/Shared/Header/Header'
import Footer from './Pages/Shared/Footer/Footer'
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import NotFound from './Pages/NotFound/NotFound';
import Collections from './Pages/Collections/Collections';
import Purchase from './Pages/Purchase/Purchase';
import PrivateRoute from './Pages/Shared/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header></Header>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route path='/home'>
              <Home></Home>
            </Route>
            <Route path='/signIn'>
              <SignIn></SignIn>
            </Route>
            <Route path='/signUp'>
              <SignUp></SignUp>
            </Route>
            <Route path='/collections'>
              <Collections></Collections>
            </Route>
            <PrivateRoute path='/purchase/:_id'>
              <Purchase></Purchase>
            </PrivateRoute>
            <Route path='*'>
              <NotFound></NotFound>
            </Route>
          </Switch>
          <Footer></Footer>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
