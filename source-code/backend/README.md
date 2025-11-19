# Backend

## 🚀 Tech Stack

- **Framework**: NestJS 11
- **Database**: PostgreSQL with Prisma ORM
- **Admin Panel**: AdminJS
- **Authentication**: JWT + Passport
- **Password Hashing**: Argon2
- **Package Manager**: npm
- **Linting**: ESLint + Prettier
- **Testing**: Jest
- **Documentation**: Swagger

## 📋 Prerequisites

- We recommend using **[proto](https://moonrepo.dev/proto)** for managing Node.js and pnpm versions to ensure consistent development environment across the team.
- If the project contains a .env.example file, make a copy and rename it to .env

## 📥 Installation

```bash
# Install dependencies
npm install

# Generate Prisma client and initialize database
npx prisma generate
npx prisma db push
```

## 🛠️ Available Scripts

```bash
# Build for production (includes Prisma generation and DB push)
npm run build

# Build without Prisma operations
npm run build:noprisma

# Start development server with hot reload
npm run start:dev

# Start production server
npm run start:prod

# Start in debug mode
npm run start:debug

# Run linting and auto-fix issues
npm run lint

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e

# Format code with Prettier
npm run format
```

## Description

Admin Panel: /admin
Api Docs: /api/docs /api/docs-yaml /api/docs-json
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
