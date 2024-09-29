const apiKey = 'TJ9EKK9-CK5MV0W-HD3BW9G-RG3522B';

export const fetchMoviesByGenre = async (genre) => {
    let apiUrl = `https://api.kinopoisk.dev/v1.3/movie?limit=200`; 

    if (genre) {
        apiUrl += `&genres.name=${encodeURIComponent(genre)}`; 
    }

    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            accept: 'application/json',
            'X-API-KEY': apiKey,
        },
    });

    if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText} Данные: `);
    }

    const data = await response.json();

    return data.docs || [];
};
