import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileModule } from './file/file.module';
import { ProfileModule } from './profile/profile.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [FileModule, ProfileModule, PortfolioModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
