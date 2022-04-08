import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { JwtAdminAuthGuard } from 'src/Auth/strategies/admin-auth.guard';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post()
  create(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newsletterService.create(createNewsletterDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get()
  findAll() {
    return this.newsletterService.findAll();
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsletterService.findOne(+id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsletterDto: UpdateNewsletterDto,
  ) {
    return this.newsletterService.update(+id, updateNewsletterDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsletterService.remove(+id);
  }
}
