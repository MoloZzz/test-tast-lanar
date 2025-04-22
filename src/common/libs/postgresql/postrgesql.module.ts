import { DynamicModule, Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

export interface IDbOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
}

@Module({})
export class PostgresqlModule {
  static register(models: any[], dbOptions?: IDbOptions): DynamicModule {
    return {
      module: PostgresqlModule,
      imports: [
        SequelizeModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (
            configService: ConfigService,
          ): SequelizeModuleOptions => ({
            dialect: 'postgres',
            host: dbOptions?.host ?? configService.get<string>('POSTGRES_HOST'),
            port: dbOptions?.port ?? configService.get<number>('POSTGRES_PORT'),
            username:
              dbOptions?.username ?? configService.get<string>('POSTGRES_USER'),
            password:
              dbOptions?.password ?? configService.get<string>('POSTGRES_PASS'),
            database:
              dbOptions?.database ??
              configService.get<string>('POSTGRES_DB_NAME'),
            models,
            autoLoadModels: true,
            synchronize: false,
            logging:
              configService.get<string>('POSTGRES_IS_LOGGING_ENABLED') ===
              'true'
                ? console.log
                : false,
          }),
        }),
      ],
      exports: [SequelizeModule],
    };
  }
}
