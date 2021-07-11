
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { PictureContext } from "@kickstartds/base/lib/picture";
import { KickstartDSPage } from "../components/KickstartDSPageComponent";

const WrappedImage = (props) => {
  const image = getImage(props.src);
  return (
    <GatsbyImage image={image} alt="test" />
  );
}

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
