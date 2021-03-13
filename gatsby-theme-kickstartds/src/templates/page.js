import { Helmet } from 'react-helmet';
import { withPrefix, Link } from 'gatsby';

import { KickstartDSPage } from "../components/KickstartDSPageComponent";

// TODO: convert to .ts / .tsx
export const KickstartDSList = (props) => {
  const page = props.pageContext.page;

  // TODO `<Helmet>` should be filled from the asset-paths.json
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href={withPrefix('css/base.css')} media="print" onload="this.media='all'" /><noscript>{`<link rel="stylesheet" href={${withPrefix('css/base.css')}} />`}</noscript>
        <link rel="stylesheet" href={withPrefix('css/news.css')} media="print" onload="this.media='all'" /><noscript>{`<link rel="stylesheet" href={${withPrefix('css/news.css')}} />`}</noscript>
        <link rel="stylesheet" href={withPrefix('css/pagination.css')} media="print" onload="this.media='all'" /><noscript>{`<link rel="stylesheet" href={${withPrefix('css/pagination.css')}} />`}</noscript>
        <link rel="stylesheet" href={withPrefix('css/visuals.css')} media="print" onload="this.media='all'" /><noscript>{`<link rel="stylesheet" href={${withPrefix('css/visuals.css')}} />`}</noscript>
      </Helmet>

      <KickstartDSPage {...page} />

      <Helmet>
        <script src={withPrefix('js/base.js')} type="text/javascript" defer="defer" />
        <script src={withPrefix('js/visuals.js')} type="text/javascript" defer="defer" />
        <script src={withPrefix('js/shared.js')} type="text/javascript" defer="defer" />
      </Helmet>
    </>
  );
}

export default KickstartDSList;
