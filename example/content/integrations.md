---
id: 49adb210-8028-11ec-b67b-051ab9fabaae
layout: default
slug: integrations
title: Integrations - making your interface come alive!
type: page
sections:
  - width: narrow
    spaceBefore: default
    spaceAfter: none
    className: additional-spacing-small four-grid
    type: section
    pattern: VALUE_1
    content:
      - type: text-media
        text: >-
          **Focus on the stuff that really matters**:


          While having a solid Design System is the necessary start, without projects using it this is theoretical value. This is why **kickstartDS** comes with ready-to-use integrations and adapters for a lot of common scenarios you might encounter while thinking about a project - like your main marketing site, your blog or the way you want to integrate design decisions into an automated process.
        mediaAlignment: above_center
    headline:
      type: headline
      content: Leverage rich integrations...
      subheadline: ... to ease setup and everyday tasks
      level: h1
      align: center
      styleAs: h1
      spaceAfter: large
  - width: wide
    spaceBefore: small
    spaceAfter: default
    className: additional-spacing-small four-grid
    type: section
    content:
      - type: teaser-box
        image: /img/integration/teaser/backend-teaser.svg
        ratio: VALUE_16_9
        text:
          'Adapters and plugins for headless systems: **Sanity**, **WordPress**,
          **Contentful**'
        topic: Backend
        link:
          href: '#backend'
          label: Go to
          hidden: true
          size: medium
          variant: solid
          className: ''
      - type: teaser-box
        image: /img/integration/teaser/generatoren-teaser.svg
        ratio: VALUE_16_9
        text: 'Themes, Plugins & Generators for: **Next.js**, **Gatsby**, **GraphQL**'
        topic: Generators
        link:
          href: '#generators'
          label: Go to
          hidden: true
          size: medium
          variant: solid
          className: ''
      - type: teaser-box
        image: /img/integration/teaser/design-tooling-teaser.svg
        ratio: VALUE_16_9
        text: 'Templates & Connectors for: **Style Dictionary**, **Figma**,
          **Backlight**'
        topic: Design Tooling
        link:
          href: '#designtooling'
          label: Go to
          hidden: true
          size: medium
          variant: solid
          className: ''
      - type: teaser-box
        image: /img/integration/teaser/derivatives-teaser.svg
        ratio: VALUE_16_9
        text: 'Theme converters for: **Bootstrap**, **Material UI**'
        topic: Derivatives
        link:
          href: '#derivatives'
          label: Go to
          hidden: true
          size: medium
          variant: solid
          className: ''
    headline:
      type: headline
      content: 'Jump directly to integrations for:'
      level: p
      align: left
      styleAs: h3
      spaceAfter: small
    id: ''
  - spaceBefore: default
    variant: head
    width: default
    background: accent
    headline:
      type: headline
      content: Immediate integration with your favorite CMS backend
      subheadline: ... because you shouldn't start from zero here, either
      level: h2
      align: center
      styleAs: h1
      spaceAfter: small
    spaceAfter: default
    content:
      - type: text-media
        text: >-
          **Why good integrations matter**:


          Instead of doing the legwork to setup a project with these headless CMS yourself, you can use our plugins and starters to hit the ground running... while also having your Design System automatically integrated from the get-go.
        mediaAlignment: above_center
        media:
          - type: media-image
            image:
              height: 853
              src: /img/integration/backend/backend.png
              width: 1280
    type: section
    id: backend
  - mode: list
    spaceBefore: default
    variant: body
    width: wide
    background: default
    headline:
      type: headline
      content: ''
      level: h2
      align: left
    content:
      - type: storytelling
        box:
          link:
            label: View Sanity example
            href: https://www.encore.de
            newTab: true
          headline:
            content: Sanity for structured content
            spaceAfter: small
          text:
            Sanitys approach to structured data gels really well with our way of
            creating components. The existing component **JSON Schemas** can be
            re-used with our tooling to create Sanity configurations in a
            generic way - always in sync with your Design System, without
            additional, manual overhead!
        image:
          source: /img/integration/backend/sanity.png
          order:
            desktopImageLast: false
      - type: storytelling
        box:
          link:
            label: View blog example
            href: https://www.kickstartds.com/blog
            newTab: true
          headline:
            content: WordPress for blogs
            spaceAfter: small
          text:
            WordPress shines for blog content, and many editors have a really solid
            working knowledge of it? By using WordPress in a headless way (using
            **wpgraphql**) with our **Gatsby** theme, you can leverate the
            editorial experience without losing out on a modern, performant and
            secure web stack!
        image:
          source: /img/integration/backend/wordpress.png
          order:
            desktopImageLast: true
      - type: storytelling
        box:
          link:
            label: View example
            href: https://www.kickstartds.com/glossary/typescript
            newTab: true
          headline:
            content: Marketing sites with Contentful
            spaceAfter: small
          text:
            When building bigger pages, especially those with more of a page-builder
            like marketing experience, **Contentful** is a great solution to
            empower your digital team. It's also one of the contenders offering
            deep solutions for customers with enterprise needs.
        image:
          source: /img/integration/backend/contentful.png
          order:
            desktopImageLast: false
    type: section
    gutter: none
  - spaceBefore: default
    variant: head
    width: default
    background: default
    headline:
      type: headline
      content: Generators and Jamstack
      subheadline: ... multiplying existing value
      level: h2
      align: center
      styleAs: h1
      spaceAfter: small
    inverted: true
    spaceAfter: default
    content:
      - type: text-media
        text: >-
          **What a generator can do for you**:


          Your Design System already has a really good knowledge about what a component is, how it is structured and how it behaves. We use that knowledge to provide a **Gatsby theme**, that already includes everything a website needs (for SEO, performance, etc). We even already have transformers for that theme for **WordPress**, **Netlify CMS**, **Contentful**, **MDX**. And if you're using **Next.js** we have some plugins to use your components in a performant way there too, without writing glue code yourself.


          Finally: being able to use our **GraphQL** tooling to generate TypeScript types for your components and GraphQL types and fragments for usage in **Gatsby** and **Next**, all while including component documentation automatically.
        mediaAlignment: above_center
        media:
          - type: media-image
            image:
              height: 853
              src: /img/integration/generatoren/generatoren.png
              width: 1280
    type: section
    id: generators
  - mode: list
    spaceBefore: none
    variant: body
    width: wide
    background: accent
    headline:
      type: headline
      content: ''
      level: h2
      align: left
    inverted: true
    content:
      - type: storytelling
        box:
          link:
            href: https://nextjs.org
            label: Learn about Next.js
            variant: solid-inverted
            newTab: true
          headline:
            content: Plugin and starter for Next.js
            spaceAfter: small
          text:
            Use our starter to have a project running in mere minutes, or use our
            plugins directly to configure everything the way you like... while
            still profiting from work already done. All components are
            completely SSR-compatible, too.
        image:
          source: /img/integration/generatoren/nextjs.png
          order:
            desktopImageLast: false
      - type: storytelling
        box:
          link:
            href: https://www.gatsbyjs.com
            label: Learn about Gatsby
            variant: solid-inverted
            newTab: true
          headline:
            content: Complete Gatsby theme
            spaceAfter: small
          text:
            "Our theme automates everything related to rendering your frontend (SEO,
            performance, etc), while also providing a common interface to
            implement your own transformers and resolvers. Or you just re-use
            one of those we've already written for: **WordPress**, **Netlify
            CMS**, **Contentful**, **MDX**"
        image:
          source: /img/integration/generatoren/gatsby.png
          order:
            desktopImageLast: true
      - type: storytelling
        box:
          link:
            href: https://graphql.org/
            label: Learn about GraphQL
            variant: solid-inverted
            newTab: true
          headline:
            content: GraphQL types and fragments
            spaceAfter: small
          text: Based on our component API we have tooling (based on [GraphQL
            Tools](https://www.graphql-tools.com/)) to automatically generate
            types and fragments for **GraphQL**. This can be the perfect
            building block to creating your shared API between frontend and
            backend, and, for example, powers the core of our **Gatsby theme**.
        image:
          source: /img/integration/generatoren/graphql.png
          order:
            desktopImageLast: false
    type: section
    gutter: none
  - spaceBefore: default
    variant: head
    width: default
    background: accent
    headline:
      type: headline
      content: Connect to Design Tooling
      subheadline: ... to help bridge the dev-design divide
      level: h2
      align: center
      styleAs: h1
      spaceAfter: large
    spaceAfter: default
    content:
      - type: text-media
        text: >-
          **How Design Tokens enable better processes**:


          Tokens are the perfect starting ground when establishing shared processes and responsibilities between designers and developers, as they encode the most atomic design decisions of your Design System. Connecting design tools like **Figma** through **Style Dictionary**, or using complementary services to manage your Design System like **Backlight**, helps set up a baseline for your team, without requiring you to do everything by yourself!
        mediaAlignment: above_center
        media:
          - type: media-image
            image:
              height: 853
              src: /img/integration/design-tooling/design-tooling.png
              width: 1280
    type: section
    id: designtooling
  - mode: list
    spaceBefore: none
    variant: body
    width: wide
    background: default
    headline:
      type: headline
      content: ''
      level: h2
      align: left
    content:
      - type: storytelling
        box:
          link:
            href: https://amzn.github.io/style-dictionary
            label: Learn about Style Dictionary
            newTab: true
          headline:
            content: Style Dictionary
            spaceAfter: small
          text:
            '**Style Dictionary** is a tool developed by **Amazon** to help with
            establishing a dependable structure for your **Design Tokens**. This
            includes defining them in a well-defined way (JSON) and then
            converting them to different target formats: **CSS Properties**,
            **iOS definitions** or **themes**. All our tokens are defined in a
            **Style Dictionary**.'
        image:
          source: /img/integration/design-tooling/styledictionary.png
          order:
            desktopImageLast: false
      - type: storytelling
        box:
          link:
            href: https://www.figma.com/file/H7F4P2fsDgEkIcc7U1alk1/kickstartDS-Design-Tokens
            label: View our Design Token template
            newTab: true
          headline:
            content: Figma
            spaceAfter: small
          text:
            '**Figma** is currently taking the design space by storm. We offer a
            **Figma** template with all our semantic **Design Tokens** encoded
            in a visual way. You can even change values in **Figma**, and use
            one of our connectors to integrate them back into your code base
            automatically... for example as part of your **CI/CD**'
        image:
          source: /img/integration/design-tooling/figma.png
          order:
            desktopImageLast: true
      - type: storytelling
        box:
          link:
            href: https://backlight.dev/
            label: Learn about Backlight
            newTab: true
          headline:
            content: Backlight
            spaceAfter: small
          text:
            '**Backlight** can function as your teams whole-in-one platform for Design
            System management / **DesignOps**. **kickstartDS** is wholly
            compatible with **Backlight**, and its features like the **Style
            Dictionary** integration, bundling and packaging, etc. You can even
            use our starter to cut even more corners in getting your first
            Design System release live!.'
        image:
          source: /img/integration/design-tooling/backlight.png
          order:
            desktopImageLast: false
    type: section
    gutter: none
  - variant: body
    spaceBefore: default
    background: accent
    spaceAfter: none
    align: center
    type: section
    content:
      - type: text-media
        mediaAlignment: above_center
        text:
          Storybook is the de-facto standard for writing high-quality, isolated
          components. This is why we've not only invested a lot of time on
          making sure that everything between kickstartDS and Storybook
          integrates as nicely as possible, but also already written two addons
          ourselves!
        media:
          - type: media-image
            image:
              height: 300
              lazy: true
              noscript: true
              src: /images/logo_storybook-large.svg
              type: picture
              width: 300
    headline:
      type: headline
      content: Integration with
      level: h2
      align: center
  - background: accent
    spaceBefore: small
    width: default
    type: section
    content:
      - type: content-box
        topic: Controls
        text:
          Interact with our rich component API through automatically configured
          Storybook controls.
        link:
          href: https://storybook.js.org/docs/react/essentials/controls
          label: Check out controls
        image: /images/storybook_controls.svg
      - type: content-box
        topic: Tokens
        text:
          View and change component tokens directly in Storybook with our own
          Storybook addon.
        link:
          href: https://storybook.js.org/addons/@kickstartds/storybook-addon-component-tokens/
          label: Go to addon
        image: /images/storybook_tokens.svg
      - type: content-box
        topic: Composition
        text:
          We enable Storybook composition, meaning you'll always get our docs inside
          your Storybooks.
        link:
          href: https://storybook.js.org/docs/react/sharing/storybook-composition
          label: View compositions
        image: /images/storybook_composition.svg
      - type: content-box
        topic: JSON Schema
        text:
          Inspect the JSON Schema defining the component APIs, or change values with
          typed auto-complete.
        link:
          href: https://storybook.js.org/addons/@kickstartds/storybook-addon-jsonschema
          label: Try it out
        image: /images/storybook_json-schema.svg
    headline:
      type: headline
      content: ''
      level: h2
      align: left
  - spaceBefore: default
    variant: head
    width: default
    background: default
    headline:
      type: headline
      content: Derivatives
      subheadline: ... generate low-code integration points
      level: h2
      align: center
      styleAs: h1
      spaceAfter: large
    inverted: true
    spaceAfter: default
    content:
      - type: text-media
        text: Re-use your tokens to generate themes for other frameworks and libraries.
        mediaAlignment: above_center
        media:
          - type: media-image
            image:
              height: 853
              src: /img/integration/derivatives/derivatives.png
              width: 1280
    type: section
    id: derivatives
  - mode: list
    spaceBefore: none
    variant: body
    width: wide
    background: accent
    headline:
      type: headline
      content: ''
      level: h2
      align: left
    inverted: true
    content:
      - type: storytelling
        box:
          link:
            href: https://getbootstrap.com/docs/4.1/getting-started/theming/
            label: Learn about Bootstrap themes
            variant: solid-inverted
            newTab: true
          headline:
            content: Bootstrap
            spaceAfter: small
          text:
            Generate a **Bootstrap** theme automatically, based on our semantic
            **Design Tokens** by utilizing the **Style Dictionary** integration.
            Themes can be a great way to achieve a 80% solution immediately; and
            build from there.
        image:
          source: /img/integration/derivatives/bootstrap.png
          order:
            desktopImageLast: false
      - type: storytelling
        box:
          link:
            href: https://mui.com/material-ui/customization/theming/
            label: Learn about Material UI themes
            variant: solid-inverted
            newTab: true
          headline:
            content: Material UI / MUI
            spaceAfter: small
          text:
            As with the **Bootstrap** theme, it makes a lot of sense to leverage your
            existing **Design Tokens** and our **Style Dictionary**
            configuration to automatically generate a fitting **Material UI /
            MUI** theme, even as part of your connected CI/CD in a continuous
            way!
        image:
          source: /img/integration/derivatives/materialui.png
          order:
            desktopImageLast: true
    type: section
    gutter: none
---
