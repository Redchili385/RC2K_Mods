interface Car{
    id: number,
    driveTrain: "FWD" | "4WD"    //Min RPM - 2000/3000
    internalName: string,
    gearCount: number,
    steering: number,
    backLateralSlippage: number,
    handling: number,
    massMultiplier: number,
    shortFirstGearTopSpeed: number,
    shortTopGearTopSpeed: number,
    longFirstGearTopSpeed: number,
    longTopGearTopSpeed: number,
    maximumRPM: number,  //RPM that the rev limiter starts actuating - rev limit
    power: number, //In HorsePower?
}