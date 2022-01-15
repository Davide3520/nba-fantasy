import axios from "axios";

const ALL_PLAYERS = 'ALL_PLAYERS'

const show_players = (players) => {
  return {
    type: ALL_PLAYERS,
    players
  }
}


export const all_players = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/players")
      const data = response.data;
      dispatch(show_players(data));
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export default function(state = [], action) {
  switch(action.type) {
    case ALL_PLAYERS:
      return action.players;
    default:
      return state;
  }
}
