# 1. Getting started

This guide will help you to set up the project in a production environment. This guide assumes that you have already installed [conda](https://docs.conda.io/en/latest/), [Java 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) and [Bun](https://bun.sh/) (or another runtime environments) in your system.

## 1.1. Create project Python environment

```bash
conda env create -f environment.yml
```

## 1.2. Activate environment

```bash
conda activate beer-search-engine
```

## 1.3. Install frontend dependencies

> The project has been developed using [Bun](https://bun.sh/) as a package manager and runtime environment. If you don't have it installed, please follow the [installation guide](https://bun.sh/#/installation). Otherwise, if you prefer to use another package manager, you can use [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.js.org/).

```bash
cd frontend && bun install
```

or

```bash
cd frontend && npm install
```

or

```bash
cd frontend && yarn install
```

or 
  
```bash
cd frontend && pnpm install
```

## 1.4. Start backend

```bash
cd backend && make start
```

## 1.5. Start frontend

```bash
cd frontend && make start
```

## 1.6. Open browser

The application will be available at [http://localhost:3000](http://localhost:3000).