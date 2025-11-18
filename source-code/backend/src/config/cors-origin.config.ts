const prodOrigin = [];
const devOrigin = [
  'http://localhost:3000',
  'http://192.168.1.5:3000',
  'http://192.168.1.6:3000',
  'http://192.168.1.7:3000',
  'http://192.168.1.8:3000',
];

export const corsOrigin =
  process.env.BUILD_PROFILE === 'production' ? prodOrigin : devOrigin;
