module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest-setup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  }
}
