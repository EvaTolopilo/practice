function sumFirstAndLastDigit(number) {
    const numberString = number.toString();
    const firstDigit = parseInt(numberString[0]);
    const lastDigit = parseInt(numberString[numberString.length - 1]);
    console.log(firstDigit + lastDigit);
}

sumFirstAndLastDigit(12345);
