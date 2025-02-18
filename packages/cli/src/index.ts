import { program } from "commander";
import { fetchTrials } from "./trials";

program
  .name("inato-cli")
  .command("trials <countryCode>")
  .description("get the list of clinical trials")
  .action(async (countryCode: string) => {
    try {
      const trials = await fetchTrials(countryCode);
      trials.length ? console.log(trials.join("\n")) : console.log("No ongoing trials found.");
    } catch (error) {
      console.error((error as Error).message);
      process.exit(1);
    }
  });
  
  program.parseAsync(process.argv);
