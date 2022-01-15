import React from "react";
import { connect } from "react-redux";
import { all_players } from "../store/players-store";

export const Players = (props) => {
  return (
    <h3>PLAYERSSSS</h3>
  )
}

const mapState = (state) => {
  return {
    players: state.allPlayers,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchPlayers: () => dispatch(all_players),
  }
}

export default connect(mapState, mapDispatch)(Players)
