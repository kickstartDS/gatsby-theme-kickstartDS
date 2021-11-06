import React from 'react';
import GridLayout from 'react-grid-layout';

import { Visual } from "@kickstartds/content/lib/visual";

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const layout = [
  {i: 'a', x: 0, y: 0, w: 20, h: 32},
  {i: 'b', x: 21, y: 0, w: 16, h: 32},
  {i: 'c', x: 0, y: 32, w: 36, h: 60}
];

export const VisualComponentPlayground = () => (
  <GridLayout className="layout" layout={layout} cols={36} rowHeight={5} width={1300}>
    <div key="a">
      <Visual
        backgroundColor="transparent"
        height="fullImage"
        media={{
          mode: "image",
          image: {
            srcMobile: "https://picsum.photos/seed/kdsvisual/640/470",
            srcTablet: "https://picsum.photos/seed/kdsvisual/1280/840",
            srcDesktop: "https://picsum.photos/seed/kdsvisual/1920/1210",
            src: "https://picsum.photos/seed/kdsvisual/640/270",
            indent: "none",
          }
        }}
        overlay={false}
        box={{
          enabled: true,
          text: "Displaying responsive behaviour",
          background: "default",
          horizontal: "left",
          headline: {
            level: "p",
            styleAs: "h2",
            align: "left",
            spaceAfter: "none",
            pageHeader: false,
            content: "Medium Size",
          },
          link: {
            enabled: true,
            variant: "solid-inverted",
            label: "Learn more",
            size: "medium",
            href: "https://www.kickstartDS.com/",
          }
        }}
      />
    </div>
    <div key="b">
      <Visual
        backgroundColor="transparent"
        height="fullImage"
        media={{
          mode: "image",
          image: {
            srcMobile: "https://picsum.photos/seed/kdsvisual/640/470",
            srcTablet: "https://picsum.photos/seed/kdsvisual/1280/840",
            srcDesktop: "https://picsum.photos/seed/kdsvisual/1920/1210",
            src: "https://picsum.photos/seed/kdsvisual/640/270",
            indent: "none",
          }
        }}
        overlay={true}
        box={{
          enabled: true,
          text: "Displaying responsive behaviour",
          background: "default",
          horizontal: "center",
          vertical: "center",
          headline: {
            level: "p",
            styleAs: "h3",
            align: "center",
            spaceAfter: "none",
            pageHeader: false,
            content: "Small Size",
          },
          link: {
            enabled: true,
            variant: "outline-inverted",
            label: "Learn more",
            size: "small",
            href: "https://www.kickstartDS.com/",
          }
        }}
      />
    </div>
    <div key="c">
      <Visual
        backgroundColor="transparent"
        height="fullImage"
        media={{
          mode: "image",
          image: {
            srcMobile: "https://picsum.photos/seed/kdsvisual/640/470",
            srcTablet: "https://picsum.photos/seed/kdsvisual/1280/840",
            srcDesktop: "https://picsum.photos/seed/kdsvisual/1920/1210",
            src: "https://picsum.photos/seed/kdsvisual/640/270",
            indent: "none",
          }
        }}
        overlay={true}
        box={{
          enabled: true,
          text: "Displaying responsive behaviour",
          background: "light",
          horizontal: "right",
          vertical: "bottom",
          headline: {
            level: "p",
            styleAs: "h1",
            align: "left",
            spaceAfter: "none",
            pageHeader: false,
            content: "Large Size",
          },
          link: {
            enabled: true,
            variant: "solid",
            label: "Learn more",
            size: "large",
            href: "https://www.kickstartDS.com/",
          }
        }}
      />
    </div>
  </GridLayout>
);
