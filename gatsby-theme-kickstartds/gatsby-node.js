const pascalCase =  require('change-case').pascalCase;

const createList = require(`./create/createList`);
const createPages = require(`./create/createPages.js`);

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
  type Query {
    collapsibleBoxComponents: [CollapsibleBoxComponent]
    contactComponents: [ContactComponent]
    countUpComponents: [CountUpComponent]
    logoTilesComponents: [LogoTilesComponent]
    quoteComponents: [QuoteComponent]
    quotesSliderComponents: [QuotesSliderComponent]
    storytellingComponents: [StorytellingComponent]
    visualSlidePreviewComponents: [VisualSlidePreviewComponent]
    visualComponents: [VisualComponent]
    visualSliderComponents: [VisualSliderComponent]
    buttonComponents: [ButtonComponent]
    contentBoxComponents: [ContentBoxComponent]
    dividerComponents: [DividerComponent]
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
    fullComponents: [Boolean]
    textMediaComponents: [TextMediaComponent]
    toggleComponents: [ToggleComponent]
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
    type: String
  }
  
  """Contact: Component to show contact information"""
  type ContactComponent implements ContentComponent {
    image: PictureComponent
  
    """Title: Name, company name, etc."""
    title: String
  
    """Subtitle: Position, profession, department, location, etc."""
    subtitle: String
  
    """Phone number"""
    phone: String
  
    """Email address"""
    email: String
  
    """Copy text"""
    copy: String
  
    """Internal type: Internal type for interface resolution"""
    type: String
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
    width__f9f3: Int
  
    """Height: Height of the picture"""
    height__b919: Int
  
    """
    Additional Classes: Add additional css classes that should be applied to the button
    """
    className__6ef8: String
  
    """Id: Add id attribute to the image"""
    id__bfb7: String
  
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
    type: String
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
  
  """Count Up: Component to to increase a number up to a final value"""
  type CountUpComponent implements ContentComponent {
    """Number: Final number to count to"""
    to: Int!
    icon: IconComponent
  
    """Topic: Topic for the count-up box. Displayed before the text, in bold"""
    topic: String
  
    """Text content: Copy text for the element"""
    text__9f33: String
    link: LinkButtonComponent
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Icon: Icon"""
  type IconComponent implements ContentComponent {
    """Icon identifier"""
    icon__3475: String
  
    """Aria role"""
    role: String
  
    """additional class"""
    className__f0c2: String
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Link Button: link-button"""
  type LinkButtonComponent implements ContentComponent {
    """Label: Text used on button"""
    label: String
  
    """Button Style: Choose one of the styles from the list"""
    variant: LinkButtonComponentVariant!
  
    """Button Size: Choose a size between small, medium and large"""
    size: LinkButtonComponentSize!
  
    """
    Additional Classes: Add additional css classes that should be applied to the button
    """
    className__6ef8: String
    icon__2933: IconComponent
  
    """Icon before button: Display icon before the button text"""
    iconBefore: Boolean
  
    """Icon after button: Display icon after the button text"""
    iconAfter: Boolean
  
    """
    'data-component' attribute: Overwrite the data-component to use for rendering
    """
    dataComponent: String
  
    """Fill Animation: Add fill animation on hover"""
    fillAnimation: Boolean
  
    """Icon Animation: Add icon animation on hover"""
    iconAnimation: Boolean
  
    """Button href?: Link used for button"""
    href: String!
  
    """Open link in new Tab: Open link in new Tab"""
    newTab: Boolean
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Button Style: Choose one of the styles from the list"""
  enum LinkButtonComponentVariant {
    solid
    solid_inverted
    clear
    clear_inverted
    outline
    outline_inverted
  }
  
  """Button Size: Choose a size between small, medium and large"""
  enum LinkButtonComponentSize {
    small
    medium
    large
  }
  
  """Logo Tiles: Component to list logos or seals"""
  type LogoTilesComponent implements ContentComponent {
    """Logos"""
    logos: [PictureComponent!]
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Quote: Component to display a rich quote"""
  type QuoteComponent implements ContentComponent {
    """Image source: Select an image to display inside the quote, to the left"""
    image__a25b: String
  
    """Text content: Copy text for the element"""
    text__b748: String
  
    """Source: Optionally display the source for the quote"""
    source: String
  
    """Date: Optionally display a date for the quote"""
    date: String
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Quotes Slider"""
  type QuotesSliderComponent implements ContentComponent {
    slides: [QuoteComponent!]
  
    """Internal type: Internal type for interface resolution"""
    type: String
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
    image__195f: StorytellingComponentImage
  
    """Text box: Text content to display"""
    box: StorytellingComponentBox!
  
    """Internal type: Internal type for interface resolution"""
    type: String
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
    type: String
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
  
  """Alignment: Choose an alignment for the headline"""
  enum HeadlineComponentAlign {
    left
    center
    right
  }
  
  """Bottom spacing: Add additional spacing to the bottom of the headline"""
  enum HeadlineComponentSpaceAfter {
    none
    small
    large
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
  
  """Box horizontal alignment: Select a horizontal alignment for the box"""
  enum StorytellingComponentBoxHAlign {
    center
    left
    right
  }
  
  """Visual Slide Preview: Visual slide preview"""
  type VisualSlidePreviewComponent implements ContentComponent {
    """Preview label: Preview label for slide in slider"""
    previewLabel: String
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Visual: visual"""
  type VisualComponent implements ContentComponent {
    """Height"""
    height: VisualComponentHeight
  
    """Media Wrapper: Wrapper for all media types"""
    media: VisualComponentMedia
  
    """Grid layer: Enable grid layer"""
    overlay: Boolean
  
    """Text box: Content and style configuration for the text box"""
    box__4bb5: VisualComponentBox
  
    """Custom background color: Custom css background color"""
    backgroundColor__7e4c: String
  
    """Inbox: The text box is in front of the image on small screens"""
    inbox: Boolean
  
    """Skip Button: Show skip button"""
    skipButton: Boolean
  
    """Additional Classes"""
    className: String
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Height"""
  enum VisualComponentHeight {
    small
    default
    fullImage
    fullScreen
  }
  
  """Media Wrapper: Wrapper for all media types"""
  type VisualComponentMedia {
    """Media Type: Choose a media type between image, video and none"""
    mode: VisualComponentMediaMode
  
    """
    Background image: Sources of background images for different screen sizes
    """
    image: VisualComponentMediaImage
  
    """
    Background video: Sources of background videos for different screen sizes
    """
    video: VisualComponentMediaVideo
  }
  
  """Media Type: Choose a media type between image, video and none"""
  enum VisualComponentMediaMode {
    image
    video
    none
  }
  
  """
  Background image: Sources of background images for different screen sizes
  """
  type VisualComponentMediaImage {
    """Mobile image source: Background image source for small screens"""
    srcMobile: String!
  
    """Tablet image source: Background image source for medium screens"""
    srcTablet: String!
  
    """Desktop image source: Background image source for large screens"""
    srcDesktop: String!
  
    """Image indent: Choose to indent the image horizontally on small screens"""
    indent: VisualComponentMediaImageIndent
  
    """Alt text: Alt text to display for picture"""
    alt: String
  }
  
  """Image indent: Choose to indent the image horizontally on small screens"""
  enum VisualComponentMediaImageIndent {
    none
    left
    right
  }
  
  """
  Background video: Sources of background videos for different screen sizes
  """
  type VisualComponentMediaVideo {
    """Mobile video source: Background video source for small screens"""
    srcMobile: String!
  
    """Tablet video source: Background video source for medium screens"""
    srcTablet: String!
  
    """Desktop video source: Background video source for large screens"""
    srcDesktop: String!
  }
  
  """Text box: Content and style configuration for the text box"""
  type VisualComponentBox {
    """Display box: Toggles visibility of the box"""
    enabled: Boolean
  
    """Headline: Text box headline"""
    headline: String
  
    """Text: Text box copy text"""
    text: String
  
    """Link: Text box link configuration"""
    link: VisualComponentBoxLink
  
    """Indent: The text box is aligned inside the content grid"""
    indent: Boolean
  
    """
    Horizontal orientation: Horizontal orientation of the box inside the keyvisual
    """
    horizontal: VisualComponentBoxHorizontal
  
    """
    Vertical orientation: Vertical orientation of the box inside the keyvisual
    """
    vertical: VisualComponentBoxVertical
  
    """Style of the box: Choose a style for the box"""
    background: VisualComponentBoxBackground
  }
  
  """Link: Text box link configuration"""
  type VisualComponentBoxLink {
    """Display Link: Toggles visibility of the link"""
    enabled: Boolean
  }
  
  """
  Horizontal orientation: Horizontal orientation of the box inside the keyvisual
  """
  enum VisualComponentBoxHorizontal {
    left
    center
    right
  }
  
  """
  Vertical orientation: Vertical orientation of the box inside the keyvisual
  """
  enum VisualComponentBoxVertical {
    top
    center
    bottom
  }
  
  """Style of the box: Choose a style for the box"""
  enum VisualComponentBoxBackground {
    default
    light
    transparent
  }
  
  """Visual Slider: Visual Slider"""
  type VisualSliderComponent implements ContentComponent {
    autoplay: Boolean
    slides__8de2: [VisualSliderComponentSlides!]
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  type VisualSliderComponentSlides {
    """Height"""
    height: VisualSliderComponentSlidesHeight
  
    """Media Wrapper: Wrapper for all media types"""
    media: VisualSliderComponentSlidesMedia
  
    """Grid layer: Enable grid layer"""
    overlay: Boolean
  
    """Text box: Content and style configuration for the text box"""
    box__4bb5: VisualSliderComponentSlidesBox
  
    """Custom background color: Custom css background color"""
    backgroundColor__7e4c: String
  
    """Inbox: The text box is in front of the image on small screens"""
    inbox: Boolean
  
    """Skip Button: Show skip button"""
    skipButton: Boolean
  
    """Additional Classes"""
    className: String
  
    """Internal type: Internal type for interface resolution"""
    type: String
  
    """Slide preview label: preview label"""
    label: String
  }
  
  """Height"""
  enum VisualSliderComponentSlidesHeight {
    small
    default
    fullImage
    fullScreen
  }
  
  """Media Wrapper: Wrapper for all media types"""
  type VisualSliderComponentSlidesMedia {
    """Media Type: Choose a media type between image, video and none"""
    mode: VisualSliderComponentSlidesMediaMode
  
    """
    Background image: Sources of background images for different screen sizes
    """
    image: VisualSliderComponentSlidesMediaImage
  
    """
    Background video: Sources of background videos for different screen sizes
    """
    video: VisualSliderComponentSlidesMediaVideo
  }
  
  """Media Type: Choose a media type between image, video and none"""
  enum VisualSliderComponentSlidesMediaMode {
    image
    video
    none
  }
  
  """
  Background image: Sources of background images for different screen sizes
  """
  type VisualSliderComponentSlidesMediaImage {
    """Mobile image source: Background image source for small screens"""
    srcMobile: String!
  
    """Tablet image source: Background image source for medium screens"""
    srcTablet: String!
  
    """Desktop image source: Background image source for large screens"""
    srcDesktop: String!
  
    """Image indent: Choose to indent the image horizontally on small screens"""
    indent: VisualSliderComponentSlidesMediaImageIndent
  
    """Alt text: Alt text to display for picture"""
    alt: String
  }
  
  """Image indent: Choose to indent the image horizontally on small screens"""
  enum VisualSliderComponentSlidesMediaImageIndent {
    none
    left
    right
  }
  
  """
  Background video: Sources of background videos for different screen sizes
  """
  type VisualSliderComponentSlidesMediaVideo {
    """Mobile video source: Background video source for small screens"""
    srcMobile: String!
  
    """Tablet video source: Background video source for medium screens"""
    srcTablet: String!
  
    """Desktop video source: Background video source for large screens"""
    srcDesktop: String!
  }
  
  """Text box: Content and style configuration for the text box"""
  type VisualSliderComponentSlidesBox {
    """Display box: Toggles visibility of the box"""
    enabled: Boolean
  
    """Headline: Text box headline"""
    headline: String
  
    """Text: Text box copy text"""
    text: String
  
    """Link: Text box link configuration"""
    link: VisualSliderComponentSlidesBoxLink
  
    """Indent: The text box is aligned inside the content grid"""
    indent: Boolean
  
    """
    Horizontal orientation: Horizontal orientation of the box inside the keyvisual
    """
    horizontal: VisualSliderComponentSlidesBoxHorizontal
  
    """
    Vertical orientation: Vertical orientation of the box inside the keyvisual
    """
    vertical: VisualSliderComponentSlidesBoxVertical
  
    """Style of the box: Choose a style for the box"""
    background: VisualSliderComponentSlidesBoxBackground
  }
  
  """Link: Text box link configuration"""
  type VisualSliderComponentSlidesBoxLink {
    """Display Link: Toggles visibility of the link"""
    enabled: Boolean
  }
  
  """
  Horizontal orientation: Horizontal orientation of the box inside the keyvisual
  """
  enum VisualSliderComponentSlidesBoxHorizontal {
    left
    center
    right
  }
  
  """
  Vertical orientation: Vertical orientation of the box inside the keyvisual
  """
  enum VisualSliderComponentSlidesBoxVertical {
    top
    center
    bottom
  }
  
  """Style of the box: Choose a style for the box"""
  enum VisualSliderComponentSlidesBoxBackground {
    default
    light
    transparent
  }
  
  """Button: Component to display links and call-to-actions"""
  type ButtonComponent implements ContentComponent {
    """Label: Text used on button"""
    label: String
  
    """Button Style: Choose one of the styles from the list"""
    variant: ButtonComponentVariant!
  
    """Button Size: Choose a size between small, medium and large"""
    size: ButtonComponentSize!
  
    """
    Additional Classes: Add additional css classes that should be applied to the button
    """
    className__6ef8: String
    icon__2933: IconComponent
  
    """Icon before button: Display icon before the button text"""
    iconBefore: Boolean
  
    """Icon after button: Display icon after the button text"""
    iconAfter: Boolean
  
    """
    'data-component' attribute: Overwrite the data-component to use for rendering
    """
    dataComponent: String
  
    """Fill Animation: Add fill animation on hover"""
    fillAnimation: Boolean
  
    """Icon Animation: Add icon animation on hover"""
    iconAnimation: Boolean
  
    """Internal type: Internal type for interface resolution"""
    type: String!
  
    """'value' attribute: Define a value attribute for the button"""
    value: String
  
    """'name' attribute: Define a name attribute for the button"""
    name: String
  
    """'disabled' attribute: Set the disabled attribute for the button"""
    disabled: Boolean
  }
  
  """Button Style: Choose one of the styles from the list"""
  enum ButtonComponentVariant {
    solid
    solid_inverted
    clear
    clear_inverted
    outline
    outline_inverted
  }
  
  """Button Size: Choose a size between small, medium and large"""
  enum ButtonComponentSize {
    small
    medium
    large
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
    image__dc48: String
  
    """Topic: Topic for the content box. Displayed before the text, in bold"""
    topic__7881: String
  
    """Text content: Text for the content box"""
    text__082a: String
  
    """Link: Content box link configuration"""
    link__360a: ContentBoxComponentLink
  
    """Internal type: Internal type for interface resolution"""
    type: String
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
  Divider: Dividers bring clarity to a layout by grouping and dividing content in close proximity.
  """
  type DividerComponent implements ContentComponent {
    """Style of the divider: Choose a variant for the divider"""
    variant__023f: DividerComponentVariant
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Style of the divider: Choose a variant for the divider"""
  enum DividerComponentVariant {
    default
    accent
    dark
  }
  
  """Lazy Lightbox Image: Lazy Lightbox Image"""
  type LightboxLazyImageComponent implements ContentComponent {
    """Thumbnail Source: Thumbnail Source"""
    thumb: String
  
    """Lightbox Image Source: Lightbox Image Source"""
    image__a266: String
  
    """Width: Width"""
    width: Int
  
    """Height: height"""
    height__8840: Int
  
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
    type: String
  }
  
  type Container {
    width__aa24: ContainerWidth
    gutter: ContainerGutter
    mode: ContainerMode
    content__2b4b: [ContainerContent!]
  }
  
  enum ContainerWidth {
    full
    max
    wide
    default
    narrow
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
  
  union ContainerContent = QuotesSliderComponent | LinkButtonComponent | ToggleComponent | ButtonComponent | TagLabelComponent | VisualComponent | QuoteComponent | VisualSliderComponent | ContactComponent | StorytellingComponent | CollapsibleBoxComponent | CountUpComponent | ContentBoxComponent | HeadlineComponent | TextMediaComponent | TeaserBoxComponent | LogoTilesComponent | TeaserRowComponent
  
  """Toggle Switch: Toggle Switch"""
  type ToggleComponent implements ContentComponent {
    """ID: Input id"""
    id__72fa: String
  
    """Name: Name"""
    name: String!
  
    """Checked: Toggle is checked"""
    checked: Boolean!
  
    """Disabled: Toggle is disabled"""
    disabled: Boolean!
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Tag Label: Component to render a pill / tag / label"""
  type TagLabelComponent implements ContentComponent {
    """Label: Text to display inside tag label"""
    label__8347: String
  
    """Size: Choose a size to scale the tag label up or down"""
    size__0e1b: TagLabelComponentSize
  
    """Link Target: Set optional href to link the tag"""
    link__88be: String
  
    """Removable: Choose whether the element is removable or not"""
    removable: Boolean
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Size: Choose a size to scale the tag label up or down"""
  enum TagLabelComponentSize {
    s
    m
    l
  }
  
  """Text Media: Component to display copy text, including media"""
  type TextMediaComponent implements ContentComponent {
    """Text content: Copy text for the element"""
    text__b748: String
  
    """Media alignment: In relation to the text content"""
    mediaAlignment: TextMediaComponentMediaAlignment!
  
    """Media: Collection of media items to display"""
    media__4c5e: [TextMediaComponentMedia!]
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Media alignment: In relation to the text content"""
  enum TextMediaComponentMediaAlignment {
    above_left
    above_center
    above_right
    beside_left
    beside_right
    intext_left
    intext_right
    below_left
    below_center
    below_right
  }
  
  union TextMediaComponentMedia = TextMediaComponentMedia0 | TextMediaComponentMedia1 | TextMediaComponentMedia2
  
  type TextMediaComponentMedia0 {
    """Video: Video item to display"""
    video: TextMediaComponentMedia0Video
    full: Boolean
  }
  
  """Video: Video item to display"""
  type TextMediaComponentMedia0Video {
    """Source: Url (mp4) for the video to display"""
    src: String!
  
    """Embedded (iframe): Use an iframe embed"""
    iframe: Boolean
  
    """Video title: Title to use for the video"""
    title: String
  
    """Width: Width of the video"""
    width: Int!
  
    """Height: Height of the video"""
    height: Int!
  }
  
  type TextMediaComponentMedia1 {
    image: PictureComponent
    full: Boolean
  }
  
  type TextMediaComponentMedia2 {
    lightboxImage: LightboxLazyImageComponent
    full: Boolean
  }
  
  """Teaser Box: Component to tease external content"""
  type TeaserBoxComponent implements ContentComponent {
    """Topic: Topic for the teaser box. Displayed before the text, in bold"""
    topic__d291: String
  
    """Text content: Text for the teaser box"""
    text__bfb6: String
  
    """Dark variant: Optionally use this to apply a dark variant to the box"""
    darkStyle: Boolean
    link__397b: TeaserBoxComponentLink
  
    """
    Image source: Select an image to display inside the teaser box, at the top
    """
    image: String
  
    """Image ratio: Choose the ratio used to crop and display the image"""
    ratio: TeaserBoxComponentRatio
  
    """Image spacing: Optionally add inner spacing to the displayed image"""
    imageSpacing: Boolean
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  type TeaserBoxComponentLink {
    """Hide link: Hides the link. The box as a whole keeps being clickable"""
    hidden: Boolean
  }
  
  """Image ratio: Choose the ratio used to crop and display the image"""
  enum TeaserBoxComponentRatio {
    VALUE_4_3
    VALUE_16_9
    VALUE_1_1
  }
  
  """Teaser Row: Component to tease external content"""
  type TeaserRowComponent implements ContentComponent {
    """Topic: Topic for the teaser box. Displayed before the text, in bold"""
    topic__d291: String
  
    """Text content: Text for the teaser box"""
    text__bfb6: String
  
    """Dark variant: Optionally use this to apply a dark variant to the box"""
    darkStyle: Boolean
    link__397b: TeaserRowComponentLink
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  type TeaserRowComponentLink {
    """Hide link: Hides the link. The box as a whole keeps being clickable"""
    hidden: Boolean
  }
  
  """Section"""
  type SectionComponent {
    width__aa24: SectionComponentWidth
    gutter: SectionComponentGutter
    mode: SectionComponentMode
    content__2b4b: [ContentComponent!]
    background: SectionComponentBackground
    spaceBefore: SectionComponentSpaceBefore
    spaceAfter: SectionComponentSpaceAfter
    headline: HeadlineComponent
  }
  
  enum SectionComponentWidth {
    full
    max
    wide
    default
    narrow
  }
  
  enum SectionComponentGutter {
    large
    default
    small
    none
  }
  
  enum SectionComponentMode {
    default
    tile
    list
  }
  
  union SectionComponentContent = QuotesSliderComponent | LinkButtonComponent | ToggleComponent | ButtonComponent | TagLabelComponent | VisualComponent | QuoteComponent | VisualSliderComponent | ContactComponent | StorytellingComponent | CollapsibleBoxComponent | CountUpComponent | ContentBoxComponent | HeadlineComponent | TextMediaComponent | TeaserBoxComponent | LogoTilesComponent | TeaserRowComponent
  
  enum SectionComponentBackground {
    default
    accent
    dark
  }
  
  enum SectionComponentSpaceBefore {
    default
    small
    none
  }
  
  enum SectionComponentSpaceAfter {
    default
    small
    none
  }
  
  """
  Arrows: Add arrows on the left and right to navigate to next or previous slide
  """
  enum Arrows {
    none
    outer
    inner
  }
  
  """Slide: Slide"""
  type Slide {
    """slide component: slide component"""
    slideComponent: String!
  
    """preview component: preview component"""
    previewComponent: String!
  
    """preview label: preview label"""
    previewLabel__99dc: String
  }
  
  """Slider: Slider"""
  type SliderComponent implements ContentComponent {
    autoplay__17e7: Boolean
    className__a697: String
    component: String
    arrows: Arrows
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  """Teaser: Component to tease external content"""
  type TeaserComponent implements ContentComponent {
    """Topic: Topic for the teaser box. Displayed before the text, in bold"""
    topic__d291: String
  
    """Text content: Text for the teaser box"""
    text__bfb6: String
  
    """Dark variant: Optionally use this to apply a dark variant to the box"""
    darkStyle: Boolean
    link__397b: TeaserComponentLink
  
    """Internal type: Internal type for interface resolution"""
    type: String
  }
  
  type TeaserComponentLink {
    """Hide link: Hides the link. The box as a whole keeps being clickable"""
    hidden: Boolean
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
