const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const getConsistentYesAnswersForGroup = function (rawGroupAnswers: string): string[] {
    const yesAnswersWithCounts: { [question: string]: number } = {}

    const rawAnswersByPerson: string[] = rawGroupAnswers.split('\n')

    for (const line of rawAnswersByPerson) {
        for (const char of line) {
            if (yesAnswersWithCounts[char] === undefined)
                yesAnswersWithCounts[char] = 1
            else
                yesAnswersWithCounts[char] += 1
        }
    }

    return Object.keys(yesAnswersWithCounts).filter(answer => yesAnswersWithCounts[answer] === rawAnswersByPerson.length)
}

const day6part2 = function (inputFilePath: string): number {
    const allRawGroupAnswers: string[] = fs.readFileSync(inputFilePath).toString().split('\n\n')

    return allRawGroupAnswers
        .map(getConsistentYesAnswersForGroup)
        .map(answers => answers.length)
        .reduce((x, y) => x + y)
}

console.log(day6part2(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))

export { day6part2 as day6part2 }