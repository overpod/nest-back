import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'secret',
  jwtExpirationTime: parseInt(process.env.JWT_EXPIRATION_TIME) || 3600,
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database: process.env.DATABASE_DB || 'postgres',
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    autoLoadEntities: true,
    synchronize: true,
  } as TypeOrmModuleOptions,
});
