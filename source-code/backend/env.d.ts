declare namespace NodeJS {
  interface ProcessEnv {
    BUILD_PROFILE: 'local' | 'development' | 'production';
    PORT: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
  }
}
