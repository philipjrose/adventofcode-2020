const fs = require('fs')
const readline = require('readline')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const PREAMBLE_LENGTH: number = 25


const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const findNumberWithoutSumInPrecedingNumbers = function (numbers: number[]): number {
    const previousNumbers: number[] = []

    for (const currentNumber of numbers) {
        if (previousNumbers.length === PREAMBLE_LENGTH) {
            let sumFound = false

            loopThroughPreviousNumbers: for (let i = 0; i < previousNumbers.length; i++) {
                if (previousNumbers[i] < currentNumber) {
                    for (let j = i + 1; j < previousNumbers.length; j++) {
                        if (previousNumbers[j] !== previousNumbers[i] 
                            && previousNumbers[i] + previousNumbers[j] === currentNumber) {
                                sumFound = true
                                break loopThroughPreviousNumbers
                        }
                    }
                }
            }

            if (!sumFound)
                return currentNumber

            // Get rid of the oldest number, as we only track the last PREAMBLE_LENGTH numbers
            previousNumbers.shift()
        }

        previousNumbers.push(currentNumber)
    }

    return 0
}

const getEncryptionWeakness = function (numberWithoutSum: number, allNumbers: number[]): number {

    for (let i = 0; i < allNumbers.length; i++) {
        if (allNumbers[i] >= numberWithoutSum) {
            continue
        } 
        else {
            const candidateContiguousSet: number[] = [allNumbers[i]]
            let exceededTotal: boolean = false

            for (let j = i + 1; exceededTotal === false; j++) {
                candidateContiguousSet.push(allNumbers[j])

                const sumOfContiguousSet: number = candidateContiguousSet.reduce((x, y) => x + y)

                if (sumOfContiguousSet === numberWithoutSum) {
                    return Math.min(...candidateContiguousSet) + Math.max(...candidateContiguousSet)
                } else if (sumOfContiguousSet > numberWithoutSum) {
                    exceededTotal = true
                }
            }
        }
    }

    return 0
}

const day9part2 = function (inputFilePath: string): number {
    const numbers: number[] = fs.readFileSync(inputFilePath).toString().split('\n').map((n: string) => parseInt(n))

    const numberWithoutSumFromPrecedingNumbers: number = findNumberWithoutSumInPrecedingNumbers(numbers)

    return getEncryptionWeakness(numberWithoutSumFromPrecedingNumbers, numbers)
}

console.log(day9part2(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))

export { day9part2 }