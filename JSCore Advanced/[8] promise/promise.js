function fetchCombinedData(apiUrls) {
    const promises = apiUrls.map(url => fetch(url).then(response => response.json()));
    return Promise.all(promises).then(data => {
        // Используем flatMap для объединения данных массивов в один массив
        return data.flatMap(singleData => {
            if (Array.isArray(singleData)) {
                return singleData;
            } else {
                return [singleData];
            }
        });
    });
}

const apiUrls = [
    'https://api.quotable.io/random',
    'https://financialmodelingprep.com/api/v3/stock/real-time-price/AAPL',
    'https://jsonplaceholder.typicode.com/posts',
];

fetchCombinedData(apiUrls)
    .then(combinedData => {
        console.log('Объединенные данные:', combinedData);
    })
    .catch(error => {
        console.error('Ошибка при получении данных:', error);
    });
