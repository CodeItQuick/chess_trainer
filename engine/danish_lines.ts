// sources: https://en.wikipedia.org/wiki/Danish_Gambit
// gambit for white
let danish_lines = [
    {
        line: 'alekhine-variation-1',
        white: ['e4', 'd4',   'c3',   'Nxc3', 'Bc4', 'Nf3'],
        black: ['e5', 'exd4', 'dxc3', 'd6',   'Nc6']
    },
    {
        line: 'alekhine-variation-2',
        white: ['e4', 'd4',   'c3',   'Nxc3', 'Bc4', 'Nf3'],
        black: ['e5', 'exd4', 'dxc3', 'Bc5',  'Nc6']
    },
    {
        line: 'alekhine-variation-3',
        white: ['e4', 'd4',   'c3',   'Nxc3', 'Bc4', 'Nf3'],
        black: ['e5', 'exd4', 'dxc3', 'Nc6',  'Bc5']
    },
    // there is an alekhine-variation-4 but I'm not sure what it is
    {
        line: 'lindehns-continuation-1',
        white: ['e4', 'd4',   'c3',   'Bc4', 'Nxc3'],
        black: ['e5', 'exd4', 'dxc3', 'd6']
    },
    {
        line: 'lindehns-continuation-2-aa',
        white: ['e4', 'd4',   'c3',   'Bc4', 'Bxb2', 'Kf1'],
        black: ['e5', 'exd4', 'dxc3', 'cxb2', 'Bb4+']
    },
    {
        line: 'lindehns-continuation-2-ab',
        white: ['e4', 'd4',   'c3',   'Bc4', 'Bxb2', 'Nc3'],
        black: ['e5', 'exd4', 'dxc3', 'cxb2', 'Bb4+']
    },
    {
        line: 'lindehns-continuation-2-b',
        white: ['e4', 'd4',   'c3',   'Bc4', 'Bxb2', 'Qb3'],
        black: ['e5', 'exd4', 'dxc3', 'cxb2', 'd6']
    },
    {
        line: 'lindehns-continuation-2-c',
        white: ['e4', 'd4',   'c3',   'Bc4', 'Bxb2'],
        black: ['e5', 'exd4', 'dxc3', 'cxb2', 'd5']
    }
];

export { danish_lines};