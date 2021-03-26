// 📌 Имортируем как объект pagination
import paginate from 'handlebars-paginate';
import * as Handlebars from 'handlebars/runtime';
import paginationTpl from '../templates/pagination.hbs';
import paginationOnePage from '../templates/paginationOnePage.hbs';
import content from './content';

const Pagination = {
    parentNode: null,
    paginationRef: null,
    pagDiv: null,
    incrementBtn: null,
    decrementBtn: null,
    reposLink: null,
    page: 1,
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
            this.reposLink.addEventListener(
                'click',
                this.onReposeLincClick.bind(this),
            );
        }
    },

    render() {
        // console.log(content.page, content.pageCount);
        this.pagMarkup();
        this.linkRefs();
        this.bindEvents();

        this.isInit = true;
    },
    helpers() {
        Handlebars.registerHelper('paginate', paginate);
        Handlebars.registerHelper('ifToMore', function (data, option) {
            if (+data > 3) return option.fn(this);
        });
        Handlebars.registerHelper('ifEnd', function (data, option) {
            if (+content.pageCount - 2 > +data) return option.fn(this);
        });
        Handlebars.registerHelper('limit', function (data) {
            return 5;
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
        this.page += 1;
        content.page = this.page;
        content.render();
        // content.page = content.page + 1;
        // content.render;
    },

    decrement() {
        if (this.page <= 1) {
            return;
        }
        this.page -= 1;
        content.page = this.page;
        content.render();
    },
    onReposeLincClick(e) {
        if (!(e.target.tagName === 'SPAN' && e.target.dataset.action))
            return false;
        const curPage = e.target.dataset.action;

        this.page = +curPage;
        content.page = this.page;

        content.render();
    },
};

export default Pagination;
