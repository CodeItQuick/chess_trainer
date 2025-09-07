<script setup lang="ts">
import type {BoardApi, BoardConfig} from 'vue3-chessboard';
import {type MoveEvent, TheChessboard} from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import { gameEngine } from "../../engine/stafford_engine.ts";
import {ref} from "vue";
import {stafford_lines} from "../../engine/stafford_lines.ts";
// import STOCKFISH from 'stockfish/src/stockfish-17.1-asm-341ff22.js';

defineProps<{ title: string }>()

let boardAPI: BoardApi;
const boardConfig: BoardConfig = {
  coordinates: true,
  orientation: "black"
};
let staffordEngine: {
  determineWhiteNextMove: (history: MoveEvent[]) => string | undefined;
  determineBlackNextMove: (history: MoveEvent[]) => string | undefined;
  lineName: string;
  blackNextMove: string;
  whiteMoves: string[];
  blackMoves: string[];
} = { whiteMoves: [], blackMoves: [], determineWhiteNextMove: () => undefined, determineBlackNextMove: () => undefined, lineName: "", blackNextMove: "" };
function handleCheckmate(isMated: string) {
  if (isMated === 'w') {
    alert('Black wins!');
  } else {
    alert('White wins!');
  }
}
function boardCreated(api: BoardApi) {
  boardAPI = api;
  staffordEngine = gameEngine(Math.random(), stafford_lines);
  const currentWhiteMove = staffordEngine.whiteMoves[0] ?? "";
  boardAPI.move(currentWhiteMove)
  staffordLineName.value = staffordEngine.lineName;
  return boardAPI;
}
function newGameBlack() {
  staffordEngine = gameEngine(Math.random(), stafford_lines);
  boardAPI?.resetBoard();
  playerColor.value = 'b';
  const currentWhiteMove = staffordEngine?.whiteMoves[0] || "";
  staffordLineName.value = staffordEngine.lineName;
  boardAPI.move(currentWhiteMove)
}
function newGameWhite() {
  staffordEngine = gameEngine(Math.random(), stafford_lines);
  boardAPI?.resetBoard();
  boardAPI?.toggleOrientation();
  playerColor.value = 'w';
}
function undoMove() {
  boardAPI?.undoLastMove();
}

function handleMove(_move: MoveEvent) {
  showHint.value = false;
  const history = boardAPI.getHistory(true);

  let currentMove;
  if (playerColor.value === 'b') {
    currentMove = staffordEngine?.determineWhiteNextMove(history);
  } else {
    currentMove = staffordEngine?.determineBlackNextMove(history);
  }
  if (currentMove === undefined) {
    alert('You are off the line! Try again!');
    return false;
  }
  if (currentMove !== "") {
    boardAPI.move(currentMove);
  } else {
    alert("You got the line correct!")
  }
  return true;
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
const hint = () => {
  const blackMove = staffordEngine?.determineBlackNextMove(boardAPI?.getHistory(true) ?? []);
  blackNextMove.value = blackMove ?? "";
  showHint.value = !showHint.value;
}

const staffordLineName = ref(staffordEngine.lineName ?? "")
const blackNextMove = ref(staffordEngine.blackNextMove)
const showHint = ref(false);
const playerColor = ref('b');

</script>

<template>
  <section>
    <h1>{{ title }}: {{ staffordLineName }}</h1>
    <div>
      <button @click="newGameBlack">New Game Black</button>
      <button @click="newGameWhite">New Game White</button>
      <button @click="undoMove">Undo</button>
      <button @click="boardAPI?.toggleMoves()">Threats</button>
      <button @click="hint">Hint</button>
      <div v-if="showHint">{{blackNextMove}}</div>
    </div>
    <TheChessboard
        :board-config="boardConfig"
        @board-created="boardCreated"
        @checkmate="handleCheckmate"
        @move="handleMove"
    />
  </section>
</template>