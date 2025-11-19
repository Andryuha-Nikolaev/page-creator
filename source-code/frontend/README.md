# Frontend

## 🚀 Tech Stack

- **Framework**: Next.js 16 (with Turbopack enabled by default)
- **Package Manager**: pnpm
- **Linting**: ESLint + Feature-Sliced Design architecture validation
- **Formatting**: Prettier

## 📋 Prerequisites

- We recommend using **[proto](https://moonrepo.dev/proto)** for managing Node.js and pnpm versions to ensure consistent development environment across the team.
- If the project contains a .env.example file, make a copy and rename it to .env

## 📥 Installation

```bash
# Install dependencies
pnpm install
```

## 🛠️ Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run type checking
pnpm lint:types

# Run ESLint on src and app directories
pnpm lint:code

# Run architecture validation with Steiger
pnpm lint:arch

# Run all linting tasks
pnpm lint

# Install git hooks (automatically runs on pnpm install)
pnpm prepare
```
