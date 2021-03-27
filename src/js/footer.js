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
    _goTopBtn: null,
    // ====
    _studentsListNode: null,

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
        this._studentsListNode = this._parentNode.querySelector(
            '.students-list',
        );

        // добавление кнопки scrollUp
        this._goTopBtn = document.querySelector('.back_to_top');
    },
    _bindEvents() {
        this._studentsListNode?.addEventListener(
            'click',
            this.onStudentsListClick.bind(this),
        );
        // добавление кнопки scrollUp
        window.addEventListener('scroll', this.trackScroll.bind(this));
        this._goTopBtn.addEventListener('click', this.backToTop.bind(this));
    },

    onStudentsListClick(event) {
        event.preventDefault();

        studentsModal.render();
    },

    // добавление кнопки scrollUp
    trackScroll() {
        const scrolled = window.pageYOffset;
        const coords = document.documentElement.clientHeight;
        if (scrolled > coords) {
            this._goTopBtn.classList.add('back_to_top-show');
        } else {
            this._goTopBtn.classList.remove('back_to_top-show');
        }
    },

    backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    },
};
