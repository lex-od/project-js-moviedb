import content from './content';

// 📌 Имортируем как объект header

export default {
    _parentNode: null,
    _tpl: 'home',

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    render() {
        const tpl = require('../templates/' + this._tpl + '.header.hbs');
        this._parentNode.innerHTML = tpl();

        this._bindEvents();
    },

    _bindEvents() {
        // // Пример вызова отрисовки галереи по событию
        // content.initData = async () => { };
        // content.render();
    },
};
