async function fetchParallelData(urls) {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(async (response) => {
            try {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return await response.json();
            } catch (error) {
                console.error(error);
                return {};
            }
        }));
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        throw error;
    }
}

const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://api.exchangerate-api.com/v4/latest/USD', 
    'https://quote-garden.herokuapp.com/api/v3/quotes/random',
];

fetchParallelData(urls)
    .then(data => {
        console.log('Загруженные данные:', data);
    })
    .catch(error => {
        console.error('Ошибка в обработке данных:', error);
    });
