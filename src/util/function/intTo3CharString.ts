export function intTo3CharString(int: number){
    if(int < 0){
        return "000"
    }
    if(int < 10){
        return "00"+int
    }
    if(int < 100){
        return "0"+int
    }
    if(int >= 1000){
      return "999"
    }
    return ""+int
}