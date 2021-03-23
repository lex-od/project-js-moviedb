import API from './api';

export default {
    genreList: [],

    loadFromApi(language = 'en-US') {
        return API.getMovieGenres({ language })
            .then(result => {
                this.genreList = result.genres;
            })
            .catch(err => {
                console.log(`${err.name}: ${err.message}`);
            });
    },

    idListToString(idList, maxCount = Infinity, separater = ', ') {
        if (!Array.isArray(idList) || idList.length === 0) {
            return '';
        }

        let inclCount = 0;

        return this.genreList.reduce((accStr, genre) => {
            if (inclCount >= maxCount || !idList.includes(genre.id)) {
                return accStr;
            }

            inclCount++;
            const currSeparater = inclCount > 1 ? separater : '';
            return `${accStr}${currSeparater}${genre.name}`;
        }, '');
    },
};
