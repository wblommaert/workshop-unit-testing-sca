# Unit Testing, Static Code Analysis, and CI/CD Workshop

This repository contains examples and exercises for the workshop on unit testing, static code analysis, and CI/CD integration.

## Prerequisites

- [Node.js](https://nodejs.org/) (v22 or newer)
- [Git](https://git-scm.com/)
- A code editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/workshop-unit-testing-sca.git
cd workshop-unit-testing-sca
```

### Install Dependencies

```bash
pnpm install
```

## Running the Example Application

To start the application in development mode:

```bash
pnpm start
```

The application should be available at [http://localhost:3000](http://localhost:3000) by default.

## Running Tests

### Unit Tests

Run all unit tests:

```bash
pnpm test
```

Run tests in watch mode (useful during development):

```bash
pnpm run test:watch
```

Run tests with coverage report:

```bash
pnpm run test:coverage
```

## Static Code Analysis

### Linting

Check for code style issues:

```bash
pnpm run lint
```

Fix automatically fixable issues:

```bash
pnpm run lint:fix
```

### Type Checking

Run TypeScript type checking:

```bash
pnpm run typecheck
```

## CI/CD Workflow

This repository includes CI/CD configurations that demonstrate:

- Automated testing on pull requests
- Code quality checks
- Build verification
- Deployment pipelines

You can find the CI/CD configuration files in the `.github/workflows` directory.

## Workshop Exercises

The exercises are organized in different branches:

- `main`: Starting point with the complete application
- `exercise/1-basic-tests`: First exercise for writing basic unit tests
- `exercise/2-mocking`: Exercise focusing on mocking dependencies
- `exercise/3-integration-tests`: Exercise on integration tests
- `exercise/4-static-analysis`: Implementing static code analysis
- `exercise/5-ci-cd`: Setting up CI/CD pipelines

To switch to a specific exercise:

```bash
git checkout exercise/1-basic-tests
```

Each exercise branch includes specific instructions in its README.

## Best Practices

Throughout this workshop, we'll cover best practices for:

- Writing testable code
- Test organization and structure
- Mocking strategies
- Code coverage analysis
- Static analysis configuration
- CI/CD pipeline design

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## License

[MIT](LICENSE)
```

Happy testing!
