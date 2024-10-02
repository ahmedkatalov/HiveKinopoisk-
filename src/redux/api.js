const apiKey = '07E5QFY-W1BMBN1-JPKBVKR-G4WRPZZ';

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
        throw new Error(`Error: ${response.statusText}`);
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