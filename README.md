# Budget Plan

Application which will help You plan your budget.

## Used technologies 🛠️:

1. React.js
2. Next.js (v13 with appDir)
3. Typescript
4. Tailwind CSS
5. Prisma
6. Postgresql (Supabase)
7. next-auth
8. TanStack Query
9. mailjet as a SMTP provider
10. react-hook-form for handling forms
11. zod for data validation

## Installation 👷

Required: node.js v18 and docker with `docker compose` command.

1. Clone this repository:

```
git clone https://github.com/grzegorzpokorski/budget-plan.git
```

2. Install dependencies:

```
pnpm install
```

3. Setup environment variables:

To run it in local environment firstly you should prepare `.env` file with required enviroment variables - example file is in the project (`.env-example`).

4. Run project:

```
docker compose up
npx prisma migrate dev
npx prisma generate
pnpm dev
```

## Live 🌐

[https://budget-plan-ashy.vercel.app/](https://budget-plan-ashy.vercel.app/)

## Some screenshots:

![](/screenshots/login.png?raw=true)

![](/screenshots/home.png?raw=true)

![](/screenshots/loading.png?raw=true)

![](/screenshots/add-budget.png?raw=true)

![](/screenshots/add-expense.png?raw=true)

## Contributing

If you find any bug, have suggestion how to improve this project feel free to tell about it in [issues](https://github.com/grzegorzpokorski/budget-plan/issues) tab. Pull requests also are welcoming.
