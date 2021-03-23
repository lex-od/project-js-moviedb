// 📌 Имортируем как объект pagination

export default {
    _parentNode: null,
    _tpl: 'base',

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    render() {
        // const tpl = require('../templates/' + this._tpl + '.pagination.hbs');
        // this._parentNode.innerHTML = tpl();

        this._bindEvents();
    },

    _bindEvents() {
        //
    },
};

import API from './services/api';
import filmTpl from '../templates/movies.hbs';
import one from '../templates/firstPage.hbs';
import paginationTpl from '../templates/pagination.hbs'
// import Pagination from 'tui-pagination';

// export default class Pagination{
//   constructor(){
//    }
// };


const refs = {
    galleryCont: document.querySelector('.film-list'),
  };
  let page = 1;
  let baseUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=512b3f2f5e6e942a99e6ad594dddcaeb&page=`;
  
  insertItems();
  
  function insertItems() {
    fetch(baseUrl + page)
      .then(res => res.json())
      .then(data => {
        const markup = data.results.map(item => filmTpl(item)).join('');
        refs.galleryCont.innerHTML = markup;
        console.log(page);
      });
  }
  
  let pageDiv = document.querySelector('#pagDiv');
  
  function pagMarkup() {
    if (page === 1) {
      pageDiv.innerHTML = one();
    }
    if (page > 1) {
      pageDiv.innerHTML = paginationTpl();
      let decPage = document.querySelector('#dec');
      decPage.addEventListener('click', decrement);
    }
  }
  pagMarkup();
  
  let incPage = document.querySelector('#inc');
  incPage.addEventListener('click', increment);
  
  function increment() {
    page += 1;
    insertItems();
    pagMarkup();
    let incPage = document.querySelector('#inc');
    incPage.addEventListener('click', increment);
  }
  
  function decrement() {
    if (page > 1) {
      page -= 1;
      insertItems();
    }
  }

// pagination.on('afterMove', function(eventData) {
//     alert('The current page is ' + eventData.page);
// });

    /* <object id="dec">
      <button type="button" class="btnRight"><svg src="./images/icons/arrow-left.svg" width=20 height=20 id="arrow-left"></svg></button>       
</object>
        <a href="#" class="repos-pagination__link">1</a>
        <span class="repos-pagination__dots">...</span>      
        <a href="#" class="repos-pagination__link" id="#pagNext">2</a>
        <a href="#" class="repos-pagination__link" id="#pagNext2">3</a>
        <a href="#" class="repos-pagination__link" id="#pagPrev">4</a>
        <a href="#" class="repos-pagination__link" id="#pagPrev2">5</a>
        <a href="#" class="repos-pagination__link" id="#pagPrev2">6</a>
        <span class="repos-pagination__dots">...</span>
        <a href="#" class="repos-pagination__link">{{pageNext20}}</a>
<object id="inc">
     <button type="button" class="btnRight right"><svg src="./images/icons/arrow-left.svg" width=20 height=20 id="inc"></svg></button>       
</object> */
