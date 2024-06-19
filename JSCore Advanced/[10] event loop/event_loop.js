function generateRandomDelayPromise() {
    return new Promise((resolve, reject) => {
        const randomDelay = Math.floor(Math.random() * 10) + 1;
        console.log("Сгенерированная задержка:", randomDelay);

        if (randomDelay <= 5) {
            setTimeout(() => {
                resolve(randomDelay); // Успешное выполнение
            }, randomDelay * 1000);
        } else {
            setTimeout(() => {
                reject(randomDelay); // Ошибка
            }, randomDelay * 1000);
        }
    });
}

generateRandomDelayPromise()
    .then(delay => {
        console.log("Промис выполнен успешно с задержкой:", delay);
    })
    .catch(delay => {
        console.error("Промис завершился с ошибкой:", delay);
    });
