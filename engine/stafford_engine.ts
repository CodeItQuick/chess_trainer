import type {MoveEvent} from "vue3-chessboard";
import { stafford_lines } from "./stafford_lines";


const staffordGameEngine = (refutationRoll = 0.99) => {

    const roll = refutationRoll === 1.0 ? "0.99" : refutationRoll * stafford_lines.length + ""
    const staffordIdx = parseInt(roll, 10)
    let staffordEngine: { blackMoves: string[], whiteMoves: string[], lineName: string } = {
        blackMoves: stafford_lines[staffordIdx].black,
        whiteMoves: stafford_lines[staffordIdx].white,
        lineName: stafford_lines[staffordIdx].line.split('-').join(' ')
    };


    function determineWhiteNextMove(history: MoveEvent[]) {
        let currentBlackLine = history.filter((item) => item.color === 'b').map(item => item.san);
        // play main refutation
        if (staffordEngine.blackMoves.filter((move, idx) => move === currentBlackLine[idx]).length
            === currentBlackLine?.length) {
            const nextMove = staffordEngine.whiteMoves[currentBlackLine.length]
            return nextMove;
        }

        let engineMoveSoFar = staffordEngine.blackMoves.slice(0, currentBlackLine?.length);
            // play vs computer
        if (engineMoveSoFar.some((engine, idx) => engine !== currentBlackLine[idx])) {
            console.log(`You are off the main line! ${staffordEngine.blackMoves[0]} !== ${currentBlackLine[0]}`)
        }
    }
    return { ...staffordEngine, determineWhiteNextMove };
}

export { staffordGameEngine };