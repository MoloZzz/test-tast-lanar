import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileModule } from './file/file.module';
import { ProfileModule } from './profile/profile.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { PostgresqlModule } from './libs/postgresql/postrgesql.module';
import { models } from './common/sequelize/models/models';
import { CommentModule } from './comment/comment.module';
import { ImageModule } from './image/image.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
    imports: [
        FileModule,
        ProfileModule,
        PortfolioModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env`],
            validationSchema: Joi.object({
                API_DOCS_ENABLED: Joi.string().optional(),
                PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_DB_NAME: Joi.string().required(),
                POSTGRES_IS_LOGGING_ENABLED: Joi.string().required(),
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.string().required(),
                POSTGRES_PASS: Joi.string().required(),
            }),
        }),
        AuthModule,
        PostgresqlModule.register(models),
        CommentModule,
        ImageModule,
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '..', 'static'),
            serveRoot: '/static',
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
