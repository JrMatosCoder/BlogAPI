import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rule } from './entities/rule.entity';
import { UpdateRuleDto } from './dto/update-rule.dto';

@Injectable()
export class RulesService {
  constructor(
    @InjectModel(Rule)
    private rulesModel: typeof Rule,
  ) {}

  async create(createRuleDto: any) {
    const rule = await this.rulesModel.create(createRuleDto);
    if (!rule) {
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException('rule created successfully', HttpStatus.OK);
  }

  async findAll() {
    const rules = await this.rulesModel.findAll();
    if (rules.length < 1) {
      throw new HttpException('rule not found', HttpStatus.NOT_FOUND);
    }
    return rules;
  }

  async findOne(id: number) {
    const rule = await this.rulesModel.findOne({ where: { id: id } });
    if (!rule) {
      throw new HttpException('rule not found', HttpStatus.NOT_FOUND);
    }
    return rule;
  }

  async update(id: string, updateRuleDto: UpdateRuleDto) {
    const rule: any = await this.rulesModel.update(updateRuleDto, {
      where: {
        id: id,
      },
    });
    if (rule == 0) {
      throw new HttpException('rule not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('rule updated successfully', HttpStatus.OK);
  }

  async remove(id: number) {
    const rule = await this.rulesModel.destroy({
      where: {
        id: id,
      },
    });
    if (rule == 0) {
      throw new HttpException('rule not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('rule successfully deleted', HttpStatus.OK);
  }
}
