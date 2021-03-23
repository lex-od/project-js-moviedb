import API from './services/api';
import pagination from './pagination';

// 📌 Имортируем как объект content

export default {
    _parentNode: null,
    _tpl: 'gallery',
    page: 1,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    async render() {
        const tpl = require('../templates/' + this._tpl + '.content.hbs');
        const response = await this.initData();
        this._parentNode.innerHTML = tpl(response.results);

        this._bindEvents();

        pagination.linkParent('#pagination');
        pagination.render();
    },

    _bindEvents() {
        //
    },

    async initData() {
        return API.getTrending({ page: this.page });
    },
};


console.log('test');