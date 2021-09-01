
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { PictureContextDefault, PictureContext } from "@kickstartds/base/lib/picture";
import { VisualContextDefault, VisualContext } from "@kickstartds/content/lib/visual";
import { KickstartDSPage } from "../components/KickstartDSPageComponent";

const WrappedImage = (props) => {
  return props.src && props.src.childImageSharp
  ? <GatsbyImage image={getImage(props.src)} alt="TODO add useful image alt" />
  : props.src && props.src.publicURL
    ? <PictureContextDefault src={props.src.publicURL} />
    : null;
};

const WrappedVisual = (props) => {
  if (props.media && props.media.image) {
    if (props.media.image.srcDesktop && props.media.image.srcDesktop.publicURL) {
      props.media.image.srcDesktop = props.media.image.srcDesktop.publicURL;
    }
    if (props.media.image.srcTablet && props.media.image.srcTablet.publicURL) {
      props.media.image.srcTablet = props.media.image.srcTablet.publicURL;
    }
    if (props.media.image.srcMobile && props.media.image.srcMobile.publicURL) {
      props.media.image.src = props.media.image.srcMobile;
      props.media.image.srcMobile = props.media.image.srcMobile.publicURL;
    }
  }

  return <VisualContextDefault {...props}/>
}

const PictureProvider = (props) => (
  <PictureContext.Provider value={WrappedImage} {...props} />
);

const VisualProvider = (props) => (
  <VisualContext.Provider value={WrappedVisual} {...props} />
);

export const KickstartDSList = (props) => {
  const page = props.pageContext.page;
  
  return (
    <PictureProvider>
      <VisualProvider>
        <KickstartDSPage {...page} />
      </VisualProvider>
    </PictureProvider>
  );
}

export default KickstartDSList;
