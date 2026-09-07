import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@twcinnovations.com' },
    update: {},
    create: {
      email: 'admin@twcinnovations.com',
      password: hashedPassword,
    },
  });

  const existingContacts = await prisma.contact.findMany({
    where: { userId: user.id },
  });

  if (existingContacts.length === 0) {
    await prisma.contact.createMany({
      data: [
        { name: 'Alice Johnson', email: 'alice@twcinnovations.com', phone: '0771234567', userId: user.id },
        { name: 'Bob Smith', email: 'bob@twcinnovations.com', phone: '0772345678', userId: user.id },
        { name: 'Carol White', email: 'carol@twcinnovations.com', phone: '0773456789', userId: user.id },
      ],
    });
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());