import http from "./httpService";
import { apiUrl } from "../config.json";

export function searchCards(_search){
  return http.get(`${apiUrl}/cards/?search=${_search}`).then((resp)=>resp.data)
          .catch(error => {
              console.log(error.response)});
  
}

export function getAllCards(){
 return http.get(`${apiUrl}/cards/all-cards`)
}

export function getCard(cardID){
  return http.get(`${apiUrl}/cards/${cardID}`)
}

export function editCard(card) {
  const cardId = card._id;
  delete card._id;
  return http.put(`${apiUrl}/cards/${cardId}`, card);
}

export function deleteCard(cardID){
  return http.delete(`${apiUrl}/cards/${cardID}`);
}

export function getMyCards() {
  return http.get(`${apiUrl}/cards/my-cards`);
}

export function createCard(card) {
  return http.post(`${apiUrl}/cards`, card);
}

const cardService = {
  createCard,
  getMyCards,
  getCard,
  editCard,
  deleteCard,
  getAllCards,
  searchCards
};
export default cardService;