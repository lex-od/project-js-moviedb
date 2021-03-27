// 📌 Имортируем как объект footer
import icons from '../images/icons.svg';
import studentsModal from './students-modal';
import yesin from '../images/students/yesin.jpg';
import myr from '../images/students/myrvoda.jpg';
import khmara from '../images/students/khmara.jpg';
import abramova from '../images/students/abramova.jpg';
import deputat from '../images/students/deputat.jpg';
import serdiuk from '../images/students/serdiuk.jpg';

export default {
    _parentNode: null,
    _tpl: 'base',

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
    },
    _bindEvents() {
        this._studentsListNode?.addEventListener(
            'click',
            this.onStudentsListClick.bind(this),
        );
    },

    onStudentsListClick(event) {
        event.preventDefault();

        studentsModal.render();
    },
};
