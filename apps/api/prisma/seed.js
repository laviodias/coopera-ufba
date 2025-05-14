// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { PrismaClient } from '@prisma/client';
import { SeedKnowledgeAreas } from './seed/knowledgeareas.js';
import { SeedKeywords } from './seed/keywords.js';
import { SeedUsers } from './seed/users.js';
import { SeedResearchers } from './seed/researchers.js';
import { SeedResearchGroups } from './seed/researchgroups.js';
import { SeedProjects } from './seed/projects.js';
import { SeedCompanies } from './seed/companies.js';
import { SeedDemands } from './seed/demands.js';
import { SeedNotifications } from './seed/notifications.js';

const prisma = new PrismaClient();

async function main() {
  await SeedKnowledgeAreas(prisma);
  await SeedKeywords(prisma);
  await SeedUsers(prisma);
  await SeedResearchers(prisma);
  await SeedResearchGroups(prisma);
  await SeedCompanies(prisma);
  await SeedProjects(prisma);
  await SeedDemands(prisma);
  await SeedNotifications(prisma);

  console.log('Banco de dados preenchido com dados padrão.');
}

main()
  .catch((e) => {
    console.log('Falha ao preencher Banco de dados.');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
