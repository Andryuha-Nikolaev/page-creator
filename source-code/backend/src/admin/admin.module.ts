import { PrismaService } from 'src/prisma.service';
import { authenticate } from './decorators/auth.decorator';

export default import('@adminjs/nestjs').then(({ AdminModule }) =>
  import('@adminjs/prisma').then(({ Database, Resource, getModelByName }) =>
    import('adminjs').then((AdminJS) =>
      import('@adminjs/themes').then(({ dark }) => {
        AdminJS.default.registerAdapter({ Database, Resource });

        const prisma = new PrismaService();

        return AdminModule.createAdminAsync({
          useFactory: () => ({
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
                      password: {
                        type: 'password',
                        isVisible: { edit: false },
                      },
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
              ],
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
          }),
        });
      }),
    ),
  ),
);
