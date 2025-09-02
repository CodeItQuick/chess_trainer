<script setup lang="ts">
import type {BoardApi, BoardConfig} from 'vue3-chessboard';
import {type MoveEvent, TheChessboard} from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import STOCKFISH from 'stockfish/src/stockfish-17.1-asm-341ff22.js';

const props = defineProps<{ title: string }>()

let boardAPI: BoardApi;
const boardConfig: BoardConfig = {
  coordinates: true,
  orientation: "black"
};

function handleCheckmate(isMated: string) {
  if (isMated === 'w') {
    alert('Black wins!');
  } else {
    alert('White wins!');
  }
}

let staffordEngine;
function boardCreated(api: BoardApi) {
  boardAPI = api;
  staffordEngine = staffordGameEngine();
  const currentWhiteMove = staffordEngine.whiteMoves.shift();
  boardAPI.move(currentWhiteMove)
  return boardAPI;
}
function boardReset() {
  staffordEngine = staffordGameEngine();
  boardAPI?.resetBoard();
  const currentWhiteMove = staffordEngine.whiteMoves.shift();
  boardAPI.move(currentWhiteMove)
}
function undoMove() {
  staffordEngine = staffordGameEngine();
  boardAPI?.undoLastMove();
  const history = boardAPI?.getHistory(true);
  const moveNumber = history.filter(({color}) => color === 'w')?.length
  for (let i = 0; i < moveNumber; i++) {
    staffordEngine.whiteMoves.shift()
  }
  console.log(staffordEngine.whiteMoves)
}

function staffordGameEngine() {
  const mainRefutationBlack = ['e5', 'Nf6', 'Nc6', 'dxc6', 'Bc5', 'Ng4', 'Qh4', 'Qxg4', 'Bxg4']
  const mainRefutationWhite = ['e4', 'Nf3', 'Nxe5', 'Nxc6', 'd3', 'Be2', 'Bxg4', 'g3', 'Qxg4']

  function determineWhiteNextMove(history: MoveEvent[]) {
    let currentBlackLine = history.filter((item) => item.color === 'b').map(item => item.san);
    let engineMoveSoFar = staffordEngine.blackMoves.slice(0, currentBlackLine.length);
    if (engineMoveSoFar.some((engine, idx) => engine !== currentBlackLine[idx])) {
      console.log(`You are off the main line! ${staffordEngine.blackMoves[0]} !== ${currentBlackLine[0]}`)
    } else {
      return staffordEngine.whiteMoves.shift();
    }
  }
  return { blackMoves: mainRefutationBlack, whiteMoves: mainRefutationWhite, determineWhiteNextMove };
}


function handleMove(move: MoveEvent) {
  console.log(move)
  // if (move.color === 'w') {
  //   const history = boardAPI.getHistory();
  //   const currentBlackMove = staffordEngine.blackMoves.shift();
  //   console.log(history)
  //   console.log(currentBlackMove)
  //   boardAPI.move(currentBlackMove)
  // }
  // hero is playing black
  if (move.color === 'b') {
    const history = boardAPI.getHistory(true);
    const currentWhiteMove = staffordEngine.determineWhiteNextMove(history);
    boardAPI.move(currentWhiteMove)
  }
}

// let stockfishLog = []
// const stockfish = await STOCKFISH({
//   listener: function(msg) { stockfishLog.push(msg) }
// })
// console.log(STOCKFISH)
// // A4, B3, f3, w3, Q3
// stockfish.ccall("command", ['string'], ["string"], ['e5'], {async: /^go\b/.test('e5')})
// stockfish.ccall("command", ['string'], ["string"], ['uci'], {async: /^go\b/.test('uci')})
// stockfish.ccall("command", ['string'], ["string"], ['position startpos moves e2e4'], {async: /^go\b/.test('position startpos moves e2e4')})
// let stuff = stockfish.ccall("command", ["string"], ["string"], ['go movetime 800'], {async: /^go\b/.test('go movetime 800')})
// stockfish.ccall("command", ["string"], ["string"], ['stop'], {async: /^go\b/.test('go movetime 800')})
// console.log(stockfishLog)
</script>

<template>
  <section>
    <h1>{{ title }}</h1>
    <div>
      <button @click="boardAPI?.toggleOrientation()">
        Toggle orientation
      </button>
      <button @click="boardReset">Reset</button>
      <button @click="undoMove">Undo</button>
      <button @click="boardAPI?.toggleMoves()">Threats</button>
    </div>
    <TheChessboard
        :board-config="boardConfig"
        @board-created="boardCreated"
        @checkmate="handleCheckmate"
        @move="handleMove"
    />
  </section>
</template>