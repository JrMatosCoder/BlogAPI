import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rule } from './entities/rule.entity';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';

@Module({
  imports: [SequelizeModule.forFeature([Rule])],
  controllers: [RulesController],
  providers: [RulesService],
})
export class RulesModule {}
