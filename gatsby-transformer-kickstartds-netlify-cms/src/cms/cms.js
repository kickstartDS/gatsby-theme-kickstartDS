import CMS from 'netlify-cms-app';
import idWidget from 'netlify-cms-widget-simple-uuid';

import PagePreview from './preview-templates/PagePreview';
// import SettingsNavigationPreview from './preview-templates/SettingsNavigationPreview';

CMS.registerWidget('id', idWidget.IdControl, idWidget.IdPreview);
CMS.registerPreviewTemplate('pages', PagePreview);
// CMS.registerPreviewTemplate('navigation', SettingsNavigationPreview);

CMS.init();
