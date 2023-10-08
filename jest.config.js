module.exports = {
    clearMocks: true,
    moduleFileExtensions: ['js', 'json', 'jsx'],
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
