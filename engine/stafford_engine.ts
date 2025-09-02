import type {MoveEvent} from "vue3-chessboard";

let staffordEngine: { blackMoves: string[], whiteMoves: string[] } = { blackMoves: [], whiteMoves: [] };
function staffordGameEngine() {
    const mainRefutationBlack = ['e5', 'Nf6', 'Nc6', 'dxc6', 'Bc5', 'Ng4', 'Qh4', 'Qxg4', 'Bxg4']
    const mainRefutationWhite = ['e4', 'Nf3', 'Nxe5', 'Nxc6', 'd3', 'Be2', 'Bxg4', 'g3', 'Qxg4']

    staffordEngine = { blackMoves: mainRefutationBlack, whiteMoves: mainRefutationWhite };

    function determineWhiteNextMove(history: MoveEvent[]) {
        let currentBlackLine = history.filter((item) => item.color === 'b').map(item => item.san);
        let engineMoveSoFar = staffordEngine.blackMoves.slice(0, currentBlackLine.length);
        if (engineMoveSoFar.some((engine, idx) => engine !== currentBlackLine[idx])) {
            console.log(`You are off the main line! ${staffordEngine.blackMoves[0]} !== ${currentBlackLine[0]}`)
        } else {
            return staffordEngine.whiteMoves.shift();
        }
    }
    return { ...staffordEngine, determineWhiteNextMove };
}

export { staffordGameEngine };