import { Database, Resource, getModelByName } from '@adminjs/prisma';
import AdminJS, { ResourceWithOptions } from 'adminjs';
import { PrismaService } from 'src/prisma.service';
import { dark } from '@adminjs/themes';

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
              resource: {
                model: getModelByName('User') as unknown,
                client: prisma,
              },
              options: {
                properties: {
                  password: { type: 'password', isVisible: { edit: false } },
                  email: {
                    props: {
                      type: 'email',
                    },
                  },
                },
                actions: {
                  new: {
                    isAccessible: false,
                  },
                },
              },
            },
          ] as Array<ResourceWithOptions>,
          defaultTheme: dark.id,
          availableThemes: [dark],
        },
      };
    },
  }),
);
