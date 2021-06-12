import { graphql } from "gatsby";

// THIS FILE HAS BEEN AUTO-GENERATED BY "@kickstartds/graphql-cli-generate-fragments"
// DO NOT EDIT THIS FILE DIRECTLY

export const CollapsibleBoxComponentFragment = graphql`fragment CollapsibleBoxComponent on CollapsibleBoxComponent {
  summary
  text
  type
}
`

export const ContactComponentFragment = graphql`fragment ContactComponent on ContactComponent {
  image {
    ...PictureComponentNoNesting
  }
  title
  subtitle
  phone
  email
  copy
  type
}
`

export const PictureComponentFragment = graphql`fragment PictureComponent on PictureComponent {
  src
  srcSet
  alt
  width__f9f3
  height__b919
  className__6ef8
  id__bfb7
  itemProp
  style
  objectFit
  noscript
  lazy
  sources {
    ...PictureComponentSourcesNoNesting
  }
  pictureClassName
  type
}
`

export const PictureComponentSourcesFragment = graphql`fragment PictureComponentSources on PictureComponentSources {
  srcSet
  media
  type
}
`

export const CountUpComponentFragment = graphql`fragment CountUpComponent on CountUpComponent {
  to
  icon {
    ...IconComponentNoNesting
  }
  topic
  text__9f33
  link {
    ...LinkButtonComponentNoNesting
  }
  type
}
`

export const IconComponentFragment = graphql`fragment IconComponent on IconComponent {
  icon__3475
  role
  className__f0c2
  type
}
`

export const LinkButtonComponentFragment = graphql`fragment LinkButtonComponent on LinkButtonComponent {
  label__af11
  variant__01a5
  size__e9b8
  className__6ef8
  icon__2933 {
    ...IconComponentNoNesting
  }
  iconBefore__e7bb
  iconAfter__be45
  dataComponent__0568
  fillAnimation__79a7
  iconAnimation__0d39
  href
  newTab
  type
}
`

export const LogoTilesComponentFragment = graphql`fragment LogoTilesComponent on LogoTilesComponent {
  logos {
    ...PictureComponentNoNesting
  }
  type
}
`

export const QuoteComponentFragment = graphql`fragment QuoteComponent on QuoteComponent {
  image__a25b
  text__b748
  source
  date
  type
}
`

export const QuotesSliderComponentFragment = graphql`fragment QuotesSliderComponent on QuotesSliderComponent {
  slides {
    ...QuoteComponentNoNesting
  }
  type
}
`

export const StorytellingComponentFragment = graphql`fragment StorytellingComponent on StorytellingComponent {
  backgroundImage
  backgroundColor
  full
  image__195f {
    ...StorytellingComponentImageNoNesting
  }
  box {
    ...StorytellingComponentBoxNoNesting
  }
  type
}
`

export const StorytellingComponentImageFragment = graphql`fragment StorytellingComponentImage on StorytellingComponentImage {
  source
  ratio
  vAlign
  hAlign
  order {
    ...StorytellingComponentImageOrderNoNesting
  }
}
`

export const StorytellingComponentImageOrderFragment = graphql`fragment StorytellingComponentImageOrder on StorytellingComponentImageOrder {
  mobileImageLast
  desktopImageLast
}
`

export const StorytellingComponentBoxFragment = graphql`fragment StorytellingComponentBox on StorytellingComponentBox {
  headline {
    ...HeadlineComponentNoNesting
  }
  text
  textAlign
  textColor
  vAlign
  hAlign
  link {
    ...LinkButtonComponentNoNesting
  }
}
`

export const HeadlineComponentFragment = graphql`fragment HeadlineComponent on HeadlineComponent {
  level
  align
  content
  subheadline
  spaceAfter
  pageHeader
  type
}
`

export const VisualSlidePreviewComponentFragment = graphql`fragment VisualSlidePreviewComponent on VisualSlidePreviewComponent {
  previewLabel
  type
}
`

export const VisualComponentFragment = graphql`fragment VisualComponent on VisualComponent {
  height
  media {
    ...VisualComponentMediaNoNesting
  }
  overlay
  box__4bb5 {
    ...VisualComponentBoxNoNesting
  }
  backgroundColor__7e4c
  inbox
  skipButton
  className
  type
}
`

export const VisualComponentMediaFragment = graphql`fragment VisualComponentMedia on VisualComponentMedia {
  mode
  image {
    ...VisualComponentMediaImageNoNesting
  }
  video {
    ...VisualComponentMediaVideoNoNesting
  }
}
`

export const VisualComponentMediaImageFragment = graphql`fragment VisualComponentMediaImage on VisualComponentMediaImage {
  srcMobile
  srcTablet
  srcDesktop
  indent
  alt
}
`

export const VisualComponentMediaVideoFragment = graphql`fragment VisualComponentMediaVideo on VisualComponentMediaVideo {
  srcMobile
  srcTablet
  srcDesktop
}
`

export const VisualComponentBoxFragment = graphql`fragment VisualComponentBox on VisualComponentBox {
  enabled
  headline
  text
  link {
    ...VisualComponentBoxLinkNoNesting
  }
  indent
  horizontal
  vertical
  background
}
`

export const VisualComponentBoxLinkFragment = graphql`fragment VisualComponentBoxLink on VisualComponentBoxLink {
  enabled
}
`

export const VisualSliderComponentFragment = graphql`fragment VisualSliderComponent on VisualSliderComponent {
  autoplay
  slides__8de2 {
    ...VisualSliderComponentSlidesNoNesting
  }
  type
}
`

export const VisualSliderComponentSlidesFragment = graphql`fragment VisualSliderComponentSlides on VisualSliderComponentSlides {
  height
  media {
    ...VisualSliderComponentSlidesMediaNoNesting
  }
  overlay
  box__4bb5 {
    ...VisualSliderComponentSlidesBoxNoNesting
  }
  backgroundColor__7e4c
  inbox
  skipButton
  className
  type
  label
}
`

export const VisualSliderComponentSlidesMediaFragment = graphql`fragment VisualSliderComponentSlidesMedia on VisualSliderComponentSlidesMedia {
  mode
  image {
    ...VisualSliderComponentSlidesMediaImageNoNesting
  }
  video {
    ...VisualSliderComponentSlidesMediaVideoNoNesting
  }
}
`

export const VisualSliderComponentSlidesMediaImageFragment = graphql`fragment VisualSliderComponentSlidesMediaImage on VisualSliderComponentSlidesMediaImage {
  srcMobile
  srcTablet
  srcDesktop
  indent
  alt
}
`

export const VisualSliderComponentSlidesMediaVideoFragment = graphql`fragment VisualSliderComponentSlidesMediaVideo on VisualSliderComponentSlidesMediaVideo {
  srcMobile
  srcTablet
  srcDesktop
}
`

export const VisualSliderComponentSlidesBoxFragment = graphql`fragment VisualSliderComponentSlidesBox on VisualSliderComponentSlidesBox {
  enabled
  headline
  text
  link {
    ...VisualSliderComponentSlidesBoxLinkNoNesting
  }
  indent
  horizontal
  vertical
  background
}
`

export const VisualSliderComponentSlidesBoxLinkFragment = graphql`fragment VisualSliderComponentSlidesBoxLink on VisualSliderComponentSlidesBoxLink {
  enabled
}
`

export const ButtonComponentFragment = graphql`fragment ButtonComponent on ButtonComponent {
  label__469a
  variant__de9b
  size__5795
  className__6ef8
  icon__2933 {
    ...IconComponentNoNesting
  }
  iconBefore__6278
  iconAfter__ee88
  dataComponent__14e4
  fillAnimation__6127
  iconAnimation__6af4
  typeAttr
  value
  name__07bb
  disabled__5a87
  type
}
`

export const ContentBoxComponentFragment = graphql`fragment ContentBoxComponent on ContentBoxComponent {
  ratio
  alignement
  image__dc48
  topic__7881
  text__082a
  link__360a {
    ...ContentBoxComponentLinkNoNesting
  }
  type
}
`

export const ContentBoxComponentLinkFragment = graphql`fragment ContentBoxComponentLink on ContentBoxComponentLink {
  enabled
}
`

export const DividerComponentFragment = graphql`fragment DividerComponent on DividerComponent {
  variant__023f
  type
}
`

export const LightboxLazyImageComponentFragment = graphql`fragment LightboxLazyImageComponent on LightboxLazyImageComponent {
  thumb
  image__a266
  width
  height__8840
  zoomIcon
  caption
  hideCaption
  gallery
  id
  class
  type
}
`

export const ContainerFragment = graphql`fragment Container on Container {
  width__aa24
  gutter
  mode
  content__2b4b {
    ...QuotesSliderComponentNoNesting,
    ...LinkButtonComponentNoNesting,
    ...ToggleComponentNoNesting,
    ...ButtonComponentNoNesting,
    ...TagLabelComponentNoNesting,
    ...VisualComponentNoNesting,
    ...QuoteComponentNoNesting,
    ...VisualSliderComponentNoNesting,
    ...ContactComponentNoNesting,
    ...StorytellingComponentNoNesting,
    ...CollapsibleBoxComponentNoNesting,
    ...CountUpComponentNoNesting,
    ...ContentBoxComponentNoNesting,
    ...HeadlineComponentNoNesting,
    ...TextMediaComponentNoNesting,
    ...TeaserBoxComponentNoNesting,
    ...LogoTilesComponentNoNesting,
    ...TeaserRowComponentNoNesting
  }
}
`

export const ToggleComponentFragment = graphql`fragment ToggleComponent on ToggleComponent {
  id__72fa
  name
  checked
  disabled
  type
}
`

export const TagLabelComponentFragment = graphql`fragment TagLabelComponent on TagLabelComponent {
  label__8347
  size__0e1b
  link__88be
  removable
  type
}
`

export const TextMediaComponentFragment = graphql`fragment TextMediaComponent on TextMediaComponent {
  text__b748
  mediaAlignment
  media__4c5e {
    ...TextMediaComponentMedia0NoNesting,
    ...TextMediaComponentMedia1NoNesting,
    ...TextMediaComponentMedia2NoNesting
  }
  type
}
`

export const TextMediaComponentMedia0Fragment = graphql`fragment TextMediaComponentMedia0 on TextMediaComponentMedia0 {
  video {
    ...TextMediaComponentMedia0VideoNoNesting
  }
  full
}
`

export const TextMediaComponentMedia0VideoFragment = graphql`fragment TextMediaComponentMedia0Video on TextMediaComponentMedia0Video {
  src
  iframe
  title
  width
  height
}
`

export const TextMediaComponentMedia1Fragment = graphql`fragment TextMediaComponentMedia1 on TextMediaComponentMedia1 {
  image {
    ...PictureComponentNoNesting
  }
  full
}
`

export const TextMediaComponentMedia2Fragment = graphql`fragment TextMediaComponentMedia2 on TextMediaComponentMedia2 {
  lightboxImage {
    ...LightboxLazyImageComponentNoNesting
  }
  full
}
`

export const TeaserBoxComponentFragment = graphql`fragment TeaserBoxComponent on TeaserBoxComponent {
  topic__d291
  text__bfb6
  darkStyle__a540
  link__397b {
    ...TeaserBoxComponentLinkNoNesting
  }
  image__301f
  ratio__bfd3
  imageSpacing
  type
}
`

export const TeaserBoxComponentLinkFragment = graphql`fragment TeaserBoxComponentLink on TeaserBoxComponentLink {
  hidden
}
`

export const TeaserRowComponentFragment = graphql`fragment TeaserRowComponent on TeaserRowComponent {
  topic__d291
  text__bfb6
  darkStyle__09bc
  link__397b {
    ...TeaserRowComponentLinkNoNesting
  }
  type
}
`

export const TeaserRowComponentLinkFragment = graphql`fragment TeaserRowComponentLink on TeaserRowComponentLink {
  hidden
}
`

export const SectionComponentFragment = graphql`fragment SectionComponent on SectionComponent {
  width__aa24
  gutter__b322
  mode__9730
  content__2b4b {
    ...QuotesSliderComponentNoNesting,
    ...LinkButtonComponentNoNesting,
    ...ToggleComponentNoNesting,
    ...ButtonComponentNoNesting,
    ...TagLabelComponentNoNesting,
    ...VisualComponentNoNesting,
    ...QuoteComponentNoNesting,
    ...VisualSliderComponentNoNesting,
    ...ContactComponentNoNesting,
    ...StorytellingComponentNoNesting,
    ...CollapsibleBoxComponentNoNesting,
    ...CountUpComponentNoNesting,
    ...ContentBoxComponentNoNesting,
    ...HeadlineComponentNoNesting,
    ...TextMediaComponentNoNesting,
    ...TeaserBoxComponentNoNesting,
    ...LogoTilesComponentNoNesting,
    ...TeaserRowComponentNoNesting
  }
  background
  spaceBefore
  spaceAfter__59aa
  headline {
    ...HeadlineComponentNoNesting
  }
}
`

export const SlideFragment = graphql`fragment Slide on Slide {
  slideComponent
  previewComponent
  previewLabel__99dc
}
`

export const SliderComponentFragment = graphql`fragment SliderComponent on SliderComponent {
  autoplay__17e7
  className__a697
  component
  arrows
  type
}
`

export const TeaserComponentFragment = graphql`fragment TeaserComponent on TeaserComponent {
  topic__d291
  text__bfb6
  darkStyle__b311
  link__397b {
    ...TeaserComponentLinkNoNesting
  }
  type
}
`

export const TeaserComponentLinkFragment = graphql`fragment TeaserComponentLink on TeaserComponentLink {
  hidden
}
`


export const CollapsibleBoxComponentNoNestingFragment = graphql`fragment CollapsibleBoxComponentNoNesting on CollapsibleBoxComponent {
  summary
  text
  type
}
`

export const ContactComponentNoNestingFragment = graphql`fragment ContactComponentNoNesting on ContactComponent {
  title
  subtitle
  phone
  email
  copy
  type
}
`

export const PictureComponentNoNestingFragment = graphql`fragment PictureComponentNoNesting on PictureComponent {
  src
  srcSet
  alt
  width__f9f3
  height__b919
  className__6ef8
  id__bfb7
  itemProp
  style
  objectFit
  noscript
  lazy
  pictureClassName
  type
}
`

export const PictureComponentSourcesNoNestingFragment = graphql`fragment PictureComponentSourcesNoNesting on PictureComponentSources {
  srcSet
  media
  type
}
`

export const CountUpComponentNoNestingFragment = graphql`fragment CountUpComponentNoNesting on CountUpComponent {
  to
  topic
  text__9f33
  type
}
`

export const IconComponentNoNestingFragment = graphql`fragment IconComponentNoNesting on IconComponent {
  icon__3475
  role
  className__f0c2
  type
}
`

export const LinkButtonComponentNoNestingFragment = graphql`fragment LinkButtonComponentNoNesting on LinkButtonComponent {
  label__af11
  variant__01a5
  size__e9b8
  className__6ef8
  iconBefore__e7bb
  iconAfter__be45
  dataComponent__0568
  fillAnimation__79a7
  iconAnimation__0d39
  href
  newTab
  type
}
`

export const LogoTilesComponentNoNestingFragment = graphql`fragment LogoTilesComponentNoNesting on LogoTilesComponent {
  type
}
`

export const QuoteComponentNoNestingFragment = graphql`fragment QuoteComponentNoNesting on QuoteComponent {
  image__a25b
  text__b748
  source
  date
  type
}
`

export const QuotesSliderComponentNoNestingFragment = graphql`fragment QuotesSliderComponentNoNesting on QuotesSliderComponent {
  type
}
`

export const StorytellingComponentNoNestingFragment = graphql`fragment StorytellingComponentNoNesting on StorytellingComponent {
  backgroundImage
  backgroundColor
  full
  type
}
`

export const StorytellingComponentImageNoNestingFragment = graphql`fragment StorytellingComponentImageNoNesting on StorytellingComponentImage {
  source
  ratio
  vAlign
  hAlign
}
`

export const StorytellingComponentImageOrderNoNestingFragment = graphql`fragment StorytellingComponentImageOrderNoNesting on StorytellingComponentImageOrder {
  mobileImageLast
  desktopImageLast
}
`

export const StorytellingComponentBoxNoNestingFragment = graphql`fragment StorytellingComponentBoxNoNesting on StorytellingComponentBox {
  text
  textAlign
  textColor
  vAlign
  hAlign
}
`

export const HeadlineComponentNoNestingFragment = graphql`fragment HeadlineComponentNoNesting on HeadlineComponent {
  level
  align
  content
  subheadline
  spaceAfter
  pageHeader
  type
}
`

export const VisualSlidePreviewComponentNoNestingFragment = graphql`fragment VisualSlidePreviewComponentNoNesting on VisualSlidePreviewComponent {
  previewLabel
  type
}
`

export const VisualComponentNoNestingFragment = graphql`fragment VisualComponentNoNesting on VisualComponent {
  height
  overlay
  backgroundColor__7e4c
  inbox
  skipButton
  className
  type
}
`

export const VisualComponentMediaNoNestingFragment = graphql`fragment VisualComponentMediaNoNesting on VisualComponentMedia {
  mode
}
`

export const VisualComponentMediaImageNoNestingFragment = graphql`fragment VisualComponentMediaImageNoNesting on VisualComponentMediaImage {
  srcMobile
  srcTablet
  srcDesktop
  indent
  alt
}
`

export const VisualComponentMediaVideoNoNestingFragment = graphql`fragment VisualComponentMediaVideoNoNesting on VisualComponentMediaVideo {
  srcMobile
  srcTablet
  srcDesktop
}
`

export const VisualComponentBoxNoNestingFragment = graphql`fragment VisualComponentBoxNoNesting on VisualComponentBox {
  enabled
  headline
  text
  indent
  horizontal
  vertical
  background
}
`

export const VisualComponentBoxLinkNoNestingFragment = graphql`fragment VisualComponentBoxLinkNoNesting on VisualComponentBoxLink {
  enabled
}
`

export const VisualSliderComponentNoNestingFragment = graphql`fragment VisualSliderComponentNoNesting on VisualSliderComponent {
  autoplay
  type
}
`

export const VisualSliderComponentSlidesNoNestingFragment = graphql`fragment VisualSliderComponentSlidesNoNesting on VisualSliderComponentSlides {
  height
  overlay
  backgroundColor__7e4c
  inbox
  skipButton
  className
  type
  label
}
`

export const VisualSliderComponentSlidesMediaNoNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaNoNesting on VisualSliderComponentSlidesMedia {
  mode
}
`

export const VisualSliderComponentSlidesMediaImageNoNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaImageNoNesting on VisualSliderComponentSlidesMediaImage {
  srcMobile
  srcTablet
  srcDesktop
  indent
  alt
}
`

export const VisualSliderComponentSlidesMediaVideoNoNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaVideoNoNesting on VisualSliderComponentSlidesMediaVideo {
  srcMobile
  srcTablet
  srcDesktop
}
`

export const VisualSliderComponentSlidesBoxNoNestingFragment = graphql`fragment VisualSliderComponentSlidesBoxNoNesting on VisualSliderComponentSlidesBox {
  enabled
  headline
  text
  indent
  horizontal
  vertical
  background
}
`

export const VisualSliderComponentSlidesBoxLinkNoNestingFragment = graphql`fragment VisualSliderComponentSlidesBoxLinkNoNesting on VisualSliderComponentSlidesBoxLink {
  enabled
}
`

export const ButtonComponentNoNestingFragment = graphql`fragment ButtonComponentNoNesting on ButtonComponent {
  label__469a
  variant__de9b
  size__5795
  className__6ef8
  iconBefore__6278
  iconAfter__ee88
  dataComponent__14e4
  fillAnimation__6127
  iconAnimation__6af4
  typeAttr
  value
  name__07bb
  disabled__5a87
  type
}
`

export const ContentBoxComponentNoNestingFragment = graphql`fragment ContentBoxComponentNoNesting on ContentBoxComponent {
  ratio
  alignement
  image__dc48
  topic__7881
  text__082a
  type
}
`

export const ContentBoxComponentLinkNoNestingFragment = graphql`fragment ContentBoxComponentLinkNoNesting on ContentBoxComponentLink {
  enabled
}
`

export const DividerComponentNoNestingFragment = graphql`fragment DividerComponentNoNesting on DividerComponent {
  variant__023f
  type
}
`

export const LightboxLazyImageComponentNoNestingFragment = graphql`fragment LightboxLazyImageComponentNoNesting on LightboxLazyImageComponent {
  thumb
  image__a266
  width
  height__8840
  zoomIcon
  caption
  hideCaption
  gallery
  id
  class
  type
}
`

export const ContainerNoNestingFragment = graphql`fragment ContainerNoNesting on Container {
  width__aa24
  gutter
  mode
}
`

export const ToggleComponentNoNestingFragment = graphql`fragment ToggleComponentNoNesting on ToggleComponent {
  id__72fa
  name
  checked
  disabled
  type
}
`

export const TagLabelComponentNoNestingFragment = graphql`fragment TagLabelComponentNoNesting on TagLabelComponent {
  label__8347
  size__0e1b
  link__88be
  removable
  type
}
`

export const TextMediaComponentNoNestingFragment = graphql`fragment TextMediaComponentNoNesting on TextMediaComponent {
  text__b748
  mediaAlignment
  type
}
`

export const TextMediaComponentMedia0NoNestingFragment = graphql`fragment TextMediaComponentMedia0NoNesting on TextMediaComponentMedia0 {
  full
}
`

export const TextMediaComponentMedia0VideoNoNestingFragment = graphql`fragment TextMediaComponentMedia0VideoNoNesting on TextMediaComponentMedia0Video {
  src
  iframe
  title
  width
  height
}
`

export const TextMediaComponentMedia1NoNestingFragment = graphql`fragment TextMediaComponentMedia1NoNesting on TextMediaComponentMedia1 {
  full
}
`

export const TextMediaComponentMedia2NoNestingFragment = graphql`fragment TextMediaComponentMedia2NoNesting on TextMediaComponentMedia2 {
  full
}
`

export const TeaserBoxComponentNoNestingFragment = graphql`fragment TeaserBoxComponentNoNesting on TeaserBoxComponent {
  topic__d291
  text__bfb6
  darkStyle__a540
  image__301f
  ratio__bfd3
  imageSpacing
  type
}
`

export const TeaserBoxComponentLinkNoNestingFragment = graphql`fragment TeaserBoxComponentLinkNoNesting on TeaserBoxComponentLink {
  hidden
}
`

export const TeaserRowComponentNoNestingFragment = graphql`fragment TeaserRowComponentNoNesting on TeaserRowComponent {
  topic__d291
  text__bfb6
  darkStyle__09bc
  type
}
`

export const TeaserRowComponentLinkNoNestingFragment = graphql`fragment TeaserRowComponentLinkNoNesting on TeaserRowComponentLink {
  hidden
}
`

export const SectionComponentNoNestingFragment = graphql`fragment SectionComponentNoNesting on SectionComponent {
  width__aa24
  gutter__b322
  mode__9730
  background
  spaceBefore
  spaceAfter__59aa
}
`

export const SlideNoNestingFragment = graphql`fragment SlideNoNesting on Slide {
  slideComponent
  previewComponent
  previewLabel__99dc
}
`

export const SliderComponentNoNestingFragment = graphql`fragment SliderComponentNoNesting on SliderComponent {
  autoplay__17e7
  className__a697
  component
  arrows
  type
}
`

export const TeaserComponentNoNestingFragment = graphql`fragment TeaserComponentNoNesting on TeaserComponent {
  topic__d291
  text__bfb6
  darkStyle__b311
  type
}
`

export const TeaserComponentLinkNoNestingFragment = graphql`fragment TeaserComponentLinkNoNesting on TeaserComponentLink {
  hidden
}
`


export const CollapsibleBoxComponentDeepNestingFragment = graphql`fragment CollapsibleBoxComponentDeepNesting on CollapsibleBoxComponent {
  summary
  text
  type
}
`

export const ContactComponentDeepNestingFragment = graphql`fragment ContactComponentDeepNesting on ContactComponent {
  image {
    ...PictureComponentDeepNesting
  }
  title
  subtitle
  phone
  email
  copy
  type
}
`

export const PictureComponentDeepNestingFragment = graphql`fragment PictureComponentDeepNesting on PictureComponent {
  src
  srcSet
  alt
  width__f9f3
  height__b919
  className__6ef8
  id__bfb7
  itemProp
  style
  objectFit
  noscript
  lazy
  sources {
    ...PictureComponentSourcesDeepNesting
  }
  pictureClassName
  type
}
`

export const PictureComponentSourcesDeepNestingFragment = graphql`fragment PictureComponentSourcesDeepNesting on PictureComponentSources {
  srcSet
  media
  type
}
`

export const CountUpComponentDeepNestingFragment = graphql`fragment CountUpComponentDeepNesting on CountUpComponent {
  to
  icon {
    ...IconComponentDeepNesting
  }
  topic
  text__9f33
  link {
    ...LinkButtonComponentDeepNesting
  }
  type
}
`

export const IconComponentDeepNestingFragment = graphql`fragment IconComponentDeepNesting on IconComponent {
  icon__3475
  role
  className__f0c2
  type
}
`

export const LinkButtonComponentDeepNestingFragment = graphql`fragment LinkButtonComponentDeepNesting on LinkButtonComponent {
  label__af11
  variant__01a5
  size__e9b8
  className__6ef8
  icon__2933 {
    ...IconComponentDeepNesting
  }
  iconBefore__e7bb
  iconAfter__be45
  dataComponent__0568
  fillAnimation__79a7
  iconAnimation__0d39
  href
  newTab
  type
}
`

export const LogoTilesComponentDeepNestingFragment = graphql`fragment LogoTilesComponentDeepNesting on LogoTilesComponent {
  logos {
    ...PictureComponentDeepNesting
  }
  type
}
`

export const QuoteComponentDeepNestingFragment = graphql`fragment QuoteComponentDeepNesting on QuoteComponent {
  image__a25b
  text__b748
  source
  date
  type
}
`

export const QuotesSliderComponentDeepNestingFragment = graphql`fragment QuotesSliderComponentDeepNesting on QuotesSliderComponent {
  slides {
    ...QuoteComponentDeepNesting
  }
  type
}
`

export const StorytellingComponentDeepNestingFragment = graphql`fragment StorytellingComponentDeepNesting on StorytellingComponent {
  backgroundImage
  backgroundColor
  full
  image__195f {
    ...StorytellingComponentImageDeepNesting
  }
  box {
    ...StorytellingComponentBoxDeepNesting
  }
  type
}
`

export const StorytellingComponentImageDeepNestingFragment = graphql`fragment StorytellingComponentImageDeepNesting on StorytellingComponentImage {
  source
  ratio
  vAlign
  hAlign
  order {
    ...StorytellingComponentImageOrderDeepNesting
  }
}
`

export const StorytellingComponentImageOrderDeepNestingFragment = graphql`fragment StorytellingComponentImageOrderDeepNesting on StorytellingComponentImageOrder {
  mobileImageLast
  desktopImageLast
}
`

export const StorytellingComponentBoxDeepNestingFragment = graphql`fragment StorytellingComponentBoxDeepNesting on StorytellingComponentBox {
  headline {
    ...HeadlineComponentDeepNesting
  }
  text
  textAlign
  textColor
  vAlign
  hAlign
  link {
    ...LinkButtonComponentDeepNesting
  }
}
`

export const HeadlineComponentDeepNestingFragment = graphql`fragment HeadlineComponentDeepNesting on HeadlineComponent {
  level
  align
  content
  subheadline
  spaceAfter
  pageHeader
  type
}
`

export const VisualSlidePreviewComponentDeepNestingFragment = graphql`fragment VisualSlidePreviewComponentDeepNesting on VisualSlidePreviewComponent {
  previewLabel
  type
}
`

export const VisualComponentDeepNestingFragment = graphql`fragment VisualComponentDeepNesting on VisualComponent {
  height
  media {
    ...VisualComponentMediaDeepNesting
  }
  overlay
  box__4bb5 {
    ...VisualComponentBoxDeepNesting
  }
  backgroundColor__7e4c
  inbox
  skipButton
  className
  type
}
`

export const VisualComponentMediaDeepNestingFragment = graphql`fragment VisualComponentMediaDeepNesting on VisualComponentMedia {
  mode
  image {
    ...VisualComponentMediaImageDeepNesting
  }
  video {
    ...VisualComponentMediaVideoDeepNesting
  }
}
`

export const VisualComponentMediaImageDeepNestingFragment = graphql`fragment VisualComponentMediaImageDeepNesting on VisualComponentMediaImage {
  srcMobile
  srcTablet
  srcDesktop
  indent
  alt
}
`

export const VisualComponentMediaVideoDeepNestingFragment = graphql`fragment VisualComponentMediaVideoDeepNesting on VisualComponentMediaVideo {
  srcMobile
  srcTablet
  srcDesktop
}
`

export const VisualComponentBoxDeepNestingFragment = graphql`fragment VisualComponentBoxDeepNesting on VisualComponentBox {
  enabled
  headline
  text
  link {
    ...VisualComponentBoxLinkDeepNesting
  }
  indent
  horizontal
  vertical
  background
}
`

export const VisualComponentBoxLinkDeepNestingFragment = graphql`fragment VisualComponentBoxLinkDeepNesting on VisualComponentBoxLink {
  enabled
}
`

export const VisualSliderComponentDeepNestingFragment = graphql`fragment VisualSliderComponentDeepNesting on VisualSliderComponent {
  autoplay
  slides__8de2 {
    ...VisualSliderComponentSlidesDeepNesting
  }
  type
}
`

export const VisualSliderComponentSlidesDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesDeepNesting on VisualSliderComponentSlides {
  height
  media {
    ...VisualSliderComponentSlidesMediaDeepNesting
  }
  overlay
  box__4bb5 {
    ...VisualSliderComponentSlidesBoxDeepNesting
  }
  backgroundColor__7e4c
  inbox
  skipButton
  className
  type
  label
}
`

export const VisualSliderComponentSlidesMediaDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaDeepNesting on VisualSliderComponentSlidesMedia {
  mode
  image {
    ...VisualSliderComponentSlidesMediaImageDeepNesting
  }
  video {
    ...VisualSliderComponentSlidesMediaVideoDeepNesting
  }
}
`

export const VisualSliderComponentSlidesMediaImageDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaImageDeepNesting on VisualSliderComponentSlidesMediaImage {
  srcMobile
  srcTablet
  srcDesktop
  indent
  alt
}
`

export const VisualSliderComponentSlidesMediaVideoDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaVideoDeepNesting on VisualSliderComponentSlidesMediaVideo {
  srcMobile
  srcTablet
  srcDesktop
}
`

export const VisualSliderComponentSlidesBoxDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesBoxDeepNesting on VisualSliderComponentSlidesBox {
  enabled
  headline
  text
  link {
    ...VisualSliderComponentSlidesBoxLinkDeepNesting
  }
  indent
  horizontal
  vertical
  background
}
`

export const VisualSliderComponentSlidesBoxLinkDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesBoxLinkDeepNesting on VisualSliderComponentSlidesBoxLink {
  enabled
}
`

export const ButtonComponentDeepNestingFragment = graphql`fragment ButtonComponentDeepNesting on ButtonComponent {
  label__469a
  variant__de9b
  size__5795
  className__6ef8
  icon__2933 {
    ...IconComponentDeepNesting
  }
  iconBefore__6278
  iconAfter__ee88
  dataComponent__14e4
  fillAnimation__6127
  iconAnimation__6af4
  typeAttr
  value
  name__07bb
  disabled__5a87
  type
}
`

export const ContentBoxComponentDeepNestingFragment = graphql`fragment ContentBoxComponentDeepNesting on ContentBoxComponent {
  ratio
  alignement
  image__dc48
  topic__7881
  text__082a
  link__360a {
    ...ContentBoxComponentLinkDeepNesting
  }
  type
}
`

export const ContentBoxComponentLinkDeepNestingFragment = graphql`fragment ContentBoxComponentLinkDeepNesting on ContentBoxComponentLink {
  enabled
}
`

export const DividerComponentDeepNestingFragment = graphql`fragment DividerComponentDeepNesting on DividerComponent {
  variant__023f
  type
}
`

export const LightboxLazyImageComponentDeepNestingFragment = graphql`fragment LightboxLazyImageComponentDeepNesting on LightboxLazyImageComponent {
  thumb
  image__a266
  width
  height__8840
  zoomIcon
  caption
  hideCaption
  gallery
  id
  class
  type
}
`

export const ContainerDeepNestingFragment = graphql`fragment ContainerDeepNesting on Container {
  width__aa24
  gutter
  mode
  content__2b4b {
    ...QuotesSliderComponentDeepNesting,
    ...LinkButtonComponentDeepNesting,
    ...ToggleComponentDeepNesting,
    ...ButtonComponentDeepNesting,
    ...TagLabelComponentDeepNesting,
    ...VisualComponentDeepNesting,
    ...QuoteComponentDeepNesting,
    ...VisualSliderComponentDeepNesting,
    ...ContactComponentDeepNesting,
    ...StorytellingComponentDeepNesting,
    ...CollapsibleBoxComponentDeepNesting,
    ...CountUpComponentDeepNesting,
    ...ContentBoxComponentDeepNesting,
    ...HeadlineComponentDeepNesting,
    ...TextMediaComponentDeepNesting,
    ...TeaserBoxComponentDeepNesting,
    ...LogoTilesComponentDeepNesting,
    ...TeaserRowComponentDeepNesting
  }
}
`

export const ToggleComponentDeepNestingFragment = graphql`fragment ToggleComponentDeepNesting on ToggleComponent {
  id__72fa
  name
  checked
  disabled
  type
}
`

export const TagLabelComponentDeepNestingFragment = graphql`fragment TagLabelComponentDeepNesting on TagLabelComponent {
  label__8347
  size__0e1b
  link__88be
  removable
  type
}
`

export const TextMediaComponentDeepNestingFragment = graphql`fragment TextMediaComponentDeepNesting on TextMediaComponent {
  text__b748
  mediaAlignment
  media__4c5e {
    ...TextMediaComponentMedia0DeepNesting,
    ...TextMediaComponentMedia1DeepNesting,
    ...TextMediaComponentMedia2DeepNesting
  }
  type
}
`

export const TextMediaComponentMedia0DeepNestingFragment = graphql`fragment TextMediaComponentMedia0DeepNesting on TextMediaComponentMedia0 {
  video {
    ...TextMediaComponentMedia0VideoDeepNesting
  }
  full
}
`

export const TextMediaComponentMedia0VideoDeepNestingFragment = graphql`fragment TextMediaComponentMedia0VideoDeepNesting on TextMediaComponentMedia0Video {
  src
  iframe
  title
  width
  height
}
`

export const TextMediaComponentMedia1DeepNestingFragment = graphql`fragment TextMediaComponentMedia1DeepNesting on TextMediaComponentMedia1 {
  image {
    ...PictureComponentDeepNesting
  }
  full
}
`

export const TextMediaComponentMedia2DeepNestingFragment = graphql`fragment TextMediaComponentMedia2DeepNesting on TextMediaComponentMedia2 {
  lightboxImage {
    ...LightboxLazyImageComponentDeepNesting
  }
  full
}
`

export const TeaserBoxComponentDeepNestingFragment = graphql`fragment TeaserBoxComponentDeepNesting on TeaserBoxComponent {
  topic__d291
  text__bfb6
  darkStyle__a540
  link__397b {
    ...TeaserBoxComponentLinkDeepNesting
  }
  image__301f
  ratio__bfd3
  imageSpacing
  type
}
`

export const TeaserBoxComponentLinkDeepNestingFragment = graphql`fragment TeaserBoxComponentLinkDeepNesting on TeaserBoxComponentLink {
  hidden
}
`

export const TeaserRowComponentDeepNestingFragment = graphql`fragment TeaserRowComponentDeepNesting on TeaserRowComponent {
  topic__d291
  text__bfb6
  darkStyle__09bc
  link__397b {
    ...TeaserRowComponentLinkDeepNesting
  }
  type
}
`

export const TeaserRowComponentLinkDeepNestingFragment = graphql`fragment TeaserRowComponentLinkDeepNesting on TeaserRowComponentLink {
  hidden
}
`

export const SectionComponentDeepNestingFragment = graphql`fragment SectionComponentDeepNesting on SectionComponent {
  width__aa24
  gutter__b322
  mode__9730
  content__2b4b {
    ...QuotesSliderComponentDeepNesting,
    ...LinkButtonComponentDeepNesting,
    ...ToggleComponentDeepNesting,
    ...ButtonComponentDeepNesting,
    ...TagLabelComponentDeepNesting,
    ...VisualComponentDeepNesting,
    ...QuoteComponentDeepNesting,
    ...VisualSliderComponentDeepNesting,
    ...ContactComponentDeepNesting,
    ...StorytellingComponentDeepNesting,
    ...CollapsibleBoxComponentDeepNesting,
    ...CountUpComponentDeepNesting,
    ...ContentBoxComponentDeepNesting,
    ...HeadlineComponentDeepNesting,
    ...TextMediaComponentDeepNesting,
    ...TeaserBoxComponentDeepNesting,
    ...LogoTilesComponentDeepNesting,
    ...TeaserRowComponentDeepNesting
  }
  background
  spaceBefore
  spaceAfter__59aa
  headline {
    ...HeadlineComponentDeepNesting
  }
}
`

export const SlideDeepNestingFragment = graphql`fragment SlideDeepNesting on Slide {
  slideComponent
  previewComponent
  previewLabel__99dc
}
`

export const SliderComponentDeepNestingFragment = graphql`fragment SliderComponentDeepNesting on SliderComponent {
  autoplay__17e7
  className__a697
  component
  arrows
  type
}
`

export const TeaserComponentDeepNestingFragment = graphql`fragment TeaserComponentDeepNesting on TeaserComponent {
  topic__d291
  text__bfb6
  darkStyle__b311
  link__397b {
    ...TeaserComponentLinkDeepNesting
  }
  type
}
`

export const TeaserComponentLinkDeepNestingFragment = graphql`fragment TeaserComponentLinkDeepNesting on TeaserComponentLink {
  hidden
}
`



