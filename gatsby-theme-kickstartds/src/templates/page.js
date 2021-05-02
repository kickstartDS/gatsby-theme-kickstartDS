import { KickstartDSPage } from "../components/KickstartDSPageComponent";

// TODO: convert to .ts / .tsx
export const KickstartDSList = (props) => {
  const page = props.pageContext.page;

  return (
    <KickstartDSPage {...page} />
  );
}

export default KickstartDSList;
