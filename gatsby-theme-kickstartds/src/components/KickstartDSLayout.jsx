import React from "react";

import HeaderVariant1 from "@rm-frontend/base/source/3-organisms/header/HeaderVariant1.jsx";
import Footer from "@rm-frontend/base/source/3-organisms/footer/Footer.jsx";

import IconSprite from "./IconSprite";

import "../assets/css/base.inline.css";
import "../assets/css/base.css";
import "../assets/css/news.inline.css";
import "../assets/css/news.css";
import "../assets/css/pagination.css";
import "../assets/css/visuals.inline.css";
import "../assets/css/visuals.css";

// TODO find a solution for icon sprice (inline svg right now)
// TODO add footer data dynamically
// TODO extract and / or abstract away section / partials / templates
const KickstartLayout = ({ children }) => (
  <div>
    <HeaderVariant1 />
    <IconSprite />
    <div className="page-wrap__content">
      <main className="content-wrap" id="content" tabIndex="-1">
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
  </div>
);

export default KickstartLayout;
