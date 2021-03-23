import API from './services/api';
import cardTpl from '../templates/galleryCard.hbs';
// 📌 Имортируем как объект content

// export default {
//     //

// };

const contentRef = document.querySelector('#content');

API.getTrending().then(({ results }) => {
    console.log(results);
    const galleryCard = cardTpl(results);
    contentRef.insertAdjacentHTML('beforeend', galleryCard);
});

// function getCardByRating({ vote_average }) {
//     vote_average.sort((a, b)=>b-a)
// }
