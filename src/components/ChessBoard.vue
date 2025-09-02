<script setup lang="ts">
import type {BoardApi, BoardConfig} from 'vue3-chessboard';
import {type MoveEvent, TheChessboard} from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import { staffordGameEngine } from "../../engine/stafford_engine.ts";
// import STOCKFISH from 'stockfish/src/stockfish-17.1-asm-341ff22.js';

const props = defineProps<{ title: string }>()

let boardAPI: BoardApi;
const boardConfig: BoardConfig = {
  coordinates: true,
  orientation: "black"
};
let staffordEngine = staffordGameEngine(Math.random());
function handleCheckmate(isMated: string) {
  if (isMated === 'w') {
    alert('Black wins!');
  } else {
    alert('White wins!');
  }
}
function boardCreated(api: BoardApi) {
  boardAPI = api;
  staffordEngine = staffordGameEngine(Math.random());
  const currentWhiteMove = staffordEngine.whiteMoves.shift() ?? "";
  boardAPI.move(currentWhiteMove)
  return boardAPI;
}
function boardReset() {
  staffordEngine = staffordGameEngine(Math.random());
  boardAPI?.resetBoard();
  const currentWhiteMove = staffordEngine?.whiteMoves.shift() || "";
  boardAPI.move(currentWhiteMove)
}
function undoMove() {
  boardAPI?.undoLastMove();
  const history = boardAPI?.getHistory(true);
  const moveNumber = history.filter(({color}) => color === 'w')?.length
  for (let i = 0; i < moveNumber; i++) {
    staffordEngine.whiteMoves.shift()
  }
  console.log(staffordEngine.whiteMoves)
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
    const currentWhiteMove = staffordEngine?.determineWhiteNextMove(history);
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