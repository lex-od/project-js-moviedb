import API from './api';
import LocalStorageUtils from './localStorage';
import dpParams from '../../json/dataProcParams.json';

export default {
    currName: '',
    currFunc: null,

    // Прикрепляем значение переменной query через замыкание
    searchMovies(query) {
        return page => API.searchMovies({ query, page });
    },

    getTrending() {
        return page => API.getTrending({ page });
    },

    // Сохраняем this
    getWatched() {
        return page => {
            const watchedObj = this._getLocalStorPage(page, 'watched');
            return Promise.resolve(watchedObj);
        };
    },

    // Сохраняем this
    getQueued() {
        return page => {
            const queuedObj = this._getLocalStorPage(page, 'queued');
            return Promise.resolve(queuedObj);
        };
    },

    _getLocalStorPage(page, collection) {
        const lsUtils = new LocalStorageUtils();
        const movieList = lsUtils.getMovies(collection);

        const indexFrom = (page - 1) * 20;
        const results = movieList.slice(indexFrom, indexFrom + 20);
        const total_pages = Math.ceil(movieList.length / 20);

        return { results, total_pages };
    },

    setCurrFunc(currName, params) {
        if (!Object.values(dpParams.FUNCTIONS).includes(currName)) {
            return;
        }

        this.currName = currName;
        this.currFunc = this[currName](params);
    },
};
