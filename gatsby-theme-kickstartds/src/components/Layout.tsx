import { FunctionComponent } from 'react';

import { SEO } from "./Seo";
import { Providers } from "./Providers";

export const Layout: FunctionComponent<any> = (props) => (
  <Providers>
    <SEO
      title={props.title}
      description={props.description}
      keywords={props.keywords}
      image={props.image && props.image.publicURL}
      cardImage={props.cardImage && props.cardImage.publicURL}
      twitterCreator={props.twitterCreator}
    />

    <main tabIndex={-1}>
      {props.children}
    </main>
  </Providers>
);
