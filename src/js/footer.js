// 📌 Имортируем как объект footer
import LocalStorageUtils from './services/localStorage';
import icons from '../images/icons.svg';

export default {
    _parentNode: null,
    _tpl: 'base',

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    render() {
        const tpl = require('../templates/' + this._tpl + '.footer.hbs');
        this._parentNode.innerHTML = tpl(icons);
    },
};
// ===================================
const localStorageUtils = new LocalStorageUtils();

const obj = {
    id: 1,
    name: 'qwer',
};
const obj2 = {
    id: 2,
    name: 'qwer2',
};

// localStorageUtils.getMovies();
localStorageUtils.toggleMoviesInList(localStorageUtils.listNames.watched, obj);
// localStorageUtils.toggleMoviesInList(localStorageUtils.listNames.watched, obj2);
localStorageUtils.toggleMoviesInList(localStorageUtils.listNames.watched, obj2);
