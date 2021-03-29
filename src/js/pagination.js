// 📌 Имортируем как объект pagination
import paginate from 'handlebars-paginate';
import * as Handlebars from 'handlebars/runtime';
import paginationTpl from '../templates/pagination.hbs';
import content from './content';

const Pagination = {
    parentNode: null,
    paginationRef: null,
    pagDiv: null,
    incrementBtn: null,
    decrementBtn: null,
    reposLink: null,

    isInit: false,

    linkParent(selector) {
        this.parentNode = document.querySelector(selector);
    },
    linkRefs() {
        this.incrementBtn = document.querySelector('#inc');
        this.decrementBtn = document.querySelector('#dec');
        this.reposLink = this.parentNode;
        this.paginationRef = document.querySelector('.pagination');
    },

    bindEvents() {
        this.incrementBtn.addEventListener('click', this.increment.bind(this));
        this.decrementBtn.addEventListener('click', this.decrement.bind(this));
        if (!this.isInit) {
            this.reposLink.addEventListener('click', this.lincClick.bind(this));
        }
    },

    render() {
        this.pagMarkup();
        this.linkRefs();
        this.bindEvents();
        this.isInit = true;
    },
    helpers() {
        Handlebars.registerHelper('paginate', paginate);
        Handlebars.registerHelper('ifToMore', function (data, option) {
            if (+data > 3 && window.innerWidth > 767) return option.fn(this);
        });
        Handlebars.registerHelper('ifEnd', function (data, option) {
            if (+content.pageCount - 2 > +data && window.innerWidth > 768)
                return option.fn(this);
        });
    },

    pagMarkup() {
        let page = content.page;
        let pageCount = content.pageCount;

        this.helpers();
        this.parentNode.innerHTML = paginationTpl(
            {
                pagination: {
                    page,
                    pageCount,
                },
            },
            Handlebars,
        );
    },

    increment() {
        if (content.page >= content.pageCount) {
            return;
        }

        content.page += 1;
        content.render();
    },

    decrement() {
        if (content.page <= 1) {
            return;
        }
        content.page -= 1;

        content.render();
    },
    lincClick(e) {
        if (!(e.target.tagName === 'SPAN' && e.target.dataset.action))
            return false;
        const curPage = e.target.dataset.action;

        content.page = +curPage;

        content.render();
    },
};

export default Pagination;
