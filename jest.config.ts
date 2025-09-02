import { pathsToModuleNameMapper } from  "ts-jest";
const { compilerOptions } = require("./tsconfig");

export default {
    roots: ['<rootDir>/src', '<rootDir>/test'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' } ),
};
