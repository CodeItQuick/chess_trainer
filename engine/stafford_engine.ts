import type {MoveEvent} from "vue3-chessboard";
import { stafford_lines } from "./stafford_lines";


const staffordGameEngine = (refutationRoll = 1.0) => {

    const refutation = 0.75, queen = 0.5;
    let staffordIdx = 0;
    if (refutationRoll > refutation) {
        staffordIdx = 0;
    } else if (refutationRoll < queen) {
        staffordIdx = 1;
    } else {
        staffordIdx = 2;
    }
    let staffordEngine: { blackMoves: string[], whiteMoves: string[] } = {
        blackMoves: stafford_lines[staffordIdx].black,
        whiteMoves: stafford_lines[staffordIdx].white
    };


    function determineWhiteNextMove(history: MoveEvent[]) {
        let currentBlackLine = history.filter((item) => item.color === 'b').map(item => item.san);
        // play main refutation
        if (staffordEngine.blackMoves.filter((move, idx) => move === currentBlackLine[idx]).length
            === currentBlackLine?.length) {
            const nextMove = staffordEngine.whiteMoves[history.length]
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