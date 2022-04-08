import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { Newsletter } from './entities/newsletter.entity';

@Module({
  imports: [SequelizeModule.forFeature([Newsletter])],
  controllers: [NewsletterController],
  providers: [NewsletterService],
})
export class NewsletterModule {}
