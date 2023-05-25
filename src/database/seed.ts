import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.tweet.upsert({
    where: { id: 1 },
    update: {},
    create: {
      text: 'teste',
      id: 1,
      userId: 1,
    },
  });
  console.log({ alice });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
