import { Helmet } from 'react-helmet';
import { withPrefix, Link } from 'gatsby';

import { KickstartDSPage } from "../components/KickstartDSPageComponent";

// TODO: inject dynamic data into keyvisual, heading
// TODO: convert to .ts / .tsx
export const KickstartDSList = (props) => {
  console.log(props);
  const {
    allKickstartDsPage: { nodes },
  } = props.pageContext.props;

  const newsItems = nodes.map((node) => {
    return {
      image: '/images/dummy/16-9-m.png',
      date: node.date,
      link: 'https://localhost:8000/list/',
      title: node.title,
      body: node.description,
    };
  });

  const content = [{
    'news-items': newsItems,
    type: 'news-list'
  }];

  // TODO `<Helmet>` should be filled from the asset-paths.json
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href={withPrefix('css/base.css')} media="print" onload="this.media='all'" /><noscript>{`<link rel="stylesheet" href={${withPrefix('css/base.css')}} />`}</noscript>
        <link rel="stylesheet" href={withPrefix('css/news.css')} media="print" onload="this.media='all'" /><noscript>{`<link rel="stylesheet" href={${withPrefix('css/news.css')}} />`}</noscript>
        <link rel="stylesheet" href={withPrefix('css/pagination.css')} media="print" onload="this.media='all'" /><noscript>{`<link rel="stylesheet" href={${withPrefix('css/pagination.css')}} />`}</noscript>
        <link rel="stylesheet" href={withPrefix('css/visuals.css')} media="print" onload="this.media='all'" /><noscript>{`<link rel="stylesheet" href={${withPrefix('css/visuals.css')}} />`}</noscript>
      </Helmet>

      <KickstartDSPage 
        keyvisual={{
          "small": true,
          "media": {
            "mode": "image",
            "image": {
              "src-mobile": "/keyvisual.jpg",
              "src-tablet": "/keyvisual.jpg",
              "src-desktop": "/keyvisual.jpg"
            }
          },
          "box": {
            "enabled": false,
            "inbox": false,
            "center": false,
            "top": false,
            "bottom": false,
            "left": false,
            "right": false,
            "light": false,
            "transparent": false,
            "headline": "Lorem Ipsum",
            "text": "Lorem Ipsum",
            "link": {
              "link-button-text": "Button",
              "button--outline-inverted": true
            }
          }
        }}
        heading="Aktuelle Artikel"
        content={content}>
      </KickstartDSPage>

      <Helmet>
        <script src={withPrefix('js/base.js')} type="text/javascript" defer="defer" />
        <script src={withPrefix('js/visuals.js')} type="text/javascript" defer="defer" />
        <script src={withPrefix('js/shared.js')} type="text/javascript" defer="defer" />
      </Helmet>
    </>
  );
}

export default KickstartDSList;
