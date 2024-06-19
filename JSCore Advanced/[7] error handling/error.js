function divideNumbers(num1, num2) {
    if (num2 === 0) {
        throw new Error("Деление на ноль недопустимо.");
    }
    return num1 / num2;
}

try {
    const result = divideNumbers(10, 2);
    console.log(result);
} catch (error) {
    console.error(error.message);
}

try {
    const result = divideNumbers(10, 0);
} catch (error) {
    console.error(error.message);
}
