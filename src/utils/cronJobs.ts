import cron from "node-cron";
import { repositoryResolver } from "../graphql/resolvers/repositoryResolver";

// Schedule periodic refresh of repository data every 5 seconds
cron.schedule("*/5 * * * * *", async () => {
  console.log("Running periodic repository refresh...");
  await repositoryResolver.Mutation.refreshRepositories();
});
