import apiParams from '../../json/apiParams';

// 📌 Имортируем как объект API

export default {
    _getDiffData(paramsLeft, paramsRight = '') {
        return fetch(
            `${apiParams.ENDPOINT}${paramsLeft}?api_key=${apiParams.API_KEY}${paramsRight}`,
        ).then(resp => {
            if (resp.ok) {
                return resp.json();
            }

            throw new Error('request was rejected by server');
        });
    },

    getTrending({ mediaType = 'movie', timeWindow = 'day', page = 1 } = {}) {
        let paramsLeft = '';
        let paramsRight = '';

        if (apiParams.MEDIA_TYPES.includes(mediaType)) {
            paramsLeft += `/${mediaType}`;
        } else {
            return Promise.reject(
                new Error('invalid value of "mediaType" parameter'),
            );
        }

        if (apiParams.TIME_WINDOWS.includes(timeWindow)) {
            paramsLeft += `/${timeWindow}`;
        } else {
            return Promise.reject(
                new Error('invalid value of "timeWindow" parameter'),
            );
        }

        if (typeof page === 'number' && page >= 1) {
            paramsRight += `&page=${page}`;
        }

        return this._getDiffData(`/trending${paramsLeft}`, paramsRight);
    },

    searchMovies({ query, page = 1, language = 'en-US' }) {
        let paramsRight = '';

        if (typeof query === 'string' && query.length >= 1) {
            paramsRight += `&query=${query}`;
        } else {
            return Promise.reject(
                new Error('missing required argument "query"'),
            );
        }

        if (typeof page === 'number' && page >= 1) {
            paramsRight += `&page=${page}`;
        }

        if (apiParams.LANGUAGES.includes(language)) {
            paramsRight += `&language=${language}`;
        }

        return this._getDiffData('/search/movie', paramsRight);
    },

    getMovieDetails({ movieId, language = 'en-US' }) {
        let paramsLeft = '';
        let paramsRight = '';

        if (typeof movieId === 'number' && movieId >= 0) {
            paramsLeft += `/${movieId}`;
        } else {
            return Promise.reject(
                new Error('invalid value of argument "movieId"'),
            );
        }

        if (apiParams.LANGUAGES.includes(language)) {
            paramsRight += `&language=${language}`;
        }

        return this._getDiffData(`/movie${paramsLeft}`, paramsRight);
    },
};
