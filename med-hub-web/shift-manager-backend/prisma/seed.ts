import prisma from '../src/prismaClient';
import bcrypt from 'bcrypt';

async function main() {
  const email = 'adm-vitor@capybaraworld.com';
  const password = '631330';
  const password_hash = await bcrypt.hash(password, 12);

  // Upsert do usuário de teste (admin absoluto)
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name: 'Vitor (admin-teste)',
      password_hash,
      role: 'admin'
    },
    create: {
      email,
      name: 'Vitor (admin-teste)',
      password_hash,
      role: 'admin'
    }
  });

  console.log('Usuário seed criado/atualizado:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
