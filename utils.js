const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const semver = require("semver");
const json5 = require("json5");

// Custom Error Class for better error handling
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Function to run shell commands and handle errors
function runCommand(command, errorMessage) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    throw new AppError(
      errorMessage || `Error executing command: ${command}. ${error.message}`,
      1
    );
  }
}

// Function to check Node.js version compatibility
function checkNodeVersion(requiredVersion) {
  const nodeVersion = process.version;
  if (!semver.satisfies(nodeVersion, requiredVersion)) {
    throw new AppError(
      `Node.js version ${nodeVersion} is not compatible. Please use Node.js ${requiredVersion} or higher.`,
      1
    );
  }
  console.log(`Node.js version ${nodeVersion} is compatible.`);
}

// Function to install Angular CLI if not already installed
function ensureAngularCLIInstalled() {
  console.log("Checking for Angular CLI...");
  try {
    const angularVersion = execSync("ng version", { encoding: "utf-8" });

    // Check for version in the output
    const versionMatch = angularVersion.match(/Angular CLI: (\d+\.\d+\.\d+)/);

    if (versionMatch && versionMatch[1].startsWith("18")) {
      console.log("Angular CLI version 18 is already installed.");
    } else {
      console.log("Angular CLI version 18 not found. Installing...");
      runCommand(
        "npm install -g @angular/cli@18",
        "Failed to install Angular CLI version 18."
      );
    }
  } catch (e) {
    console.log("Angular CLI not found. Installing version 18...");
    runCommand(
      "npm install -g @angular/cli@18",
      "Failed to install Angular CLI version 18."
    );
  }
  console.log();
}

// Function to create a new Angular app
function createAngularApp(appName, args) {
  const ngNewCommand = `ng new ${appName} ${args.join(" ")} --skip-install`;
  console.log(
    `Creating a new Angular app: ${appName} with options: ${args.join(" ")}`
  );
  runCommand(ngNewCommand, "Failed to create Angular app.");
  process.chdir(appName);
}

// Function to remove Jasmine and Karma dependencies
function removeJasmineAndKarma() {
  console.log("Removing Jasmine and Karma...");
  runCommand(
    "npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core jasmine-spec-reporter @types/jasmine @types/jasminewd2",
    "Failed to remove Jasmine and Karma."
  );
  try {
    fs.unlinkSync("karma.conf.js");
    fs.unlinkSync(path.join("src", "test.ts"));
    console.log("Removed karma.conf.js and src/test.ts");
  } catch (error) {
    console.warn("karma.conf.js or test.ts not found; continuing.");
  }
}

// Function to install Jest and its required dependencies
function installJest() {
  console.log("Installing Jest...");
  runCommand(
    "npm install --save-dev @types/jest@29 jest@29 jest-junit@16 jest-preset-angular@14",
    "Failed to install Jest."
  );
}

// Function to update angular.json with Jest configuration
function updateAngularJson() {
  console.log("Updating angular.json to configure Jest...");
  const angularJsonPath = "angular.json";
  const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, "utf-8"));
  const projectKey = Object.keys(angularJson.projects)[0];

  // Set Jest as the test builder
  delete angularJson.projects[projectKey].architect.test;
  fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
  console.log("angular.json updated to use Jest.");
}

// Function to create Jest configuration files
function createJestConfig() {
  console.log("Creating Jest configuration files...");
  fs.writeFileSync(
    "jest.config.js",
    `module.exports = {
          preset: 'jest-preset-angular',
          setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
          reporters: ["default", "jest-junit"],
        };`
  );

  fs.writeFileSync(
    "setup-jest.ts",
    `
      import 'jest-preset-angular/setup-jest';
    `
  );
  console.log("Jest configuration files created.");
}

// Function to update TypeScript configurations for Jest
function updateTsConfig() {
  console.log("Updating TypeScript configurations...");
  const rootDir = process.cwd();
  const tsConfigSpecPath = path.join(rootDir, "tsconfig.spec.json");
  // Update tsconfig.spec.json
  const tsConfigSpecContent = fs.readFileSync(tsConfigSpecPath, "utf8");
  const tsConfigSpec = json5.parse(tsConfigSpecContent);
  tsConfigSpec.compilerOptions.types = ["jest", "node"];
  tsConfigSpec.compilerOptions.module = "CommonJs";
  fs.writeFileSync(tsConfigSpecPath, JSON.stringify(tsConfigSpec, null, 2));
  console.log("TypeScript configurations updated for Jest.");
}

// Function to update package.json with Jest configuration
function updatePackageJson() {
  console.log("Updating package.json with Jest test scripts...");
  const rootDir = process.cwd();
  const packageJsonPath = path.join(rootDir, "package.json");

  // Read the package.json file
  const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonContent);
  packageJson.version = "0.0.1";
  packageJson.description = "The Angular starter kit with jest";
  packageJson.author = "Ayush Jaiswal <ayush.jaiswal47.aj@gmail.com>";
  packageJson.homepage = "https://github.com/jaisayush/angular-jest-scaffolder";
  packageJson.license = "MIT";
  packageJson.contributors = ["Ayush Jaiswal <ayush.jaiswal47.aj@gmail.com>"];
  packageJson.keywords = [
    "angular",
    "angular-boilerplate",
    "angular-template",
    "jest",
  ];
  packageJson.repository = {
    type: "git",
    url: "https://github.com/jaisayush/angular-jest-scaffolder.git",
  };
  packageJson.bugs = {
    url: "https://github.com/jaisayush/angular-jest-scaffolder/issues",
  };
  packageJson.readme =
    "https://github.com/jaisayush/angular-jest-scaffolder/blob/master/README.md";
  // Update the "scripts" section with Jest-related test scripts
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.test = "jest";
  packageJson.scripts["test:watch"] = "jest --watch";
  packageJson.scripts["test:ci"] = "jest --runInBand";
  packageJson.scripts["test:coverage"] = "jest --coverage";

  // Write the updated package.json file
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("package.json updated with Jest test scripts.");
}

// Function to commit Jest-related files to Git
function commitJestFiles() {
  console.log("Committing Jest-related files to Git...");

  try {
    runCommand("git add .", {
      stdio: "inherit",
    });
    runCommand('git commit -m "Added Jest setup"', { stdio: "inherit" });
    console.log("Jest-related files committed to Git.");
  } catch (error) {
    console.error("Failed to commit Jest-related files:", error.message);
  }
}
module.exports = {
  AppError,
  runCommand,
  checkNodeVersion,
  ensureAngularCLIInstalled,
  createAngularApp,
  removeJasmineAndKarma,
  installJest,
  updateAngularJson,
  createJestConfig,
  updateTsConfig,
  updatePackageJson,
  commitJestFiles,
};
