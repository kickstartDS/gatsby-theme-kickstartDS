
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { PictureContextDefault, PictureContext } from "@kickstartds/base/lib/picture";
import { KickstartDSPage } from "../components/KickstartDSPageComponent";

const WrappedImage = (props) => 
  props.src && props.src.childImageSharp
    ? <GatsbyImage image={getImage(props.src)} alt="TODO add useful image alt" />
    : props.src.publicURL
      ? <PictureContextDefault src={props.src.publicURL} />
      : null;

const PictureProvider = (props) => (
  <PictureContext.Provider value={WrappedImage} {...props} />
);

export const KickstartDSList = (props) => {
  const page = props.pageContext.page;
  
  return (
    <PictureProvider>
      <KickstartDSPage {...page} />
    </PictureProvider>
  );
}

export default KickstartDSList;
