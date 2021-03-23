import header from './js/header';
import content from './js/content';
import footer from './js/footer';

export default function () {
    header.linkParent('#header-container');
    header.render();

    content.linkParent('#content');
    content.render();

    footer.linkParent('#footer-container');
    footer.render();
}
