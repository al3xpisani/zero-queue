module.exports = {
    clearMocks: true,
    transform: {
        '\\.[jt]sx?$': 'babel-jest'
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts'],
    coveragePathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
        '<rootDir>/docs/',
        '<rootDir>/build/'
    ],
    testPathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
        '<rootDir>/docs/',
        '<rootDir>/build/'
    ],
    collectCoverageFrom: ['src/**']
}
