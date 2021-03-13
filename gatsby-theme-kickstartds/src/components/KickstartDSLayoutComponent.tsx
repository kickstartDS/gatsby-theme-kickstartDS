import { FunctionComponent } from 'react';

import { HeaderVariant1 } from "@rm-frontend/base/source/3-organisms/header/HeaderVariant1Component";
import { Footer } from "@rm-frontend/base/source/3-organisms/footer/FooterComponent";
import { IconSprite } from "./IconSpriteComponent";

// TODO those could possibly be better inlined with Gatsby itself
import "../assets/css/base.inline.css";
import "../assets/css/news.inline.css";
import "../assets/css/visuals.inline.css";

// TODO integrate `IconSprite` from generated frontend build
// TODO: inject dynamic data into keyvisual, heading
// TODO add footer data dynamically
// TODO extract and / or abstract away section / partials / templates
// TODO add `KickstertLayoutProps`
export const KickstartDSLayout: FunctionComponent<KickstartLayoutProps> = ({ children }) => (
  <>
    <HeaderVariant1 />
    <IconSprite />
    <div className="page-wrap__content">
      <main className="content-wrap" id="content" tabIndex={-1}>
        {children}
      </main>
      <a href="#🔝" className="scroll-to-top" data-component="base.scroll-to-top">
        <svg className="icon" role="img">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-arrow-up"></use>
        </svg>
      </a>
    </div>
    <Footer
      {...{  
       'footer-telephone': '+49 (0)221 12 34 56-0',
       'footer-email': 'info@example.com',
       'footer-name': 'Firmenname',
       'footer-street-address': 'Hauptstrasse 16',
       'footer-postal-code': '50987',
       'footer-address-locality': 'Hauptstadt',
       'footer-address-country': 'Deutschland',
      }}
    />
  </>
);
