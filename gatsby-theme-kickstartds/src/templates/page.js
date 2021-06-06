import { KickstartDSPage } from "../components/KickstartDSPageComponent";

export const KickstartDSList = (props) => {
  const page = props.pageContext.page;

  return (
    <KickstartDSPage {...page} />
  );
}

export default KickstartDSList;
