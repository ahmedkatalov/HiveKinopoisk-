// actions.js
export const FETCH_TRAILER_REQUEST = 'FETCH_TRAILER_REQUEST';
export const FETCH_TRAILER_SUCCESS = 'FETCH_TRAILER_SUCCESS';
export const FETCH_TRAILER_FAILURE = 'FETCH_TRAILER_FAILURE';

export const fetchTrailerRequest = () => ({ type: FETCH_TRAILER_REQUEST });
export const fetchTrailerSuccess = (trailer) => ({
    type: FETCH_TRAILER_SUCCESS,
    payload: trailer,
});
export const fetchTrailerFailure = (error) => ({
    type: FETCH_TRAILER_FAILURE,
    payload: error,
});

// Thunk action for fetching the trailer
export const fetchMovieTrailer = (movieName) => async (dispatch) => {
    dispatch(fetchTrailerRequest());
    const apiKey = 'AIzaSyBkGxvicfdO0NLzsn21aQSI_tBtO1pGaWU'; // Replace with your actual API key
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieName)}+trailer&key=${apiKey}&type=video&maxResults=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);
        const data = await response.json();
        dispatch(fetchTrailerSuccess(data.items[0]));
    } catch (error) {
        dispatch(fetchTrailerFailure(error.message));
    }
};
