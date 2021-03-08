import { Helmet } from 'react-helmet';
import { withPrefix, Link } from 'gatsby';

import { KickstartDSPage } from "../components/KickstartDSPageComponent";
import { graphql } from "gatsby";

// TODO: inject dynamic data into keyvisual, heading
// TODO: convert to .ts / .tsx
export const KickstartDSList = (props) => {  
  const {
    data: {
      allKickstartDsPage: { nodes },
    },
  } = props;

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
              "src-mobile": "keyvisual.jpg",
              "src-tablet": "keyvisual.jpg",
              "src-desktop": "keyvisual.jpg"
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
        content={nodes}>
      </KickstartDSPage>

      <Helmet>
        <script src={withPrefix('js/base.js')} type="text/javascript" defer="defer" />
        <script src={withPrefix('js/visuals.js')} type="text/javascript" defer="defer" />
        <script src={withPrefix('js/shared.js')} type="text/javascript" defer="defer" />
      </Helmet>
    </>
  );
}

/*export const query = graphql`
  query KickstartDsListPage {
    allKickstartDsPage {
      nodes {
        id
        layout
        keyvisual {
          media {
            mode
            image {
              src_mobile {
                childImageSharp {
                  gatsbyImageData(layout: FIXED)
                }
              }
              src_tablet {
                childImageSharp {
                  gatsbyImageData(layout: FIXED)
                }
              }
              src_desktop {
                childImageSharp {
                  gatsbyImageData(layout: FIXED)
                }
              }
            }
          }
          box {
            text
          }
        }
        heading
      }
    }
  }
`*/

export default KickstartDSList;
