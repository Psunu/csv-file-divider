const { Command } = require("commander");
const fs = require("fs");
const readline = require("readline");

const program = new Command();

program
  .argument("<source_path>", "source csv file path")
  .option(
    "--out-name <name>",
    "output file name. sequence will be appended (e.g. output0.csv, output1.csv)",
    "output"
  )
  .option(
    "--count <count>",
    "number of rows that will be stored in same file",
    1000
  );

program.parse();

run(program.args[0], program.opts().outName, Number(program.opts().count));

async function run(input, outputName, maxCount) {
  const fileStream = fs.createReadStream(input);
  const rl = readline.createInterface({
    input: fileStream,
    crlDelay: Infinity,
  });

  let fields;
  let fd = null;
  let count = 0;
  let index = 0;
  try {
    for await (let line of rl) {
      if (!fields) {
        fields = line + "\n";
        continue;
      }
      if (fd == null) {
        if (fd !== null) {
          fs.fdatasync(fd);
          fs.closeSync(fd);
        }
        fd = fs.openSync(outputName + index++ + ".csv", "a");
        fs.appendFileSync(fd, fields);
      }

      fs.appendFileSync(fd, line + "\n");
      count++;
      console.log(`${count}/${maxCount}/${index - 1}`);

      if (count === maxCount) {
        fd = null;
        count = 0;
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (fd !== null) fs.closeSync(fd);
    console.log("done");
  }
}
