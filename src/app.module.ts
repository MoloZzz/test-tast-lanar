import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileModule } from './file/file.module';
import { ProfileModule } from './profile/profile.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

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
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
