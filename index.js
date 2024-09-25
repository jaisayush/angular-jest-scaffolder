#!/usr/bin/env node
const commander = require("commander");
const {
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
  AppError,
} = require("./utils");

// Main function to scaffold Jest with Angular
async function scaffoldJestWithAngular() {
  const program = new commander.Command();

  program
    .argument("[app-name]", "Name of the Angular app")
    .option("--verbose", "Enable verbose mode")
    .option("--no-commit", "Skip committing Jest-related files to Git")
    .action((appName, options) => {
      const { verbose, commit } = options;
      if (!appName) {
        console.log("No app name provided.");
        appName = "angular-jest-starter";
      }
      console.log(`Using app name: ${appName}`);
      try {
        // Step 1: Check Node.js version
        checkNodeVersion(">=18.0.0");

        // Step 2: Ensure Angular CLI is installed
        ensureAngularCLIInstalled();

        // Step 3: Create Angular app
        createAngularApp(appName, program.rawArgs.slice(3));

        // Step 4: Remove Jasmine and Karma
        removeJasmineAndKarma();

        // Step 5: Install Jest
        installJest();

        // Step 6: Update angular.json to use Jest
        updateAngularJson();

        // Step 7: Create Jest configuration files
        createJestConfig();

        // Step 8: Update TypeScript configurations for Jest
        updateTsConfig();

        // Step 9: Update package.json to use Jest configuration
        updatePackageJson();

        // Step 10: Commit Jest-related files to Git (optional)
        if (commit) {
          commitJestFiles();
        }

        console.log("Jest setup completed.");
        console.log("========================================================");
        console.log(
          "Run `npm install` and then `ng test` to start testing with Jest."
        );
      } catch (error) {
        if (error instanceof AppError) {
          console.error("Error:", error.message);
        } else {
          console.error("Unexpected Error:", error);
        }
        process.exit(error.statusCode);
      }
    });

  program.parse(process.argv);
}

// Handle global errors
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

// Execute the Jest scaffolding process
scaffoldJestWithAngular();
