import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.contact.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: number, dto: CreateContactDto) {
    return this.prisma.contact.create({
      data: { ...dto, userId },
    });
  }

  async update(userId: number, contactId: number, dto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    if (contact.userId !== userId) {
      throw new ForbiddenException('You do not have access to this contact');
    }

    return this.prisma.contact.update({
      where: { id: contactId },
      data: dto,
    });
  }

  async remove(userId: number, contactId: number) {
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    if (contact.userId !== userId) {
      throw new ForbiddenException('You do not have access to this contact');
    }

    return this.prisma.contact.delete({ where: { id: contactId } });
  }
  
  async findOne(userId: number, contactId: number) {
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) throw new NotFoundException('Contact not found');
    if (contact.userId !== userId) throw new ForbiddenException('You do not have access to this contact');
    return contact;
  }
}