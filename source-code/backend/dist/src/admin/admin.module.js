"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_service_1 = require("../prisma.service");
const auth_decorator_1 = require("./decorators/auth.decorator");
exports.default = import('@adminjs/nestjs').then(({ AdminModule }) => import('@adminjs/prisma').then(({ Database, Resource, getModelByName }) => import('adminjs').then((AdminJS) => import('@adminjs/themes').then(({ dark }) => {
    AdminJS.default.registerAdapter({ Database, Resource });
    const prisma = new prisma_service_1.PrismaService();
    return AdminModule.createAdminAsync({
        useFactory: () => ({
            adminJsOptions: {
                rootPath: '/admin',
                resources: [
                    {
                        resource: {
                            model: getModelByName('User'),
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
                authenticate: auth_decorator_1.authenticate,
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
}))));
//# sourceMappingURL=admin.module.js.map