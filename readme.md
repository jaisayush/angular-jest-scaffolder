# 🚀 Angular Jest Scaffolder

[![npm version](https://badge.fury.io/js/angular-jest-scaffolder.svg)](https://badge.fury.io/js/angular-jest-scaffolder)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/angular-jest-scaffolder)](https://github.com/yourusername/angular-jest-scaffolder/issues)
[![npm](https://img.shields.io/npm/dt/angular-jest-scaffolder)](https://www.npmjs.com/package/angular-jest-scaffolder)
[![GitHub license](https://img.shields.io/github/license/yourusername/angular-jest-scaffolder)](https://github.com/yourusername/angular-jest-scaffolder/blob/main/LICENSE)

**Angular Jest Scaffolder** is a command-line tool designed to simplify the setup of Angular applications with Jest as the default testing framework, eliminating the need for Jasmine and Karma. This tool creates a new Angular app using version 18 and configures it for modern testing practices.

## 📥 Installation

To install the Angular Jest Scaffolder globally, use the following command:

```bash
npm install -g angular-jest-scaffolder
```

## 📋 Requirements

- **Node.js**: Version 18 or higher.
- **Angular CLI**: Version 18 will be installed automatically if not present.

## 🚀 Usage

To create a new Angular project with Jest configured, run the command:

```bash
angular-jest-scaffolder <app-name>
```

If you don't specify an app name, it defaults to `angular-jest-starter`.

### Example Command:

```bash
angular-jest-scaffolder my-angular-app
```

### Example Output:

```bash
npx angular-jest-scaffolder
No app name provided.
Using app name: angular-jest-starter
Node.js version v20.17.0 is compatible.
Checking for Angular CLI...
Angular CLI version 18 is already installed.

Creating a new Angular app: angular-jest-starter with options:
? Which stylesheet format would you like to use? Sass (SCSS)     [ https://sass-lang.com/documentation/syntax#scss                ]
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? no
CREATE angular-jest-starter/README.md (1079 bytes)
CREATE angular-jest-starter/.editorconfig (274 bytes)
.
.
.
Successfully initialized git.
Removing Jasmine and Karma...

added 871 packages, and audited 872 packages in 2m

143 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

karma.conf.js or test.ts not found; continuing.

Installing Jest...

added 375 packages, and audited 1247 packages in 13s

155 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Updating angular.json to configure Jest...

angular.json updated to use Jest.

Creating Jest configuration files...

Jest configuration files created.

Updating TypeScript configurations...

TypeScript configurations updated for Jest.

Updating package.json with Jest test scripts...

package.json updated with Jest test scripts.

Committing Jest-related files to Git...

[main 69bf5fc] Added Jest setup
 6 files changed, 18239 insertions(+), 38 deletions(-)
 create mode 100644 jest.config.js
 create mode 100644 package-lock.json
 create mode 100644 setup-jest.ts

Jest-related files committed to Git.
Jest setup completed.
========================================================
Run `npm install` and then `ng test` to start testing with Jest.
```

## 🌟 Features

- **Quick Setup**: Easily create a new Angular application with Jest integrated.
- **Legacy Tool Removal**: Automatically removes Jasmine and Karma to promote modern testing practices.
- **Customizable Options**: Choose your preferred stylesheet format and whether to enable SSR.
- **Dependency Management**: Installs the following development dependencies:
  - `@angular/cli@18`
  - `@types/jest@29`
  - `jest@29`
  - `jest-junit@16`
  - `jest-preset-angular@14`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ayush Jaiswal**

- Email: ayush.jaiswal47.aj@gmail.com
- LinkedIn: [Ayush Jaiswal](https://www.linkedin.com/in/jaisayush/)

Thank you for using Angular Jest Scaffolder! We hope it enhances your Angular development experience.
