// sources: https://en.wikipedia.org/wiki/Danish_Gambit
// gambit for white
let evans_lines = [
    // the old main lines
    // {
    //     line: 'main-line-mieses-defence',
    //     white: ['e4', 'Nf3', 'Bc4', "b4",   "c3", "d4", "O-O"],
    //     black: ['e5', 'Nc6', 'Bc5', "Bxb4", "Ba5", "exd4", "Nge7"]
    // },
    // {
    //     line: 'main-line-compromised-defence',
    //     white: ['e4', 'Nf3', 'Bc4', "b4",   "c3", "d4", "O-O"],
    //     black: ['e5', 'Nc6', 'Bc5', "Bxb4", "Ba5", "exd4", "dxc3"]
    // },
    {
        line: 'main-line-anderssen-defence',
        white: ['e4', 'Nf3', 'Bc4', "b4",   "c3", "d4", "O-O",   "Ba3", "e5", "Bb5"],
        black: ['e5', 'Nc6', 'Bc5', "Bxb4", "Ba5", "exd4", "Nf6", "d6", "d5"]
    },
    // there are a lot of valid moves for main-line at the end
    {
        line: 'd4-d6-lasker-defence',
        white: ['e4', 'Nf3', 'Bc4', "b4",   "c3", "d4", "O-O"],
        black: ['e5', 'Nc6', 'Bc5', "Bxb4", "Ba5", "d6", "Bb6"]
    },
    {
        line: 'd4-d6-tartakower-attack',
        white: ['e4', 'Nf3', 'Bc4', "b4",   "c3", "d4", "O-O"],
        black: ['e5', 'Nc6', 'Bc5', "Bxb4", "Ba5", "d6", "Qb3"]
    },
    // there are a lot of valid moves for d4-d6 at the end
    {
        line: 'Modern-Defense',
        white: ['e4', 'Nf3', 'Bc4', "b4",   "c3", "d4",    "O-O"],
        black: ['e5', 'Nc6', 'Bc5', "Bxb4", "Bc5", "exd4", "d6"]
    },
    {
        line: 'Declined',
        white: ['e4', 'Nf3', 'Bc4', "b4",   "c3", "a6"],
        black: ['e5', 'Nc6', 'Bc5', "Bd4", "Bb6",     ]
    }
];

export { evans_lines};