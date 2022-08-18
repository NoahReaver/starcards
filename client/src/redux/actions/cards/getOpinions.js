import axios from "axios";
import { GET_OPINIONS } from "../actionTypes";

export default function getOpinions(idCard) {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/opinions/all");
    const cardOpinions = response.data.filter(c => c.cardId === idCard)
    dispatch({ type: GET_OPINIONS, payload: cardOpinions });
  };
}