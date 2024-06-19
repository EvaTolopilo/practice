function scopeExample() {
    var xVar = 10;
    let xLet = 20;
    const xConst = 30;

    {
        console.log("Внутри блока:");
        console.log("xVar:", xVar); //10
        console.log("xLet:", xLet); //20
        console.log("xConst:", xConst); //30
        var xVar = 4;
        console.log("xVar (переопредел.):", xVar); //4
    }

    console.log("Снаружи блока:");
    console.log("xVar:", xVar);
    console.log("xLet:", xLet);
    console.log("xConst:", xConst);

}

scopeExample();
