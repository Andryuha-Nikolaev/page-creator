const prodOrigin = [];
const devOrigin = [
  'http://localhost:3000',
  /^http:\/\/192\.168\.\d+\.\d+:3000$/,
];

export const corsOrigin =
  process.env.BUILD_PROFILE === 'production' ? prodOrigin : devOrigin;
