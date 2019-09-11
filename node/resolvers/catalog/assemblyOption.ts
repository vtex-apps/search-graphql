export const resolvers = {
  AssemblyOption: {
    inputValues: (
      { inputValues }: AssemblyOption,
    ): InputValueField[] => {
      return Object.keys(inputValues).reduce<InputValueField[]>((acc, label) => {
        const inputValue = inputValues[label]
        const type = defineInputValueType(inputValue)

        const maxLength = type === InputValueType.TEXT
          ? inputValue.maximumNumberOfCharacters : undefined

        const domain = type === InputValueType.OPTIONS
          ? inputValue.domain
          : undefined

        acc.push({
          label,
          type,
          maxLength,
          domain,
        })

        return acc
      }, [])
    }
  },
}

function defineInputValueType(inputValue: InputValue): InputValueType {
  const domain = inputValue.domain

  // If domain is something like ['true', 'false'] or ['false', 'true']
  if (
    domain && domain.length === 2 &&
    domain.indexOf('true') !== -1 && domain.indexOf('false') !== -1
  ) {
    return InputValueType.BOOLEAN
  }

  // If domain is something like ['Sans serif', 'Roman']
  if (domain && domain.length > 0) {
    return InputValueType.OPTIONS
  }

  return InputValueType.TEXT
}


interface InputValueField {
  label: string
  maxLength?: number
  type: InputValueType
  domain?: string[]
}

enum InputValueType {
  TEXT = 'TEXT',
  BOOLEAN = 'BOOLEAN',
  OPTIONS = 'OPTIONS',
}