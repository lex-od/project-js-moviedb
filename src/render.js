import header from './js/header';
import content from './js/content';
import footer from './js/footer';
import genresService from './js/services/genresService';
import dataProcess from './js/services/dataProcess';
import dpParams from './json/dataProcParams.json';
import Theme from './js/colorSwitch';

export default async function () {
    await genresService.loadFromApi();
    dataProcess.setCurrFunc(dpParams.FUNCTIONS.TREND);

    header.linkParent('#header-container');
    header.render();

    content.linkParent('#content');
    content.render();

    footer.linkParent('#footer-container');
    footer.render();

    Theme.linkParent('#switch');
    Theme.render();
}
