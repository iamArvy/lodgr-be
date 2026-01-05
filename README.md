[![CI](https://github.com/iamArvy/nestjs-starter-template/actions/workflows/ci.yml/badge.svg)](https://github.com/iamArvy/nestjs-starter-template/actions/workflows/ci.yml)
[![Docker Image](https://img.shields.io/docker/pulls/arvytechs/nest-starter-template?logo=docker)](https://hub.docker.com/r/arvytechs/nest-starter-template)

# Nest Starter Template

Opinionated starter template for building APIs with NestJS, TypeScript, pnpm, and TypeORM.

This repository includes common building blocks useful for production services:

- Structured logging (winston)
- API response interceptor and DTO helpers
- Centralized config using `@nestjs/config`
- Example `User` module with controller, service, repository, DTOs, and tests
- GitHub Actions CI workflow (`.github/workflows/ci.yml`)
- Dockerfile and CD workflow to publish images to GHCR (`.github/workflows/docker-deploy.yml`)

---

## Quickstart

Prerequisites:

- Node.js 18+ or 20+
- pnpm

Install dependencies:

```bash
pnpm install
```

Run in development:

```bash
pnpm run start:dev
```

Build for production:

```bash
pnpm run build
pnpm run start:prod
```

Run tests:

```bash
pnpm run test        # unit tests
pnpm run test:e2e    # e2e tests (if configured)
pnpm run test:cov    # coverage
```

Lint and format:

```bash
pnpm run lint
pnpm run format
```

---

## Environment

Create a copy of `.env.example` named `.env` and update values for your environment.

Example:

```bash
cp .env.example .env
# edit .env and fill secrets
```

The project reads configuration via `@nestjs/config` and expects typical vars such as `DATABASE_URL`, `PORT`, and `JWT_SECRET` (see `.env.example`).

---

## Docker

Build locally:

```bash
docker build -t nest-starter-template:local .
```

Run container:

```bash
docker run --rm -p 3000:3000 --env-file .env nest-starter-template:local
```

Notes:

- The repository includes a multi-stage `Dockerfile` and a `.dockerignore` to keep the image small.
- The GitHub Actions workflow at `.github/workflows/docker-deploy.yml` builds and pushes images to GitHub Container Registry (GHCR) on pushes to `main`/`master`.

If you want Docker Hub instead, replace the registry/login steps in the workflow with Docker Hub credentials stored as repository secrets.

---

## Continuous Integration

- A CI workflow is provided at `.github/workflows/ci.yml`.
- It runs on Node 18 and 20, installs via pnpm, lints, builds, and runs tests.
- You can extend the workflow to run coverage reports, security scans (e.g., Snyk), or publish artifacts.

---

## Project layout

Typical structure:

```
src/
  app.module.ts
  main.ts
  common/          # interceptors, decorators, DTO helpers
  config/          # configuration and environment handling
  database/        # TypeORM entities & module
  modules/
    user/          # example feature module
test/              # e2e test configuration
Dockerfile
.github/workflows/
```

---

## Testing notes

- Unit tests use Jest and `@nestjs/testing`.
- The project uses `ts-jest` and the Jest config lives in `package.json` (root) and sets `rootDir` to `src` so tests import using relative paths or the `src/` alias.
- In CI, ensure environment variables required by tests (DB connection strings, etc.) are provided via secrets or mocked providers.

---

## Conventions and recommendations

- Keep controllers thin; business logic belongs in services.
- Use DTOs + `class-transformer` for response shaping and validation.
- Centralize environment config in `src/config` and validate using Joi schemas.
- Use interceptors for consistent response envelopes and error formatting.
- Add a `PaginatedDto<T>` and consistent pagination approach for list endpoints.

---

## Next improvements (suggested)

- Add migration tooling and seed scripts for the DB
- Add OpenTelemetry tracing and correlation IDs
- Caching: Redis cache wrappers/decorators with examples and cache invalidation notes.
- Developer DX: Prettier/ESLint, Husky pre-commit hooks, expanded README with quickstart.
---

## Contributing

Contributions welcome. Open an issue or PR with your proposed change.