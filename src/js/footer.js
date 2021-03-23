// 📌 Имортируем как объект footer

export default {
    _parentNode: null,
    _tpl: 'base',

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    render() {
        // const tpl = require('../templates/' + this._tpl + '.footer.hbs');
        // this._parentNode.innerHTML = tpl();

        this._bindEvents();
    },

    _bindEvents() {
        //
    },
};
