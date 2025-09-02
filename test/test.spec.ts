import assert from "node:assert";
import {staffordGameEngine} from "../engine/stafford_engine";
import type { MoveEvent } from "vue3-chessboard";

describe('knows the main refutation', function () {
    it('plays e4 on first move', function () {
        const staffordEngine = staffordGameEngine();
        const moves: MoveEvent[] = [];

        const firstMove = staffordEngine.determineWhiteNextMove(moves)

        assert.equal(firstMove, "e4")
    });
    it('plays Nf3 on second move', function () {
        const staffordEngine = staffordGameEngine();
        const moves: MoveEvent[] = [
            {
                after: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
                before: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
                color: "b",
                flags: "w",
                from: "e7",
                lan: "e2e4",
                piece: "p",
                san: "e5",
                to: "e5",
            } as MoveEvent
        ];
        staffordEngine.determineWhiteNextMove([]);

        const firstMove = staffordEngine.determineWhiteNextMove(moves)

        assert.equal(firstMove, "Nf3")
    });
    it('plays Be2 on seventh move', function () {
        const staffordEngine = staffordGameEngine();
        const moves: MoveEvent[] = [
            {
                color: "b",
                san: "e5"
            } as MoveEvent,
            {
                color: "b",
                san: "Nf6"
            } as MoveEvent,
            {
                color: "b",
                san: "Nc6"
            } as MoveEvent,
            {
                color: "b",
                san: "dxc6"
            } as MoveEvent,
            {
                color: "b",
                san: "Bc5"
            } as MoveEvent,
            {
                color: "b",
                san: "Ng4"
            } as MoveEvent,
            {
                color: "b",
                san: "Qh4"
            } as MoveEvent,
        ];
        staffordEngine.determineWhiteNextMove([]);
        staffordEngine.determineWhiteNextMove([moves[0]]);
        staffordEngine.determineWhiteNextMove([moves[0], moves[1]]);
        staffordEngine.determineWhiteNextMove([moves[0], moves[1], moves[2]]);
        staffordEngine.determineWhiteNextMove([moves[0], moves[1], moves[2], moves[3]]);
        staffordEngine.determineWhiteNextMove([moves[0], moves[1], moves[2], moves[3], moves[4]]);

        const firstMove = staffordEngine.determineWhiteNextMove(moves)

        assert.equal(firstMove, "Bxg4")
    });
    it('plays the entire refutation', function () {
        const staffordEngine = staffordGameEngine();
        const moves: MoveEvent[] = [
            {
                color: "b",
                san: "e5"
            } as MoveEvent,
            {
                color: "b",
                san: "Nf6"
            } as MoveEvent,
            {
                color: "b",
                san: "Nc6"
            } as MoveEvent,
            {
                color: "b",
                san: "dxc6"
            } as MoveEvent,
            {
                color: "b",
                san: "Bc5"
            } as MoveEvent,
            {
                color: "b",
                san: "Ng4"
            } as MoveEvent,
            {
                color: "b",
                san: "Qh4"
            } as MoveEvent,
            {
                color: "b",
                san: "Qxg4"
            } as MoveEvent,
            {
                color: "b",
                san: "Bxg4"
            } as MoveEvent,
        ];
        staffordEngine.determineWhiteNextMove([]);
        staffordEngine.determineWhiteNextMove([moves[0]]);
        staffordEngine.determineWhiteNextMove([moves[0], moves[1]]);
        staffordEngine.determineWhiteNextMove([moves[0], moves[1], moves[2]]);
        staffordEngine.determineWhiteNextMove([moves[0], moves[1], moves[2], moves[3]]);
        staffordEngine.determineWhiteNextMove([moves[0], moves[1], moves[2], moves[3], moves[4]]);
        staffordEngine.determineWhiteNextMove([moves[0], moves[1], moves[2], moves[3], moves[4], moves[5]]);
        staffordEngine.determineWhiteNextMove([moves[0], moves[1], moves[2], moves[3], moves[4], moves[5], moves[6]]);

        const firstMove = staffordEngine.determineWhiteNextMove(moves)

        assert.equal(firstMove, "Qxg4")
    });
})
describe('knows the oh no my queen trap', function () {
    let blackMoves: MoveEvent[] = [
        {
            color: "b",
            san: "e5"
        } as MoveEvent,
        {
            color: "b",
            san: "Nf6"
        } as MoveEvent,
        {
            color: "b",
            san: "Nc6"
        } as MoveEvent,
        {
            color: "b",
            san: "dxc6"
        } as MoveEvent,
        {
            color: "b",
            san: "Bc5"
        } as MoveEvent,
        {
            color: "b",
            san: "Nxe4"
        } as MoveEvent,
        {
            color: "b",
            san: "Bxf2+"
        } as MoveEvent,
        {
            color: "b",
            san: "Bg4#"
        } as MoveEvent
    ] as const;
    it('plays e4 on first move', function () {
        const staffordEngine = staffordGameEngine(0.4);

        const firstMove = staffordEngine.determineWhiteNextMove([blackMoves[0]])

        assert.equal(firstMove, "e4")
    });
    it('plays Nf3 on second move', function () {
        const staffordEngine = staffordGameEngine(0.4);
        const secondMove = [
            {
                after: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
                before: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
                color: "b",
                flags: "w",
                from: "e7",
                lan: "e2e4",
                piece: "p",
                san: "e5",
                to: "e5",
            } as MoveEvent
        ];
        staffordEngine.determineWhiteNextMove([]);

        const firstMove = staffordEngine.determineWhiteNextMove(secondMove)

        assert.equal(firstMove, "Nf3")
    });
    it('plays Bxg4 on seventh move', function () {
        const staffordEngine = staffordGameEngine(0.4);
        staffordEngine.determineWhiteNextMove([]);
        staffordEngine.determineWhiteNextMove([blackMoves[0]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2], blackMoves[3]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2], blackMoves[3], blackMoves[4]]);

        const firstMove = staffordEngine.determineWhiteNextMove(blackMoves)

        assert.equal(firstMove, "Bxd8")
    });
    it('plays the entire refutation', function () {
        const staffordEngine = staffordGameEngine(0.4);
        staffordEngine.determineWhiteNextMove([]);
        staffordEngine.determineWhiteNextMove([blackMoves[0]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2], blackMoves[3]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2], blackMoves[3], blackMoves[4]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2], blackMoves[3], blackMoves[4], blackMoves[5]]);

        const firstMove = staffordEngine.determineWhiteNextMove(blackMoves)

        assert.equal(firstMove, "Ke2")
    });
});

describe('knows the oh no my knight trap', function () {
    let blackMoves: MoveEvent[] = [
        {
            color: "b",
            san: "e5"
        } as MoveEvent,
        {
            color: "b",
            san: "Nf6"
        } as MoveEvent,
        {
            color: "b",
            san: "Nc6"
        } as MoveEvent,
        {
            color: "b",
            san: "dxc6"
        } as MoveEvent,
        {
            color: "b",
            san: "Ne4"
        } as MoveEvent,
        {
            color: "b",
            san: "Bc5"
        } as MoveEvent,
        {
            color: "b",
            san: "Bxf2+"
        } as MoveEvent,
        {
            color: "b",
            san: "Qxd1-+"
        } as MoveEvent
    ] as const;
    it('plays e4 on first move', function () {
        const staffordEngine = staffordGameEngine(0.65);

        const firstMove = staffordEngine.determineWhiteNextMove([blackMoves[0]])

        assert.equal(firstMove, "e4")
    });
    it('plays Nf3 on second move', function () {
        const staffordEngine = staffordGameEngine(0.65);
        const secondMove = [
            {
                after: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
                before: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
                color: "b",
                flags: "w",
                from: "e7",
                lan: "e2e4",
                piece: "p",
                san: "e5",
                to: "e5",
            } as MoveEvent
        ];
        staffordEngine.determineWhiteNextMove([]);

        const firstMove = staffordEngine.determineWhiteNextMove(secondMove)

        assert.equal(firstMove, "Nf3")
    });
    it('plays dxe4 on the seventh move', function () {
        const staffordEngine = staffordGameEngine(0.65);
        staffordEngine.determineWhiteNextMove([]);
        staffordEngine.determineWhiteNextMove([blackMoves[0]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2], blackMoves[3]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2], blackMoves[3], blackMoves[4]]);

        const firstMove = staffordEngine.determineWhiteNextMove(blackMoves)

        assert.equal(firstMove, "dxe4")
    });
    it('plays the entire refutation', function () {
        const staffordEngine = staffordGameEngine(0.65);
        staffordEngine.determineWhiteNextMove([]);
        staffordEngine.determineWhiteNextMove([blackMoves[0]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2], blackMoves[3]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2], blackMoves[3], blackMoves[4]]);
        staffordEngine.determineWhiteNextMove([blackMoves[0], blackMoves[1], blackMoves[2], blackMoves[3], blackMoves[4], blackMoves[5]]);

        const firstMove = staffordEngine.determineWhiteNextMove(blackMoves)

        assert.equal(firstMove, "Kxf2")
    });
});
