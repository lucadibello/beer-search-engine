### 1.1. Create project Python environment

```bash
conda env create -f environment.yml
```

### 1.2. Activate environment

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