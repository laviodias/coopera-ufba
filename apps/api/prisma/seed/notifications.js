export async function SeedNotifications(prisma) {
  const notifications = [
    {
      id: '9e1f3d8-6ff2-4187-8e99-55de3fb97041',
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
    for (const notification of notifications) {
      await prisma.notification.create({
        data: notification,
      });
    }

    console.log('Tabela de Notificação preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Notificação.');
    console.log(error.message);
  }
}
