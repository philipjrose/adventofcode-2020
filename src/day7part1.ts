const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const BAG_RULE_PARENT_REGEXP: RegExp = /^([a-z\s]+)\sbags\scontain\s((?:[0-9]\s(?:[a-z\s]+)\sbags?(?:,\s)?)+|no\sother\sbags)\.$/
const BAG_RULE_GET_CHILDREN_REGEXP: RegExp = /[0-9]\s([a-z\s]+)\sbags?/g
const NO_CHILDREN: string = 'no other bags'

const INPUT_BAG_COLOUR: string = 'shiny gold'

interface BagRule {
    parentColour: string
    childColours?: string[]
}

const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const parseBagRule = function(rawBagRule: string): BagRule {
    const [, parentColour, rawChildColours] = rawBagRule.match(BAG_RULE_PARENT_REGEXP) || []

    const childColours = (rawChildColours !== NO_CHILDREN)
        ? Array.from(rawChildColours.matchAll(BAG_RULE_GET_CHILDREN_REGEXP), match => match[1])
        : undefined

    return { parentColour: parentColour, childColours: childColours }
}

const findContainingBagColoursForContainedBag = function (containedBagColour: string,
     bagRules: BagRule[], 
     containingBagColours: Set<string> = new Set<string>()
     ): string[] {
    
    bagRules.filter(bagRule => bagRule.childColours !== undefined && bagRule.childColours.includes(containedBagColour))
        .forEach(ruleWithMatchingParent => {
            console.log(`Rule matches child bag of colour '${containedBagColour}'! Parent: ${ruleWithMatchingParent.parentColour}`)
            containingBagColours.add(ruleWithMatchingParent.parentColour)
            // Recursively find where containing bags can be contained themselves and add to the set
            findContainingBagColoursForContainedBag(ruleWithMatchingParent.parentColour, bagRules, containingBagColours)
        })

    return Array.from(containingBagColours)
}

const day7part1 = function (inputFilePath: string): number {
    const bagRules: BagRule[] = fs.readFileSync(inputFilePath).toString()
        .split('\n')
        .map(parseBagRule)

    var x = findContainingBagColoursForContainedBag(INPUT_BAG_COLOUR, bagRules)

    console.dir(x, { maxArrayLength: null })

    return x.length
}

console.log(day7part1(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))


export { day7part1 }