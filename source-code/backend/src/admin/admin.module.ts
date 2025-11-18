import { Database, Resource, getModelByName } from '@adminjs/prisma';
import AdminJS, { ResourceWithOptions } from 'adminjs';
import { PrismaService } from 'src/prisma.service';
import { dark } from '@adminjs/themes';

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

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
                navigation: {
                  icon: 'User',
                },
              },
            },
          ] as Array<ResourceWithOptions>,
          defaultTheme: dark.id,
          availableThemes: [dark],
          branding: {
            companyName: 'PageCreator Admin',
          },
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      };
    },
  }),
);
