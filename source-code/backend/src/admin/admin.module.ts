import { Database, Resource, getModelByName } from '@adminjs/prisma';
import AdminJS from 'adminjs';
import { PrismaService } from 'src/prisma.service';

AdminJS.registerAdapter({ Database, Resource });

export default import('@adminjs/nestjs').then(({ AdminModule }) =>
  AdminModule.createAdminAsync({
    useFactory: () => {
      const prisma = new PrismaService();

      return {
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              resource: { model: getModelByName('User'), client: prisma },
              options: {},
            },
          ],
        },
      };
    },
  }),
);
