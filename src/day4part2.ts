const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const PASSPORT_FIELDS_REGEXP: RegExp = /(([a-z]{3})\:([^\s\n]+)[\s|\n]?)/gm

const PASSPORT_REQUIRED_FIELDS: string[] = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

const HEIGHT_VALIDATION_REGEXP: RegExp = /^([0-9]+)(cm|in)$/
const VALID_HEIGHT_UNITS: string[] = ['cm', 'in']
const HAIR_COLOUR_VALIDATION_REGEXP: RegExp = /^\#[a-f0-9]{6}$/
const VALID_EYE_COLOURS: string[] = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
const PASSPORT_NUMBER_VALIDATION_REGEXP: RegExp = /^[0-9]{9}$/

const PASSPORT_REQUIRED_FIELD_VALIDATION_RULES: { [key: string]: (input: string) => boolean } = {
    'byr': input => { 
        const birthYear: number = Number(input)
        return Number.isInteger(birthYear)  
            && (birthYear >= 1920)
            && (birthYear <= 2002)
    },
    'iyr': input => {
        const issueYear: number = Number(input)
        return Number.isInteger(issueYear)  
            && (issueYear >= 2010)
            && (issueYear <= 2020)
    },
    'eyr': input => {
        const expirationYear: number = Number(input)
        return Number.isInteger(expirationYear)  
            && (expirationYear >= 2020)
            && (expirationYear <= 2030)
    },
    'hgt': input => {
        const [, heightString, unit] = input.match(HEIGHT_VALIDATION_REGEXP) || []

        const height = Number(heightString)

        return Number.isInteger(height)
            && VALID_HEIGHT_UNITS.includes(unit)
            && (
                (unit === 'cm' && height >= 150 && height <= 193)
                || (unit === 'in' && height >= 59 && height <= 76)
            )
    },
    'hcl': input => HAIR_COLOUR_VALIDATION_REGEXP.test(input),
    'ecl': input => VALID_EYE_COLOURS.includes(input),
    'pid': input => PASSPORT_NUMBER_VALIDATION_REGEXP.test(input)
}

const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const parsePassportFields = function (rawPassportData: string): { [key: string]: string } {
    const passportFields: { [key: string]: string } = {}

    for (const match of rawPassportData.matchAll(PASSPORT_FIELDS_REGEXP)) {
        passportFields[match[2]] = match[3]
    }

    return passportFields
}

const isPassportValid = function (passportFields: { [key: string]: string }): boolean {
    for (const [fieldName, validationFn] of Object.entries(PASSPORT_REQUIRED_FIELD_VALIDATION_RULES)) {
        
        console.log(`Looking for field '${fieldName}'. Value is '${passportFields[fieldName]}`)
        if (passportFields[fieldName] === undefined)
            return false
        console.log(`Is it valid? ${validationFn(passportFields[fieldName])}`)
        if (!validationFn(passportFields[fieldName]))
            return false
    }
    
    return true
}

const day4part2 = function (inputFilePath: string): number {
    const arrayOfRawPassportData: string[] = fs.readFileSync(inputFilePath).toString().split('\n\n')
    
    return arrayOfRawPassportData
        .map(parsePassportFields)
        .map(isPassportValid)
        .filter(isValid => isValid === true)
        .length
}

console.log(day4part2(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))

export { day4part2 as day4part2 }