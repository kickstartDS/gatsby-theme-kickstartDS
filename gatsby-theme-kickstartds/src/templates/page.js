
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { PictureContextDefault, PictureContext } from "@kickstartds/base/lib/picture";
import { VisualContextDefault, VisualContext } from "@kickstartds/content/lib/visual";
import { StorytellingContextDefault, StorytellingContext } from "@kickstartds/content/lib/storytelling";
import { KickstartDSPage } from "../components/KickstartDSPageComponent";
import { LinkContextDefault, LinkContext } from '@kickstartds/base/lib/link';
import { Link } from "gatsby";

const WrappedLink = ({ href, className, ...props }) =>
  href.startsWith('/')
    ? <Link to={href} className={className} />
    : <LinkContextDefault href={href} className={className} {...props} />;

const WrappedImage = (props) => 
  props.src && props.src.childImageSharp
    ? <GatsbyImage image={getImage(props.src)} alt="TODO add useful image alt" />
    : props.src && props.src.publicURL
      ? <PictureContextDefault src={props.src.publicURL} />
      : null;

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
      if (props.media.image.src.childImageSharp) delete props.media.image.src.childImageSharp;
      props.media.image.srcMobile = props.media.image.srcMobile.publicURL;
    }
  }

  return <VisualContextDefault {...props} />;
}

const WrappedStorytelling = (props) => 
  props.backgroundImage && props.backgroundImage.publicURL
    ? <StorytellingContextDefault {...props} backgroundImage={props.backgroundImage.publicURL} />
    : <StorytellingContextDefault {...props} />;

const LinkProvider = (props) => (
  <LinkContext.Provider value={WrappedLink} {...props} />
);

const PictureProvider = (props) => (
  <PictureContext.Provider value={WrappedImage} {...props} />
);

const VisualProvider = (props) => (
  <VisualContext.Provider value={WrappedVisual} {...props} />
);

const StorytellingProvider = (props) => (
  <StorytellingContext.Provider value={WrappedStorytelling} {...props} />
);

export const KickstartDSList = (props) => {
  const page = props.pageContext.page;
  
  return (
    <LinkProvider>
      <PictureProvider>
        <StorytellingProvider>
          <VisualProvider>
            <KickstartDSPage {...page} />
          </VisualProvider>
        </StorytellingProvider>
      </PictureProvider>
    </LinkProvider>
  );
};

export default KickstartDSList;
