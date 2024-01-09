module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    // Transformar arquivos `.ts` ou `.tsx` usando `babel-jest`
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    // Mapear importações de arquivos estáticos e CSS Modules
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',  // Mapeia '@' para a pasta 'src'
  },
};
