import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

 
const tokenKey = "token";

//if user connected return the token, if not return undefind
export function getJwt() {
   return localStorage.getItem(tokenKey)? localStorage.getItem(tokenKey):null;
}

export function getMyFavsCards(){

  return http.get(`${apiUrl}/users/cards`).then((resp)=>resp.data)
          .catch(error => {
              console.log(error.response)
    });
  

}

export function insertCardsFavs(cards){
  return http.patch(`${apiUrl}/users/cards`,{cards})
  
}

export function getUserInfo(){
  if (this.getCurrentUser()){
          return http.get(`${apiUrl}/users/me`).then((resp)=>resp.data)
          .catch(error => {
              console.log(error.response)
    });}
    else return null; 
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    //return email password
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
 
export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}
 
 const userService={
  login,
  getCurrentUser,
  logout,
  getJwt,
  getUserInfo,
  insertCardsFavs,
  getMyFavsCards

};
export default userService;