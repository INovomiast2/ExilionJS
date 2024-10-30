#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import gradient from 'gradient-string';

const exilonArt = `
███████╗██╗  ██╗██╗██╗      ██████╗ ███╗   ██╗     ██╗███████╗
██╔════╝╚██╗██╔╝██║██║     ██╔═══██╗████╗  ██║     ██║██╔════╝
█████╗   ╚███╔╝ ██║██║     ██║   ██║██╔██╗ ██║     ██║███████╗
██╔══╝   ██╔██╗ ██║██║     ██║   ██║██║╚██╗██║██   ██║╚════██║
███████╗██╔╝ ██╗██║███████╗╚██████╔╝██║ ╚████║╚█████╔╝███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚════╝ ╚══════╝
`;

interface ProjectOptions {
  projectName: string;
  template: 'basic' | 'fullstack' | 'api';
  typescript: boolean;
  features: string[];
}

async function main() {
  console.log(gradient.pastel.multiline(exilonArt));
  console.log(chalk.blue('\n🚀 Welcome to ExilonJS - The Modern Web Framework\n'));

  const options = await promptUser();
  if (!options) process.exit(1);

  const projectPath = path.join(process.cwd(), options.projectName);
  const spinner = ora('Creating your ExilonJS project...').start();

  try {
    await createProject(projectPath, options);
    spinner.succeed(chalk.green('Project created successfully!'));
    displayNextSteps(options.projectName);
  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(error);
    process.exit(1);
  }
}

async function promptUser(): Promise<ProjectOptions | null> {
  try {
    const response = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'What is your project named?',
        initial: 'my-exilon-app',
        validate: name => {
          if (!/^[a-z0-9-]+$/.test(name)) {
            return 'Project name may only include lowercase letters, numbers, and dashes';
          }
          return true;
        }
      },
      {
        type: 'select',
        name: 'template',
        message: 'Choose a template:',
        choices: [
          { title: '⚡ Basic (React + TypeScript)', value: 'basic', description: 'Simple starter with essential features' },
          { title: '🚀 Full Stack (React + API)', value: 'fullstack', description: 'Complete setup with API routes' },
          { title: '🔧 API Only', value: 'api', description: 'Backend focused setup' }
        ],
        initial: 0
      },
      {
        type: 'multiselect',
        name: 'features',
        message: 'Select additional features:',
        choices: [
          { title: 'Tailwind CSS', value: 'tailwind', selected: true },
          { title: 'ESLint + Prettier', value: 'lint', selected: true },
          { title: 'Testing Setup', value: 'testing' },
          { title: 'Docker Setup', value: 'docker' },
          { title: 'GitHub Actions', value: 'github-actions' }
        ]
      }
    ]);

    if (!response.projectName) return null;
    return {
      ...response,
      typescript: true // TypeScript is now default
    };
  } catch (error) {
    return null;
  }
}

async function createProject(projectPath: string, options: ProjectOptions) {
  // Create project directory
  await fs.ensureDir(projectPath);

  // Copy template files
  const templatePath = path.join(__dirname, `../templates/${options.template}`);
  await fs.copy(templatePath, projectPath);

  // Create package.json
  const packageJson = generatePackageJson(options);
  await fs.writeJSON(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });

  // Create tsconfig.json if using TypeScript
  if (options.typescript) {
    const tsConfig = generateTsConfig();
    await fs.writeJSON(path.join(projectPath, 'tsconfig.json'), tsConfig, { spaces: 2 });
  }

  // Initialize git repository
  try {
    execSync('git init', { cwd: projectPath });
    await fs.writeFile(path.join(projectPath, '.gitignore'), generateGitignore());
  } catch (error) {
    console.warn(chalk.yellow('Failed to initialize git repository'));
  }

  // Install dependencies
  const spinner = ora('Installing dependencies...').start();
  try {
    execSync('npm install', { cwd: projectPath, stdio: 'ignore' });
    spinner.succeed('Dependencies installed successfully');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    throw error;
  }
}

function generatePackageJson(options: ProjectOptions) {
  return {
    name: options.projectName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'exilon dev',
      build: 'exilon build',
      start: 'exilon start',
      lint: options.features.includes('lint') ? 'eslint . --fix' : undefined,
      test: options.features.includes('testing') ? 'jest' : undefined
    },
    dependencies: {
      exilon: 'latest',
      react: '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      ...generateDevDependencies(options)
    }
  };
}

function generateDevDependencies(options: ProjectOptions) {
  const deps: Record<string, string> = {
    '@types/react': '^18.2.0',
    '@types/react-dom': '^18.2.0',
    '@types/node': '^18.0.0',
    typescript: '^5.0.0'
  };

  if (options.features.includes('tailwind')) {
    deps['tailwindcss'] = '^3.0.0';
    deps['postcss'] = '^8.0.0';
    deps['autoprefixer'] = '^10.0.0';
  }

  if (options.features.includes('lint')) {
    deps['eslint'] = '^8.0.0';
    deps['prettier'] = '^3.0.0';
    deps['eslint-config-exilon'] = 'latest';
  }

  if (options.features.includes('testing')) {
    deps['jest'] = '^29.0.0';
    deps['@testing-library/react'] = '^14.0.0';
    deps['@testing-library/jest-dom'] = '^6.0.0';
  }

  return deps;
}

function generateTsConfig() {
  return {
    compilerOptions: {
      target: "es5",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "node",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [
        {
          name: "next"
        }
      ],
      paths: {
        "@/*": ["./src/*"]
      }
    },
    include: ["src"],
    exclude: ["node_modules"]
  };
}

function generateGitignore() {
  return `
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist
/.exilon

# misc
.DS_Store
*.pem
.env*
!.env.example

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# typescript
*.tsbuildinfo
`;
}

function displayNextSteps(projectName: string) {
  console.log('\n' + chalk.blue('Next steps:'));
  console.log(`  cd ${projectName}`);
  console.log('  npm run dev\n');

  console.log(chalk.blue('Documentation:'), chalk.cyan('https://exilonjs.dev/docs'));
  console.log(chalk.blue('GitHub:'), chalk.cyan('https://github.com/exilonjs/exilon'));
  console.log(chalk.blue('Discord:'), chalk.cyan('https://discord.gg/exilonjs\n'));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}); 