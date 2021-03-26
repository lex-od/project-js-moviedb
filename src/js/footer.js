// 📌 Имортируем как объект footer
import icons from '../images/icons.svg';
import studentsModal from './students-modal';
import yesin from '../images/students/yesin.jpg';
import myr from '../images/students/myrvoda.jpg';
import khmara from '../images/students/khmara.jpg';
import abramova from '../images/students/abramova.jpg';

export default {
    _parentNode: null,
    _tpl: 'base',

    // ====
    _movieListNode: null,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    render() {
        const tpl = require('../templates/' + this._tpl + '.footer.hbs');
        this._parentNode.innerHTML = tpl(icons);
        // ====
        this._linkRefs();
        this._bindEvents();

        studentsModal.linkParent('.backdrop');
    },

    _linkRefs() {
        // this._movieListNode = this._parentNode.querySelector('.gallery-list');
        this._movieListNode = this._parentNode.querySelector('.students-list');
    },
    _bindEvents() {
        this._movieListNode?.addEventListener(
            'click',
            this.onMovieListClick.bind(this),
        );
    },

    onMovieListClick(event) {
        event.preventDefault();
        // console.log('слушатель срабатывает ok');
        // if (event.target === event.currentTarget) {
        //     return;
        // }
        // const movieCard = event.target.closest('.gallery-item');
        // const movieCard = event.target.closest('.students-list');

        // const movieId = movieCard.dataset.source;

        studentsModal.render();
    },
};
