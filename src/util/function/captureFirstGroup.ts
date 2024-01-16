export function captureFirstGroup(regExp: RegExp, string: string): string | null {
    const matches = regExp.exec(string)
    if(matches == null){
      return null;
    }
    const firstMatch = matches[1]
    if(firstMatch == null){
      return null
    }
    return firstMatch
  }