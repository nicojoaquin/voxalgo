import { PrismaClient } from '@prisma/client';
import { base, tools, prompt, knowledgeBase } from './assistant-fields';

const prisma = new PrismaClient();

async function main() {
  const petShop = await prisma.client.upsert({
    where: { id: 'client-01' },
    update: {},
    create: {
      name: "Bob's Pet Shop and Grooming",
      email: 'bobpetshop@gmail.com',
      orgId: 'e3d34534-28c9-4a98-9677-ef2c1a03f38c',
      balance: 8.59,
      industry: 'Pet Shop',
      contactNumber: '123456789',
      masterClientId: 'client-01',
      clientsPhones: {
        create: {
          phoneId: '6468654b-2369-4f8f-8326-86b0b970a19e',
          phoneNumber: 'sip:sipvoxalgo@sip.vapi.ai',
          provider: 'sip',
          assistants: {
            create: {
              direction: 'Inbound',
              version: '0.1',
              base,
              tools,
              prompt,
              knowledgeBase
            }
          }
        }
      }
    }
  });
  console.log({ petShop });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
