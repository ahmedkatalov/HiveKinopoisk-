const apiKey = 'TJ9EKK9-CK5MV0W-HD3BW9G-RG3522B';

export const fetchMoviesByName = async (searchInput) => {
    let apiUrl = `https://api.kinopoisk.dev/v1.3/movie?limit=60`;

    if (searchInput) {
        apiUrl += `&name=${encodeURIComponent(searchInput)}`;
    }

    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            accept: 'application/json',
            'X-API-KEY': apiKey,
        },
    });

    if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs || [];
};

export const fetchMovieById = async (id) => {
    const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
        method: "GET",
        headers: {
            accept: 'application/json',
            'X-API-KEY': apiKey,
        },
    })
      const data = await response.json();
      return data;
}