const pascalCase =  require('change-case').pascalCase;

const createList = require(`./create/createList`);
const createPages = require(`./create/createPages`);

exports.createPages = async (props) => {
  // await createList(props);
  await createPages(props);
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const contentInterface = schema.buildInterfaceType({
    name: `ContentComponent`,
    fields: {
      type: 'String',
    },
    resolveType: value => `${pascalCase(value.type)}Component`,
  })

  createTypes([`
    """
    Arrows: Add arrows on the left and right to navigate to next or previous slide
    """
    enum Arrows {
      none
      outer
      inner
    }
    
    """Button: Component to display links and call-to-actions"""
    type ButtonComponent implements ContentComponent {
      """'type' attribute: Select the type attribute for the button"""
      type: ButtonComponentType!
    
      """'value' attribute: Define a value attribute for the button"""
      value: String
    
      """'name' attribute: Define a name attribute for the button"""
      name: String
    
      """'disabled' attribute: Set the disabled attribute for the button"""
      disabled: Boolean
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """'type' attribute: Select the type attribute for the button"""
    enum ButtonComponentType {
      button
      submit
      reset
    }
    
    """Collapsible Box: Component to conditionally show additional info"""
    type CollapsibleBoxComponent implements ContentComponent {
      """
      Summary text for the collapsible: Include the text for the collapsible that should be visible before opening
      """
      summary: String!
    
      """
      Content of the collapsible: Include the text for the collapsible that should be visible after opening
      """
      text: String!
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    type Container implements ContentComponent {
      width: ContainerWidth
      gutter: ContainerGutter
      mode: ContainerMode
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    enum ContainerGutter {
      large
      default
      small
      none
    }
    
    enum ContainerMode {
      default
      tile
      list
    }
    
    enum ContainerWidth {
      full
      max
      wide
      default
      narrow
    }
    
    """Content Box: Component to display content in a condensed, boxed form"""
    type ContentBoxComponent implements ContentComponent {
      """
      Image ratio: Choose one of the set ratios, all ratios except 'none' stretch the image to 100% width
      """
      ratio: ContentBoxComponentRatio!
    
      """
      Alignment: Choose an alignment for the box. For the image it only applies for a 'ratio' value of 'none'
      """
      alignement: ContentBoxComponentAlignement!
    
      """
      Image source: Select an image to display inside the content box, at the top
      """
      image: String
    
      """Topic: Topic for the content box. Displayed before the text, in bold"""
      topic: String
    
      """Text content: Text for the content box"""
      text: String
    
      """Link: Content box link configuration"""
      link: ContentBoxComponentLink
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """
    Alignment: Choose an alignment for the box. For the image it only applies for a 'ratio' value of 'none'
    """
    enum ContentBoxComponentAlignement {
      left
      center
      right
    }
    
    """Link: Content box link configuration"""
    type ContentBoxComponentLink {
      """Display link: Toggles visibility of the link"""
      enabled: Boolean
    }
    
    """
    Image ratio: Choose one of the set ratios, all ratios except 'none' stretch the image to 100% width
    """
    enum ContentBoxComponentRatio {
      none
      VALUE_4_3
      VALUE_16_9
      VALUE_1_1
    }
    
    """Count Up: Component to to increase a number up to a final value"""
    type CountUpComponent implements ContentComponent {
      """Number: Final number to count to"""
      to: Int!
      icon: IconComponent
    
      """Topic: Topic for the count-up box. Displayed before the text, in bold"""
      topic: String
    
      """Text content: Copy text for the element"""
      text: String
      link: LinkButtonComponent
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Headline: Headline"""
    type HeadlineComponent implements ContentComponent {
      """Level: Select the headline level to use, or p alternatively"""
      level: HeadlineComponentLevel!
    
      """Alignment: Choose an alignment for the headline"""
      align: HeadlineComponentAlign!
    
      """Text: Text content for the headline"""
      content: String
    
      """Subheadline: Text content for the optional subheadline"""
      subheadline: String
    
      """Bottom spacing: Add additional spacing to the bottom of the headline"""
      spaceAfter: HeadlineComponentSpaceAfter!
    
      """
      Page header: Set the headline as a page header, triggering special css treatment
      """
      pageHeader: Boolean
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Alignment: Choose an alignment for the headline"""
    enum HeadlineComponentAlign {
      left
      center
      right
    }
    
    """Level: Select the headline level to use, or p alternatively"""
    enum HeadlineComponentLevel {
      h1
      h2
      h3
      h4
      h5
      p
    }
    
    """Bottom spacing: Add additional spacing to the bottom of the headline"""
    enum HeadlineComponentSpaceAfter {
      none
      small
      large
    }
    
    """Icon: Icon"""
    type IconComponent implements ContentComponent {
      """Icon identifier"""
      icon: String
    
      """Aria role"""
      role: String
    
      """additional class"""
      className: String
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Lazy Lightbox Image: Lazy Lightbox Image"""
    type LightboxLazyImageComponent implements ContentComponent {
      """Thumbnail Source: Thumbnail Source"""
      thumb: String
    
      """Lightbox Image Source: Lightbox Image Source"""
      image: String
    
      """Width: Width"""
      width: Int
    
      """Height: height"""
      height: Int
    
      """Hover Zoom Icon: Hover Zoom Icon"""
      zoomIcon: Boolean
    
      """Caption: Caption"""
      caption: String
    
      """Hide caption visually: Hide caption visually"""
      hideCaption: Boolean
    
      """Gallery identifier: Gallery identifier"""
      gallery: String
    
      """ID: ID"""
      id: String
    
      """Additional Image Class: Additional Image Class"""
      class: String
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Link Button: link-button"""
    type LinkButtonComponent implements ContentComponent {
      """Button href?: Link used for button"""
      href: String!
    
      """Open link in new Tab: Open link in new Tab"""
      newTab: Boolean
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Picture: Base component to display a picture"""
    type PictureComponent implements ContentComponent {
      """Source: Picture source"""
      src: String
    
      """Picture sourceset: Use a srcSet to display picture"""
      srcSet: String
    
      """Alt text: Alt text to display for picture"""
      alt: String
    
      """Width: Width of the picture"""
      width: Int
    
      """Height: Height of the picture"""
      height: Int
    
      """
      Additional Classes: Add additional css classes that should be applied to the button
      """
      className: String
    
      """Id: Add id attribute to the image"""
      id: String
    
      """'itemprop' attribute: Define an itemprop attribute for the picture"""
      itemProp: String
    
      """'style' attribute: Define a style attribute for the picture"""
      style: String
    
      """Object fit: Select a value for the picture object fit"""
      objectFit: PictureComponentObjectFit
    
      """Noscript: Render noscript fallback"""
      noscript: Boolean
    
      """Lazy: Load the picture lazily"""
      lazy: Boolean
    
      """Sources: Additional sources. This will result in a 'picture'-Element"""
      sources: [PictureComponentSources!]
    
      """'class' attribute: Set additional class(es) to the picture"""
      pictureClassName: String
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Object fit: Select a value for the picture object fit"""
    enum PictureComponentObjectFit {
      contain
      cover
      fill
      none
      scale_down
    }
    
    type PictureComponentSources {
      """Picture sourceset: Use a srcSet to display picture"""
      srcSet: String
    
      """TODO MEDIA TITLE: TODO MEDIA DESCRIPTION"""
      media: String
    
      """TODO TYPE TITLE: TODO TYPE DESCRIPTION"""
      type: String
    }
    
    type Query {
      collapsibleBoxComponents: [CollapsibleBoxComponent]
      countUpComponents: [CountUpComponent]
      quotesSliderComponents: [QuotesSliderComponent]
      quoteComponents: [QuoteComponent]
      visualSlidePreviewComponents: [VisualSlidePreviewComponent]
      storytellingComponents: [StorytellingComponent]
      visualSliderComponents: [VisualSliderComponent]
      buttonComponents: [ButtonComponent]
      contentBoxComponents: [ContentBoxComponent]
      headlineComponents: [HeadlineComponent]
      iconComponents: [IconComponent]
      lightboxLazyImageComponents: [LightboxLazyImageComponent]
      linkButtonComponents: [LinkButtonComponent]
      pictureComponents: [PictureComponent]
      containerComponents: [Container]
      sectionComponents: [SectionComponent]
      autoplayComponents: [Boolean]
      classNameComponents: [String]
      componentComponents: [String]
      arrowsComponents: [Arrows]
      slideComponents: [Slide]
      sliderComponents: [SliderComponent]
      tagLabelComponents: [TagLabelComponent]
      teaserComponents: [TeaserComponent]
      teaserBoxComponents: [TeaserBoxComponent]
      teaserRowComponents: [TeaserRowComponent]
      toggleComponents: [ToggleComponent]
    }
    
    """Quote: Component to display a rich quote"""
    type QuoteComponent implements ContentComponent {
      """Image source: Select an image to display inside the quote, to the left"""
      image: String
    
      """Text content: Copy text for the element"""
      text: String!
    
      """Source: Optionally display the source for the quote"""
      source: String
    
      """Date: Optionally display a date for the quote"""
      date: String
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Quotes Slider"""
    type QuotesSliderComponent implements ContentComponent {
      slides: [QuoteComponent!]
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Section"""
    type SectionComponent {
      background: SectionComponentBackground
      spaceBefore: SectionComponentSpaceBefore
      spaceAfter: SectionComponentSpaceAfter
      headline: HeadlineComponent
      content: [ContentComponent]
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    enum SectionComponentBackground {
      default
      accent
      dark
    }
    
    enum SectionComponentSpaceAfter {
      default
      small
      none
    }
    
    enum SectionComponentSpaceBefore {
      default
      small
      none
    }
    
    """Slide: Slide"""
    type Slide implements ContentComponent {
      """slide component: slide component"""
      slideComponent: String!
    
      """preview component: preview component"""
      previewComponent: String!
    
      """preview label: preview label"""
      previewLabel: String!
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Slider: Slider"""
    type SliderComponent implements ContentComponent {
      autoplay: Boolean
      className: String
      component: String
      arrows: Arrows
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """
    Storytelling: Component to present rich combinations of text and media, best used sequentially
    """
    type StorytellingComponent implements ContentComponent {
      """Background image: Background image for the whole element"""
      backgroundImage: String
    
      """Background color: Background color for the whole element"""
      backgroundColor: String
    
      """Full size image: Display a full sized version of the image"""
      full: Boolean
    
      """Image: Image displayed alongside the text content"""
      image: StorytellingComponentImage!
    
      """Text box: Text content to display"""
      box: StorytellingComponentBox!
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Text box: Text content to display"""
    type StorytellingComponentBox {
      headline: HeadlineComponent
    
      """Text: Text content to display inside the element"""
      text: String
    
      """Text alignment: Switch text alignment between left and center"""
      textAlign: StorytellingComponentBoxTextAlign
    
      """Text color: Overwrite the color to use for the text content"""
      textColor: String
    
      """Box vertical alignment: Select a vertical alignment for the box"""
      vAlign: StorytellingComponentBoxVAlign
    
      """Box horizontal alignment: Select a horizontal alignment for the box"""
      hAlign: StorytellingComponentBoxHAlign
      link: LinkButtonComponent
    }
    
    """Box horizontal alignment: Select a horizontal alignment for the box"""
    enum StorytellingComponentBoxHAlign {
      center
      left
      right
    }
    
    """Text alignment: Switch text alignment between left and center"""
    enum StorytellingComponentBoxTextAlign {
      left
      center
    }
    
    """Box vertical alignment: Select a vertical alignment for the box"""
    enum StorytellingComponentBoxVAlign {
      center
      top
      bottom
    }
    
    """Image: Image displayed alongside the text content"""
    type StorytellingComponentImage {
      """Image source: Image source to use"""
      source: String
    
      """
      Image aspect ratio: Select an aspect ratio to use for cropping and displaying the image
      """
      ratio: StorytellingComponentImageRatio
    
      """Image vertical alignment: Select a vertical alignment for the image"""
      vAlign: StorytellingComponentImageVAlign
    
      """
      Image horizontal alignment: Select a horizontal alignment for the image
      """
      hAlign: StorytellingComponentImageHAlign
    
      """Order: Choose what comes first on mobile and desktop: image or text"""
      order: StorytellingComponentImageOrder
    }
    
    """
    Image horizontal alignment: Select a horizontal alignment for the image
    """
    enum StorytellingComponentImageHAlign {
      center
      left
      left_edge
      right
      right_edge
    }
    
    """Order: Choose what comes first on mobile and desktop: image or text"""
    type StorytellingComponentImageOrder {
      """
      Mobile image after text: Switch to displaying the image after the text on mobile
      """
      mobileImageLast: Boolean
    
      """
      Desktop image after text: Switch to displaying the image after the text on desktop
      """
      desktopImageLast: Boolean
    }
    
    """
    Image aspect ratio: Select an aspect ratio to use for cropping and displaying the image
    """
    enum StorytellingComponentImageRatio {
      VALUE_4_3
      VALUE_3_2
      VALUE_16_9
      VALUE_1_1
      none
    }
    
    """Image vertical alignment: Select a vertical alignment for the image"""
    enum StorytellingComponentImageVAlign {
      center
      top
      top_edge
      bottom
      bottom_edge
    }
    
    """Tag Label: Component to render a pill / tag / label"""
    type TagLabelComponent implements ContentComponent {
      """Label: Text to display inside tag label"""
      label: String!
    
      """Size: Choose a size to scale the tag label up or down"""
      size: TagLabelComponentSize!
    
      """Link Target: Set optional href to link the tag"""
      link: String
    
      """Removable: Choose whether the element is removable or not"""
      removable: Boolean
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Size: Choose a size to scale the tag label up or down"""
    enum TagLabelComponentSize {
      s
      m
      l
    }
    
    """Teaser Box: Component to tease external content"""
    type TeaserBoxComponent implements ContentComponent {
      """
      Image source: Select an image to display inside the teaser box, at the top
      """
      image: String
    
      """Image ratio: Choose the ratio used to crop and display the image"""
      ratio: TeaserBoxComponentRatio
    
      """Image spacing: Optionally add inner spacing to the displayed image"""
      imageSpacing: Boolean
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Image ratio: Choose the ratio used to crop and display the image"""
    enum TeaserBoxComponentRatio {
      VALUE_4_3
      VALUE_16_9
      VALUE_1_1
    }
    
    """Teaser: Component to tease external content"""
    type TeaserComponent implements ContentComponent {
      internalType: String
      _empty: String
    }
    
    """Teaser Row: Component to tease external content"""
    type TeaserRowComponent implements ContentComponent {
      internalType: String
      _empty: String
    }
    
    """Toggle Switch: Toggle Switch"""
    type ToggleComponent implements ContentComponent {
      """ID: Input id"""
      id: String!
    
      """Name: Name"""
      name: String!
    
      """Checked: Toggle is checked"""
      checked: Boolean!
    
      """Disabled: Toggle is disabled"""
      disabled: Boolean!
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Visual Slide Preview: Visual slide preview"""
    type VisualSlidePreviewComponent implements ContentComponent {
      """Preview label: Preview label for slide in slider"""
      previewLabel: String
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    """Visual Slider: Visual Slider"""
    type VisualSliderComponent implements ContentComponent {
      autoplay: Boolean
      slides: [VisualSliderComponentSlides!]!
    
      """Internal type: Internal type for interface resolution"""
      internalType: String
    }
    
    type VisualSliderComponentSlides {
      """Slide preview label: preview label"""
      label: String
    }  

    interface KickstartDsPage implements Node {
      id: ID!
      layout: String!
      heading: String!
      description: String
      title: String
      date: Date @dateformat
      content: [SectionComponent]
    }
  `, contentInterface]);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};
