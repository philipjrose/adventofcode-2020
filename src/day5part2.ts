const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const MINIMUM_ROW: number = 0
const MAXIMUM_ROW: number = 127
const MINIMUM_COLUMN: number = 0
const MAXIMUM_COLUMN: number = 7

const HIGHER_HALF_OF_RANGE_CHARACTERS: string[] = ['B', 'R']

const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const getPositionFromBoardingPassString = function (minPosition: number, maxPosition: number, boardingPassCharacters: string): number {
    if (minPosition === maxPosition)
        return minPosition
    else {
        const newPositionBoundary: number = maxPosition - ((maxPosition - minPosition) / 2)

        return (HIGHER_HALF_OF_RANGE_CHARACTERS.includes(boardingPassCharacters.charAt(0)))
            ? getPositionFromBoardingPassString(Math.ceil(newPositionBoundary), maxPosition, boardingPassCharacters.substring(1))
            : getPositionFromBoardingPassString(minPosition, Math.floor(newPositionBoundary), boardingPassCharacters.substring(1))
    }
}

const getSeatIdForBoardingPass = function (boardingPass: string): number {
    const row: number = getPositionFromBoardingPassString(MINIMUM_ROW, MAXIMUM_ROW, boardingPass.substring(0, 7))
    const column: number = getPositionFromBoardingPassString(MINIMUM_COLUMN, MAXIMUM_COLUMN, boardingPass.substring(7, 10))
    
    return row * 8 + column
}

const day5part2 = function (inputFilePath: string): number {
    const arrayOfLines: string[] = fs.readFileSync(inputFilePath).toString().split('\n')
    
    const seatIds: number[] = []

    for (const line of arrayOfLines) {
        seatIds.push(getSeatIdForBoardingPass(line))
    }

    // Looking for a gap of one in the seat IDs, so sort them in ascending order
    seatIds.sort((x, y) => x >= y ? 1 : -1)

    for (let i = 1; i < seatIds.length; i++) {
        if (seatIds[i] - seatIds[i-1] > 1)
            return seatIds[i] - 1
    }

    return 0
}

console.log(day5part2(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))

export { day5part2 }