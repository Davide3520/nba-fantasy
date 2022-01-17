import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { all_players } from "../store/players-store";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Players = (props) => {

  useEffect(() => {
    props.fetchPlayers()
  }, [])
  const {players} = props;
  console.log(players)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label= "simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Team</TableCell>
            <TableCell align="center">Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => {
            return (
            <TableRow
              key={player.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{player.firstName}</TableCell>
                <TableCell align="center">{player.lastName}</TableCell>
                <TableCell align="center">{player.position}</TableCell>
                <TableCell align="center">{player.team}</TableCell>
              </TableRow>
            )})}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapState = (state) => {
  return {
    players: state.allPlayers,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchPlayers: () => dispatch(all_players()),
  }
}

export default connect(mapState, mapDispatch)(Players)
