export async function SeedProjects(prisma) {
  const projects = [
    {
      name: 'Fog of Things: devices and gateways',
      researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
      description:
        'A fog computing architecture for the Internet of Things (IoT) that enables devices and gateways to work together to provide a more efficient and effective IoT experience.',
    },
    {
      name: 'SOFT-IoT: Self-Organizing FOG of Things',
      researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
      description:
        'A self-organizing fog computing architecture for the Internet of Things (IoT) that enables devices and gateways to work together to provide a more efficient and effective IoT experience.',
    },
    {
      name: 'Energy-IoT',
      researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
      demandId: '7405974c-6ef1-4d0c-9be0-962b7d97c8d9',
      description:
        'An energy management system for the Internet of Things (IoT) that enables devices and gateways to work together to provide a more efficient and effective IoT experience.',
    },
  ];
  const project1 = {
    name: 'Recommend System of model LLM for Software Engineering',
    researchGroupId: '5df58413-dadb-446b-91d7-e82ffce3e24a',
    description:
      'A recommendation system for software engineering that uses a large language model (LLM) to provide personalized recommendations for software development tasks.',
    keywords: {
      connect: [{ id: '34341378-0816-4fd1-8044-53d7f1a875b9' }],
    },
  };

  try {
    await prisma.project.createMany({
      data: projects,
    });
    await prisma.project.create({
      data: project1,
    });
    console.log('Tabela de Projeto preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Projeto.');
    console.log(error.message);
  }
}
