const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const getUniqueYesAnswersForGroup = function (rawGroupAnswers: string): string[] {
    const yesAnswers: Set<string> = new Set<string>()

    for (const line of rawGroupAnswers.split('\n')) {
        for (const char of line) {
            // Put all characters in the set, it'll deal with maintaining unique values
            yesAnswers.add(char)
        }
    }

    return Array.from(yesAnswers)
}

const day6part1 = function (inputFilePath: string): number {
    const allRawGroupAnswers: string[] = fs.readFileSync(inputFilePath).toString().split('\n\n')

    return allRawGroupAnswers
        .map(getUniqueYesAnswersForGroup)
        .map(answers => answers.length)
        .reduce((x, y) => x + y)
}

console.log(day6part1(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))

export { day6part1 }