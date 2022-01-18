import './App.css';
import React, {Component} from 'react';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import About from "./components/about";
import Home from "./components/home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import BizSignup from "./components/bizSignup";
import CreateCard from "./components/createCard";
import Logout from "./components/logout";
import userService from "./services/userService";
import {Switch,Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import MyCards from "./components/myCards";
import EditCards from "./components/editCard";
import MyFavsCards from "./components/myFavsCards";

 


class App extends Component {

    state = {
    user: null,
    userInfo: null,
  };
 
  async componentDidMount() {
    const user = userService.getCurrentUser();
    const userInfo= await userService.getUserInfo();
    this.setState({ user , userInfo });
    // console.log("user:", user);
      // "apiUrl": "http://localhost:3900/api"
      //    "apiUrl": "https://fashion-cards-2021.herokuapp.com/api"


  }


  render() {   
    const {user, userInfo}=this.state;
    return ( 
      <React.Fragment>
      <ToastContainer/>
      <header>
        <Navbar user={user} userInfo={userInfo}/>
      </header>
      <main style={{ minHeight: 900 }}>
        <Switch>
          <ProtectedRoute path="/my-cards/edit/:id" component={EditCards} biz={true} />
          <ProtectedRoute path="/my-favs" component={MyFavsCards} biz={false} />
          <ProtectedRoute path="/my-cards" component={MyCards} biz={true}  />
          <ProtectedRoute path="/create-card" component={CreateCard} biz={true}/>
          <Route path="/about" component={About}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/biz-signup" component={BizSignup}/>
          <Route path="/"  exact component={Home}  />
        </Switch>
      </main>
      <footer>
        <Footer/>
      </footer>
    </React.Fragment>
     );
  }
}
 
export default App;


