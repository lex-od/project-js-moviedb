import header from './js/header';
import content from './js/content';
import footer from './js/footer';
import pagination from './js/pagination';
import genresService from './js/services/genresService';

export default async function () {
    await genresService.loadFromApi();

    header.linkParent('#header-container');
    header.render();

    content.linkParent('#content');
    content.render();

    footer.linkParent('#footer-container');
    footer.render();

    pagination.linkParent('.pagination');
    pagination.render();


}
