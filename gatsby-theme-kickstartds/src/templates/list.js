import React from "react";
import KickstartDSPage from "../components/KickstartDSPage.jsx";
import { graphql } from "gatsby";

// TODO: inject dynamic data into keyvisual, heading
// TODO: add react helmet
const KickstartDSList = (props) => {  
  const {
    data: {
      allKickstartDsPost: { nodes },
    },
  } = props;

  return (
    <KickstartDSPage 
      keyvisual={{
        show: true, 

        small: false,
        'no-crop': false,
        'image-indent': false,
        'box-inbox': false,
        'image-src-desktop': '/keyvisual.jpg',
        'image-src-tablet': '/keyvisual.jpg',
        'image-src-mobile': '/keyvisual.jpg',
        'box-visible': true,
        'box-center': false,
        'box-bottom': false,
        'box-top': false,
        'box-left': true,
        'box-right': false,
        'box-indent': false,
        'box-light': false,
        'box-transparent': false,
        'box-headline': 'Lorem Ipsum',
        'box-text': 'Hic maxime sed eos non. Consequatur ut qui amet accusantium nesciunt.',
        'box-link-href': '#',
        'box-link-link-button-text': "Button",
      }}
      heading="Aktuelle Artikel"
      content={nodes}>
    </KickstartDSPage>
  );
}

export const query = graphql`
  query KickstartDSListPage {
    allKickstartDsPost {
      nodes {
        image
        date(formatString: "D. MMMM YYYY", locale: "de")
        link
        title
        body
      }
    }
  }
`

export default KickstartDSList;
