import type {MoveEvent} from "vue3-chessboard";

const staffordGameEngine = (refutationRoll = 1.0) => {
    const mainRefutationBlack = ['e5', 'Nf6', 'Nc6', 'dxc6', 'Bc5', 'Ng4', 'Qh4', 'Qxg4', 'Bxg4'];
    const mainRefutationWhite = ['e4', 'Nf3', 'Nxe5', 'Nxc6', 'd3', 'Be2', 'Bxg4', 'g3', 'Qxg4'];
    const ohNoMyQueenBlack = ['e5', 'Nf6', 'Nc6', 'dxc6', 'Bc5', 'Nxe4', 'Bxf2', 'Bg4'];
    const ohNoMyQueenWhite = ['e4', 'Nf3', 'Nxe5', 'd3', 'Be2', 'Bg5', 'Bxd8', 'Ke2'];

    let staffordEngine;
    if (refutationRoll > 0.5) {
        staffordEngine = { blackMoves: mainRefutationBlack, whiteMoves: mainRefutationWhite };
    } else {
        staffordEngine = { blackMoves: ohNoMyQueenBlack, whiteMoves: ohNoMyQueenWhite };
    }

    function determineWhiteNextMove(history: MoveEvent[]) {
        let currentBlackLine = history.filter((item) => item.color === 'b').map(item => item.san);
        // play main refutation
        if (refutationRoll > 0.5 && mainRefutationBlack.filter((engine, idx) => engine === currentBlackLine[idx]).length
            === currentBlackLine.length) {
            return mainRefutationWhite.shift();
        }
        let engineMoveSoFar = ohNoMyQueenBlack.slice(0, currentBlackLine.length);
        // play fell for trap "Oh No My Queen"
        if (refutationRoll <= 0.5 && ohNoMyQueenBlack.filter((engine, idx) => engine === currentBlackLine[idx]).length
            === currentBlackLine.length) {
            return ohNoMyQueenWhite.shift();
        }

        // play vs computer
        if (engineMoveSoFar.some((engine, idx) => engine !== currentBlackLine[idx])) {
            console.log(`You are off the main line! ${staffordEngine.blackMoves[0]} !== ${currentBlackLine[0]}`)
        }
    }
    return { ...staffordEngine, determineWhiteNextMove };
}

export { staffordGameEngine };