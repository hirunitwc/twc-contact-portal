import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  findAll(@CurrentUser() user: { userId: number }) {
    return this.contactsService.findAll(user.userId);
  }

  @Post()
  create(@CurrentUser() user: { userId: number }, @Body() dto: CreateContactDto) {
    return this.contactsService.create(user.userId, dto);
  }

  @Put(':id')
  update(
    @CurrentUser() user: { userId: number },
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactsService.update(user.userId, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: { userId: number }, @Param('id', ParseIntPipe) id: number) {
    return this.contactsService.remove(user.userId, id);
  }

  @Get(':id')
  findOne(@CurrentUser() user: { userId: number }, @Param('id', ParseIntPipe) id: number) {
    return this.contactsService.findOne(user.userId, id);
  }
}