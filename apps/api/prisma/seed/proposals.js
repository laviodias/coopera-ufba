/* import { PrismaClient } from '@prisma/client';

export async function SeedProposals(prisma: PrismaClient) {
  const proposals = [
    {
      userId: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
      url: '',
      message: 'Mensagem de teste!',
    },
    {
      id: '9e1f3d8-6ff2-4187-8e99-55de3fb97042',
      userId: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
      url: '',
      message: 'Mensagem de teste nvidia!',
    },
  ];

  try {
    for (const proposal of proposals) {
      await prisma.proposal.create({
        data: proposal,
      });
    }

    console.log('Tabela de Notificação preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Notificação.');
    console.log(error.message);
  }
}
 */