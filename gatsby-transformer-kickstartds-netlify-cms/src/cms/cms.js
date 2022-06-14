import CMS from 'netlify-cms-app';
import idWidget from 'netlify-cms-widget-simple-uuid';

import PagePreview from './preview-templates/PagePreview';
import HeaderPreview from './preview-templates/HeaderPreview';
import FooterPreview from './preview-templates/FooterPreview';

CMS.registerWidget('id', idWidget.IdControl, idWidget.IdPreview);

CMS.registerPreviewTemplate('pages', PagePreview);
CMS.registerPreviewTemplate('header', HeaderPreview);
CMS.registerPreviewTemplate('footer', FooterPreview);

CMS.init();
