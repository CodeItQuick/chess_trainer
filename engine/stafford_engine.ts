import type {MoveEvent} from "vue3-chessboard";

const staffordGameEngine = (refutationRoll = 1.0) => {
    const mainRefutationWhite = ['e4', 'Nf3', 'Nxe5', 'Nxc6', 'd3', 'Be2', 'Bxg4', 'g3', 'Qxg4'];
    const mainRefutationBlack = ['e5', 'Nf6', 'Nc6', 'dxc6', 'Bc5', 'Ng4', 'Qh4', 'Qxg4', 'Bxg4'];
    const ohNoMyQueenWhite = ['e4', 'Nf3', 'Nxe5', 'Nxc6', 'd3', 'Bg5', 'Bxd8', 'Ke2'];
    const ohNoMyQueenBlack = ['e5', 'Nf6', 'Nc6', 'dxc6', 'Bc5', 'Nxe4', 'Bxf2+', 'Bg4#'];
    const ohNoMyKnightWhite = ['e4', 'Nf3', 'Nxe5', 'Nxc6', 'e5', 'd3', 'dxe4', 'Kxf2'];
    const ohNoMyKnightBlack = ['e5', 'Nf6', 'Nc6', 'dxc6', 'Ne4', 'Bc5', 'Bxf2+', 'Qxd1-+'];

    const refutation = 0.75, queen = 0.5;
    let staffordEngine: { blackMoves: string[], whiteMoves: string[] } = { blackMoves: [], whiteMoves: [] };
    if (refutationRoll > refutation) {
        staffordEngine = { blackMoves: mainRefutationBlack, whiteMoves: mainRefutationWhite };
    } else if (refutationRoll < queen) {
        staffordEngine = { blackMoves: ohNoMyQueenBlack, whiteMoves: ohNoMyQueenWhite };
    } else {
        staffordEngine = { blackMoves: ohNoMyKnightBlack, whiteMoves: ohNoMyKnightWhite };
    }

    function determineWhiteNextMove(history: MoveEvent[]) {
        let currentBlackLine = history.filter((item) => item.color === 'b').map(item => item.san);
        // play main refutation
        if (refutationRoll > refutation && mainRefutationBlack.filter((engine, idx) => engine === currentBlackLine[idx]).length
            === currentBlackLine?.length) {
            return mainRefutationWhite.shift();
        }
        // play fell for trap "Oh No My Queen"
        if (refutationRoll < queen && ohNoMyQueenBlack.filter((engine, idx) => engine === currentBlackLine[idx]).length
            === currentBlackLine?.length) {
            return ohNoMyQueenWhite.shift();
        }
        // play fell for trap "Oh No My Knight"
        if (refutationRoll > queen && refutationRoll <= refutation && ohNoMyKnightBlack.filter((engine, idx) => engine === currentBlackLine[idx]).length
            === currentBlackLine?.length) {
            return ohNoMyKnightWhite.shift();
        }

        let engineMoveSoFar = mainRefutationBlack.slice(0, currentBlackLine?.length);
            // play vs computer
        if (engineMoveSoFar.some((engine, idx) => engine !== currentBlackLine[idx])) {
            console.log(`You are off the main line! ${staffordEngine.blackMoves[0]} !== ${currentBlackLine[0]}`)
        }
    }
    return { ...staffordEngine, determineWhiteNextMove };
}

export { staffordGameEngine };