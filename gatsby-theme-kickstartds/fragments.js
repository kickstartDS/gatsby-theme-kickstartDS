import { graphql } from "gatsby";

// THIS FILE HAS BEEN AUTO-GENERATED BY "@kickstartds/graphql-cli-generate-fragments"
// DO NOT EDIT THIS FILE DIRECTLY

export const ContentBoxComponentFragment = graphql`fragment ContentBoxComponent on ContentBoxComponent {
  ratio__30c5
  alignement__7c67
  image__b7d7
  topic__ed87
  text__b5a1
  link__4433 {
    ...ContentBoxComponentLinkNoNesting
  }
  internalType
}
`

export const ContentBoxComponentLinkFragment = graphql`fragment ContentBoxComponentLink on ContentBoxComponentLink {
  enabled__191b
  label__d5dc
  variant__282a
  size__107e
  className__7e61
  icon__ba1c {
    ...IconComponentNoNesting
  }
  iconBefore__51ac
  iconAfter__5469
  dataComponent__4a1c
  fillAnimation__6a72
  iconAnimation__92d3
  href__5fa6
  newTab__4d0d
}
`

export const IconComponentFragment = graphql`fragment IconComponent on IconComponent {
  icon__dcfe
  role__ea32
  className__251a
  internalType
}
`

export const ButtonComponentFragment = graphql`fragment ButtonComponent on ButtonComponent {
  label__634c
  variant__c8d5
  size__1735
  className__f69c
  icon__b287 {
    ...IconComponentNoNesting
  }
  iconBefore__ce4f
  iconAfter__9214
  dataComponent__fb24
  fillAnimation__a843
  iconAnimation__a42f
  typeAttr__b95e
  value__ed44
  name__6a5d
  disabled__f1d0
  internalType
}
`

export const DividerComponentFragment = graphql`fragment DividerComponent on DividerComponent {
  variant__fdb0
  internalType
}
`

export const HeadlineComponentFragment = graphql`fragment HeadlineComponent on HeadlineComponent {
  level__503c
  align__498d
  content__3cc5
  subheadline__aa93
  spaceAfter__6f7d
  pageHeader__5c3f
  internalType
}
`

export const LightboxLazyImageComponentFragment = graphql`fragment LightboxLazyImageComponent on LightboxLazyImageComponent {
  thumb__64b3
  image__0dd8
  width__5f4a
  height__eeb9
  zoomIcon__8de6
  caption__dc74
  hideCaption__668c
  gallery__d524
  id__5744
  class__b1f4
  internalType
}
`

export const LinkButtonComponentFragment = graphql`fragment LinkButtonComponent on LinkButtonComponent {
  label__b988
  variant__a43d
  size__942c
  className__8726
  icon__157f {
    ...IconComponentNoNesting
  }
  iconBefore__7991
  iconAfter__c8b6
  dataComponent__8d9e
  fillAnimation__2a89
  iconAnimation__9933
  href__11db
  newTab__dc35
  internalType
}
`

export const PictureComponentFragment = graphql`fragment PictureComponent on PictureComponent {
  src__197b
  srcSet__866d
  alt__1f75
  width__4691
  height__23ff
  className__a117
  id__9f67
  itemProp__ba17
  style__ccee
  objectFit__1269
  noscript__ec26
  lazy__55bf
  sources__a109 {
    ...PictureComponentSourcesNoNesting
  }
  pictureClassName__9f3e
  internalType
}
`

export const PictureComponentSourcesFragment = graphql`fragment PictureComponentSources on PictureComponentSources {
  srcSet__866d
  media__420c
  type__5ef8
}
`

export const SectionComponentFragment = graphql`fragment SectionComponent on SectionComponent {
  width__c976
  gutter__7060
  mode__123d
  content__2cb4 {
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
  background__44d0
  spaceBefore__8a4a
  spaceAfter__9774
  headline__77a3 {
    ...HeadlineComponentNoNesting
  }
  internalType
}
`

export const QuotesSliderComponentFragment = graphql`fragment QuotesSliderComponent on QuotesSliderComponent {
  slides__d47f {
    ...QuoteComponentNoNesting
  }
  internalType
}
`

export const QuoteComponentFragment = graphql`fragment QuoteComponent on QuoteComponent {
  image__f09b
  text__b65e
  source__86ac
  date__3f4e
  internalType
}
`

export const ToggleComponentFragment = graphql`fragment ToggleComponent on ToggleComponent {
  id__788a
  name__f2d9
  checked__90a6
  disabled__d11c
  internalType
}
`

export const TagLabelComponentFragment = graphql`fragment TagLabelComponent on TagLabelComponent {
  label__7246
  size__d93f
  link__6ced
  removable__7eaf
  internalType
}
`

export const VisualComponentFragment = graphql`fragment VisualComponent on VisualComponent {
  height__f2ca
  media__8f99 {
    ...VisualComponentMediaNoNesting
  }
  overlay__6df1
  box__5bd7 {
    ...VisualComponentBoxNoNesting
  }
  backgroundColor__4ca8
  inbox__8206
  skipButton__bf9d
  className__d3dc
  internalType
}
`

export const VisualComponentMediaFragment = graphql`fragment VisualComponentMedia on VisualComponentMedia {
  mode__0c0c
  image__e376 {
    ...VisualComponentMediaImageNoNesting
  }
  video__a9a8 {
    ...VisualComponentMediaVideoNoNesting
  }
}
`

export const VisualComponentMediaImageFragment = graphql`fragment VisualComponentMediaImage on VisualComponentMediaImage {
  srcMobile__d852
  srcTablet__5f96
  srcDesktop__6fc8
  indent__a206
  alt__0d80
}
`

export const VisualComponentMediaVideoFragment = graphql`fragment VisualComponentMediaVideo on VisualComponentMediaVideo {
  srcMobile__d852
  srcTablet__5f96
  srcDesktop__6fc8
}
`

export const VisualComponentBoxFragment = graphql`fragment VisualComponentBox on VisualComponentBox {
  enabled__2a36
  headline__6888
  text__e470
  link__76eb {
    ...VisualComponentBoxLinkNoNesting
  }
  indent__a206
  horizontal__c3de
  vertical__f41c
  background__c2d1
}
`

export const VisualComponentBoxLinkFragment = graphql`fragment VisualComponentBoxLink on VisualComponentBoxLink {
  enabled__2a36
  label__3a22
  variant__8ad7
  size__9939
  className__d3dc
  icon__8111 {
    ...IconComponentNoNesting
  }
  iconBefore__ed1a
  iconAfter__82f7
  dataComponent__37f1
  fillAnimation__e697
  iconAnimation__87e9
  href__8857
  newTab__449f
}
`

export const VisualSliderComponentFragment = graphql`fragment VisualSliderComponent on VisualSliderComponent {
  autoplay__e333
  slides__e195 {
    ...VisualSliderComponentSlidesNoNesting
  }
  internalType
}
`

export const VisualSliderComponentSlidesFragment = graphql`fragment VisualSliderComponentSlides on VisualSliderComponentSlides {
  height__f2ca
  media__8f99 {
    ...VisualSliderComponentSlidesMediaNoNesting
  }
  overlay__6df1
  box__5bd7 {
    ...VisualSliderComponentSlidesBoxNoNesting
  }
  backgroundColor__4ca8
  inbox__8206
  skipButton__bf9d
  className__d3dc
  internalType__aecc
  label__cd20
}
`

export const VisualSliderComponentSlidesMediaFragment = graphql`fragment VisualSliderComponentSlidesMedia on VisualSliderComponentSlidesMedia {
  mode__c9af
  image__417b {
    ...VisualSliderComponentSlidesMediaImageNoNesting
  }
  video__053f {
    ...VisualSliderComponentSlidesMediaVideoNoNesting
  }
}
`

export const VisualSliderComponentSlidesMediaImageFragment = graphql`fragment VisualSliderComponentSlidesMediaImage on VisualSliderComponentSlidesMediaImage {
  srcMobile__3296
  srcTablet__ec7d
  srcDesktop__7ece
  indent__73f9
  alt__686c
}
`

export const VisualSliderComponentSlidesMediaVideoFragment = graphql`fragment VisualSliderComponentSlidesMediaVideo on VisualSliderComponentSlidesMediaVideo {
  srcMobile__3296
  srcTablet__ec7d
  srcDesktop__7ece
}
`

export const VisualSliderComponentSlidesBoxFragment = graphql`fragment VisualSliderComponentSlidesBox on VisualSliderComponentSlidesBox {
  enabled__bbdd
  headline__841b
  text__d008
  link__95a0 {
    ...VisualSliderComponentSlidesBoxLinkNoNesting
  }
  indent__73f9
  horizontal__9f0a
  vertical__fd20
  background__7293
}
`

export const VisualSliderComponentSlidesBoxLinkFragment = graphql`fragment VisualSliderComponentSlidesBoxLink on VisualSliderComponentSlidesBoxLink {
  enabled__bbdd
  label__cd20
  variant__9cf5
  size__0caa
  className__ce8d
  icon__2395 {
    ...IconComponentNoNesting
  }
  iconBefore__f3d8
  iconAfter__5027
  dataComponent__fb41
  fillAnimation__a759
  iconAnimation__0e1c
  href__d3a7
  newTab__0a14
}
`

export const ContactComponentFragment = graphql`fragment ContactComponent on ContactComponent {
  image__a463 {
    ...PictureComponentNoNesting
  }
  title__5426
  subtitle__92ac
  phone__520b
  email__70d5
  copy__cda3
  internalType
}
`

export const StorytellingComponentFragment = graphql`fragment StorytellingComponent on StorytellingComponent {
  backgroundImage__cb66
  backgroundColor__291a
  full__be79
  image__cc97 {
    ...StorytellingComponentImageNoNesting
  }
  box__5f7a {
    ...StorytellingComponentBoxNoNesting
  }
  internalType
}
`

export const StorytellingComponentImageFragment = graphql`fragment StorytellingComponentImage on StorytellingComponentImage {
  source__20fd
  ratio__f5fa
  vAlign__9bd7
  hAlign__9705
  order__eda1 {
    ...StorytellingComponentImageOrderNoNesting
  }
}
`

export const StorytellingComponentImageOrderFragment = graphql`fragment StorytellingComponentImageOrder on StorytellingComponentImageOrder {
  mobileImageLast__f625
  desktopImageLast__ed82
}
`

export const StorytellingComponentBoxFragment = graphql`fragment StorytellingComponentBox on StorytellingComponentBox {
  headline__7c3f {
    ...HeadlineComponentNoNesting
  }
  text__a401
  textAlign__4df6
  textColor__ad35
  vAlign__9bd7
  hAlign__9705
  link__5d0d {
    ...LinkButtonComponentNoNesting
  }
}
`

export const CollapsibleBoxComponentFragment = graphql`fragment CollapsibleBoxComponent on CollapsibleBoxComponent {
  summary__919d
  text__9abc
  internalType
}
`

export const CountUpComponentFragment = graphql`fragment CountUpComponent on CountUpComponent {
  to__fc5f
  icon__ed13 {
    ...IconComponentNoNesting
  }
  topic__b6c8
  text__0f41
  link__ac78 {
    ...LinkButtonComponentNoNesting
  }
  internalType
}
`

export const TextMediaComponentFragment = graphql`fragment TextMediaComponent on TextMediaComponent {
  text__117a
  mediaAlignment__0da3
  media__d3b5 {
    ...VideoNoNesting,
    ...ImageNoNesting,
    ...LightboxImageNoNesting
  }
  internalType
}
`

export const VideoFragment = graphql`fragment Video on Video {
  video__e832 {
    ...VideoVideoNoNesting
  }
  full__b18e
}
`

export const VideoVideoFragment = graphql`fragment VideoVideo on VideoVideo {
  src__25d9
  iframe__a598
  title__d5d3
  width__eaae
  height__b435
}
`

export const ImageFragment = graphql`fragment Image on Image {
  image__aea8 {
    ...PictureComponentNoNesting
  }
  full__b18e
}
`

export const LightboxImageFragment = graphql`fragment LightboxImage on LightboxImage {
  lightboxImage__9a34 {
    ...LightboxLazyImageComponentNoNesting
  }
  full__b18e
}
`

export const TeaserBoxComponentFragment = graphql`fragment TeaserBoxComponent on TeaserBoxComponent {
  topic__8a0d
  text__da70
  darkStyle__b59c
  link__884d {
    ...TeaserBoxComponentLinkNoNesting
  }
  image__5eb9
  ratio__d62c
  imageSpacing__2828
  internalType
}
`

export const TeaserBoxComponentLinkFragment = graphql`fragment TeaserBoxComponentLink on TeaserBoxComponentLink {
  label__2879
  variant__aef7
  size__f9e3
  className__e53a
  icon__c8bc {
    ...IconComponentNoNesting
  }
  iconBefore__e3e2
  iconAfter__0381
  dataComponent__6581
  fillAnimation__3883
  iconAnimation__de53
  href__81a9
  newTab__8646
  hidden__8022
}
`

export const LogoTilesComponentFragment = graphql`fragment LogoTilesComponent on LogoTilesComponent {
  logos__8ff6 {
    ...PictureComponentNoNesting
  }
  internalType
}
`

export const TeaserRowComponentFragment = graphql`fragment TeaserRowComponent on TeaserRowComponent {
  topic__eb4b
  text__003d
  darkStyle__4848
  link__2757 {
    ...TeaserRowComponentLinkNoNesting
  }
  internalType
}
`

export const TeaserRowComponentLinkFragment = graphql`fragment TeaserRowComponentLink on TeaserRowComponentLink {
  label__a6f8
  variant__86d9
  size__2530
  className__ad8d
  icon__b08c {
    ...IconComponentNoNesting
  }
  iconBefore__984e
  iconAfter__7ed4
  dataComponent__b7c0
  fillAnimation__bc5a
  iconAnimation__ed85
  href__98a1
  newTab__69f7
  hidden__3cb3
}
`

export const SliderComponentFragment = graphql`fragment SliderComponent on SliderComponent {
  autoplay__5854
  className__6e21
  component__655b
  arrows__f98f
  internalType
}
`

export const TeaserComponentFragment = graphql`fragment TeaserComponent on TeaserComponent {
  topic__d049
  text__cc83
  darkStyle__d107
  link__a055 {
    ...TeaserComponentLinkNoNesting
  }
  internalType
}
`

export const TeaserComponentLinkFragment = graphql`fragment TeaserComponentLink on TeaserComponentLink {
  label__0cb2
  variant__664a
  size__9ba0
  className__70fc
  icon__6211 {
    ...IconComponentNoNesting
  }
  iconBefore__bf0f
  iconAfter__7e6e
  dataComponent__efae
  fillAnimation__bd8e
  iconAnimation__e67d
  href__1f3e
  newTab__ba61
  hidden__d38f
}
`

export const VisualSlidePreviewComponentFragment = graphql`fragment VisualSlidePreviewComponent on VisualSlidePreviewComponent {
  previewLabel__516c
  internalType
}
`


export const ContentBoxComponentNoNestingFragment = graphql`fragment ContentBoxComponentNoNesting on ContentBoxComponent {
  ratio__30c5
  alignement__7c67
  image__b7d7
  topic__ed87
  text__b5a1
  internalType
}
`

export const ContentBoxComponentLinkNoNestingFragment = graphql`fragment ContentBoxComponentLinkNoNesting on ContentBoxComponentLink {
  enabled__191b
  label__d5dc
  variant__282a
  size__107e
  className__7e61
  iconBefore__51ac
  iconAfter__5469
  dataComponent__4a1c
  fillAnimation__6a72
  iconAnimation__92d3
  href__5fa6
  newTab__4d0d
}
`

export const IconComponentNoNestingFragment = graphql`fragment IconComponentNoNesting on IconComponent {
  icon__dcfe
  role__ea32
  className__251a
  internalType
}
`

export const ButtonComponentNoNestingFragment = graphql`fragment ButtonComponentNoNesting on ButtonComponent {
  label__634c
  variant__c8d5
  size__1735
  className__f69c
  iconBefore__ce4f
  iconAfter__9214
  dataComponent__fb24
  fillAnimation__a843
  iconAnimation__a42f
  typeAttr__b95e
  value__ed44
  name__6a5d
  disabled__f1d0
  internalType
}
`

export const DividerComponentNoNestingFragment = graphql`fragment DividerComponentNoNesting on DividerComponent {
  variant__fdb0
  internalType
}
`

export const HeadlineComponentNoNestingFragment = graphql`fragment HeadlineComponentNoNesting on HeadlineComponent {
  level__503c
  align__498d
  content__3cc5
  subheadline__aa93
  spaceAfter__6f7d
  pageHeader__5c3f
  internalType
}
`

export const LightboxLazyImageComponentNoNestingFragment = graphql`fragment LightboxLazyImageComponentNoNesting on LightboxLazyImageComponent {
  thumb__64b3
  image__0dd8
  width__5f4a
  height__eeb9
  zoomIcon__8de6
  caption__dc74
  hideCaption__668c
  gallery__d524
  id__5744
  class__b1f4
  internalType
}
`

export const LinkButtonComponentNoNestingFragment = graphql`fragment LinkButtonComponentNoNesting on LinkButtonComponent {
  label__b988
  variant__a43d
  size__942c
  className__8726
  iconBefore__7991
  iconAfter__c8b6
  dataComponent__8d9e
  fillAnimation__2a89
  iconAnimation__9933
  href__11db
  newTab__dc35
  internalType
}
`

export const PictureComponentNoNestingFragment = graphql`fragment PictureComponentNoNesting on PictureComponent {
  src__197b
  srcSet__866d
  alt__1f75
  width__4691
  height__23ff
  className__a117
  id__9f67
  itemProp__ba17
  style__ccee
  objectFit__1269
  noscript__ec26
  lazy__55bf
  pictureClassName__9f3e
  internalType
}
`

export const PictureComponentSourcesNoNestingFragment = graphql`fragment PictureComponentSourcesNoNesting on PictureComponentSources {
  srcSet__866d
  media__420c
  type__5ef8
}
`

export const SectionComponentNoNestingFragment = graphql`fragment SectionComponentNoNesting on SectionComponent {
  width__c976
  gutter__7060
  mode__123d
  background__44d0
  spaceBefore__8a4a
  spaceAfter__9774
  internalType
}
`

export const QuotesSliderComponentNoNestingFragment = graphql`fragment QuotesSliderComponentNoNesting on QuotesSliderComponent {
  internalType
}
`

export const QuoteComponentNoNestingFragment = graphql`fragment QuoteComponentNoNesting on QuoteComponent {
  image__f09b
  text__b65e
  source__86ac
  date__3f4e
  internalType
}
`

export const ToggleComponentNoNestingFragment = graphql`fragment ToggleComponentNoNesting on ToggleComponent {
  id__788a
  name__f2d9
  checked__90a6
  disabled__d11c
  internalType
}
`

export const TagLabelComponentNoNestingFragment = graphql`fragment TagLabelComponentNoNesting on TagLabelComponent {
  label__7246
  size__d93f
  link__6ced
  removable__7eaf
  internalType
}
`

export const VisualComponentNoNestingFragment = graphql`fragment VisualComponentNoNesting on VisualComponent {
  height__f2ca
  overlay__6df1
  backgroundColor__4ca8
  inbox__8206
  skipButton__bf9d
  className__d3dc
  internalType
}
`

export const VisualComponentMediaNoNestingFragment = graphql`fragment VisualComponentMediaNoNesting on VisualComponentMedia {
  mode__0c0c
}
`

export const VisualComponentMediaImageNoNestingFragment = graphql`fragment VisualComponentMediaImageNoNesting on VisualComponentMediaImage {
  srcMobile__d852
  srcTablet__5f96
  srcDesktop__6fc8
  indent__a206
  alt__0d80
}
`

export const VisualComponentMediaVideoNoNestingFragment = graphql`fragment VisualComponentMediaVideoNoNesting on VisualComponentMediaVideo {
  srcMobile__d852
  srcTablet__5f96
  srcDesktop__6fc8
}
`

export const VisualComponentBoxNoNestingFragment = graphql`fragment VisualComponentBoxNoNesting on VisualComponentBox {
  enabled__2a36
  headline__6888
  text__e470
  indent__a206
  horizontal__c3de
  vertical__f41c
  background__c2d1
}
`

export const VisualComponentBoxLinkNoNestingFragment = graphql`fragment VisualComponentBoxLinkNoNesting on VisualComponentBoxLink {
  enabled__2a36
  label__3a22
  variant__8ad7
  size__9939
  className__d3dc
  iconBefore__ed1a
  iconAfter__82f7
  dataComponent__37f1
  fillAnimation__e697
  iconAnimation__87e9
  href__8857
  newTab__449f
}
`

export const VisualSliderComponentNoNestingFragment = graphql`fragment VisualSliderComponentNoNesting on VisualSliderComponent {
  autoplay__e333
  internalType
}
`

export const VisualSliderComponentSlidesNoNestingFragment = graphql`fragment VisualSliderComponentSlidesNoNesting on VisualSliderComponentSlides {
  height__f2ca
  overlay__6df1
  backgroundColor__4ca8
  inbox__8206
  skipButton__bf9d
  className__d3dc
  internalType__aecc
  label__cd20
}
`

export const VisualSliderComponentSlidesMediaNoNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaNoNesting on VisualSliderComponentSlidesMedia {
  mode__c9af
}
`

export const VisualSliderComponentSlidesMediaImageNoNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaImageNoNesting on VisualSliderComponentSlidesMediaImage {
  srcMobile__3296
  srcTablet__ec7d
  srcDesktop__7ece
  indent__73f9
  alt__686c
}
`

export const VisualSliderComponentSlidesMediaVideoNoNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaVideoNoNesting on VisualSliderComponentSlidesMediaVideo {
  srcMobile__3296
  srcTablet__ec7d
  srcDesktop__7ece
}
`

export const VisualSliderComponentSlidesBoxNoNestingFragment = graphql`fragment VisualSliderComponentSlidesBoxNoNesting on VisualSliderComponentSlidesBox {
  enabled__bbdd
  headline__841b
  text__d008
  indent__73f9
  horizontal__9f0a
  vertical__fd20
  background__7293
}
`

export const VisualSliderComponentSlidesBoxLinkNoNestingFragment = graphql`fragment VisualSliderComponentSlidesBoxLinkNoNesting on VisualSliderComponentSlidesBoxLink {
  enabled__bbdd
  label__cd20
  variant__9cf5
  size__0caa
  className__ce8d
  iconBefore__f3d8
  iconAfter__5027
  dataComponent__fb41
  fillAnimation__a759
  iconAnimation__0e1c
  href__d3a7
  newTab__0a14
}
`

export const ContactComponentNoNestingFragment = graphql`fragment ContactComponentNoNesting on ContactComponent {
  title__5426
  subtitle__92ac
  phone__520b
  email__70d5
  copy__cda3
  internalType
}
`

export const StorytellingComponentNoNestingFragment = graphql`fragment StorytellingComponentNoNesting on StorytellingComponent {
  backgroundImage__cb66
  backgroundColor__291a
  full__be79
  internalType
}
`

export const StorytellingComponentImageNoNestingFragment = graphql`fragment StorytellingComponentImageNoNesting on StorytellingComponentImage {
  source__20fd
  ratio__f5fa
  vAlign__9bd7
  hAlign__9705
}
`

export const StorytellingComponentImageOrderNoNestingFragment = graphql`fragment StorytellingComponentImageOrderNoNesting on StorytellingComponentImageOrder {
  mobileImageLast__f625
  desktopImageLast__ed82
}
`

export const StorytellingComponentBoxNoNestingFragment = graphql`fragment StorytellingComponentBoxNoNesting on StorytellingComponentBox {
  text__a401
  textAlign__4df6
  textColor__ad35
  vAlign__9bd7
  hAlign__9705
}
`

export const CollapsibleBoxComponentNoNestingFragment = graphql`fragment CollapsibleBoxComponentNoNesting on CollapsibleBoxComponent {
  summary__919d
  text__9abc
  internalType
}
`

export const CountUpComponentNoNestingFragment = graphql`fragment CountUpComponentNoNesting on CountUpComponent {
  to__fc5f
  topic__b6c8
  text__0f41
  internalType
}
`

export const TextMediaComponentNoNestingFragment = graphql`fragment TextMediaComponentNoNesting on TextMediaComponent {
  text__117a
  mediaAlignment__0da3
  internalType
}
`

export const VideoNoNestingFragment = graphql`fragment VideoNoNesting on Video {
  full__b18e
}
`

export const VideoVideoNoNestingFragment = graphql`fragment VideoVideoNoNesting on VideoVideo {
  src__25d9
  iframe__a598
  title__d5d3
  width__eaae
  height__b435
}
`

export const ImageNoNestingFragment = graphql`fragment ImageNoNesting on Image {
  full__b18e
}
`

export const LightboxImageNoNestingFragment = graphql`fragment LightboxImageNoNesting on LightboxImage {
  full__b18e
}
`

export const TeaserBoxComponentNoNestingFragment = graphql`fragment TeaserBoxComponentNoNesting on TeaserBoxComponent {
  topic__8a0d
  text__da70
  darkStyle__b59c
  image__5eb9
  ratio__d62c
  imageSpacing__2828
  internalType
}
`

export const TeaserBoxComponentLinkNoNestingFragment = graphql`fragment TeaserBoxComponentLinkNoNesting on TeaserBoxComponentLink {
  label__2879
  variant__aef7
  size__f9e3
  className__e53a
  iconBefore__e3e2
  iconAfter__0381
  dataComponent__6581
  fillAnimation__3883
  iconAnimation__de53
  href__81a9
  newTab__8646
  hidden__8022
}
`

export const LogoTilesComponentNoNestingFragment = graphql`fragment LogoTilesComponentNoNesting on LogoTilesComponent {
  internalType
}
`

export const TeaserRowComponentNoNestingFragment = graphql`fragment TeaserRowComponentNoNesting on TeaserRowComponent {
  topic__eb4b
  text__003d
  darkStyle__4848
  internalType
}
`

export const TeaserRowComponentLinkNoNestingFragment = graphql`fragment TeaserRowComponentLinkNoNesting on TeaserRowComponentLink {
  label__a6f8
  variant__86d9
  size__2530
  className__ad8d
  iconBefore__984e
  iconAfter__7ed4
  dataComponent__b7c0
  fillAnimation__bc5a
  iconAnimation__ed85
  href__98a1
  newTab__69f7
  hidden__3cb3
}
`

export const SliderComponentNoNestingFragment = graphql`fragment SliderComponentNoNesting on SliderComponent {
  autoplay__5854
  className__6e21
  component__655b
  arrows__f98f
  internalType
}
`

export const TeaserComponentNoNestingFragment = graphql`fragment TeaserComponentNoNesting on TeaserComponent {
  topic__d049
  text__cc83
  darkStyle__d107
  internalType
}
`

export const TeaserComponentLinkNoNestingFragment = graphql`fragment TeaserComponentLinkNoNesting on TeaserComponentLink {
  label__0cb2
  variant__664a
  size__9ba0
  className__70fc
  iconBefore__bf0f
  iconAfter__7e6e
  dataComponent__efae
  fillAnimation__bd8e
  iconAnimation__e67d
  href__1f3e
  newTab__ba61
  hidden__d38f
}
`

export const VisualSlidePreviewComponentNoNestingFragment = graphql`fragment VisualSlidePreviewComponentNoNesting on VisualSlidePreviewComponent {
  previewLabel__516c
  internalType
}
`


export const ContentBoxComponentDeepNestingFragment = graphql`fragment ContentBoxComponentDeepNesting on ContentBoxComponent {
  ratio__30c5
  alignement__7c67
  image__b7d7
  topic__ed87
  text__b5a1
  link__4433 {
    ...ContentBoxComponentLinkDeepNesting
  }
  internalType
}
`

export const ContentBoxComponentLinkDeepNestingFragment = graphql`fragment ContentBoxComponentLinkDeepNesting on ContentBoxComponentLink {
  enabled__191b
  label__d5dc
  variant__282a
  size__107e
  className__7e61
  icon__ba1c {
    ...IconComponentDeepNesting
  }
  iconBefore__51ac
  iconAfter__5469
  dataComponent__4a1c
  fillAnimation__6a72
  iconAnimation__92d3
  href__5fa6
  newTab__4d0d
}
`

export const IconComponentDeepNestingFragment = graphql`fragment IconComponentDeepNesting on IconComponent {
  icon__dcfe
  role__ea32
  className__251a
  internalType
}
`

export const ButtonComponentDeepNestingFragment = graphql`fragment ButtonComponentDeepNesting on ButtonComponent {
  label__634c
  variant__c8d5
  size__1735
  className__f69c
  icon__b287 {
    ...IconComponentDeepNesting
  }
  iconBefore__ce4f
  iconAfter__9214
  dataComponent__fb24
  fillAnimation__a843
  iconAnimation__a42f
  typeAttr__b95e
  value__ed44
  name__6a5d
  disabled__f1d0
  internalType
}
`

export const DividerComponentDeepNestingFragment = graphql`fragment DividerComponentDeepNesting on DividerComponent {
  variant__fdb0
  internalType
}
`

export const HeadlineComponentDeepNestingFragment = graphql`fragment HeadlineComponentDeepNesting on HeadlineComponent {
  level__503c
  align__498d
  content__3cc5
  subheadline__aa93
  spaceAfter__6f7d
  pageHeader__5c3f
  internalType
}
`

export const LightboxLazyImageComponentDeepNestingFragment = graphql`fragment LightboxLazyImageComponentDeepNesting on LightboxLazyImageComponent {
  thumb__64b3
  image__0dd8
  width__5f4a
  height__eeb9
  zoomIcon__8de6
  caption__dc74
  hideCaption__668c
  gallery__d524
  id__5744
  class__b1f4
  internalType
}
`

export const LinkButtonComponentDeepNestingFragment = graphql`fragment LinkButtonComponentDeepNesting on LinkButtonComponent {
  label__b988
  variant__a43d
  size__942c
  className__8726
  icon__157f {
    ...IconComponentDeepNesting
  }
  iconBefore__7991
  iconAfter__c8b6
  dataComponent__8d9e
  fillAnimation__2a89
  iconAnimation__9933
  href__11db
  newTab__dc35
  internalType
}
`

export const PictureComponentDeepNestingFragment = graphql`fragment PictureComponentDeepNesting on PictureComponent {
  src__197b
  srcSet__866d
  alt__1f75
  width__4691
  height__23ff
  className__a117
  id__9f67
  itemProp__ba17
  style__ccee
  objectFit__1269
  noscript__ec26
  lazy__55bf
  sources__a109 {
    ...PictureComponentSourcesDeepNesting
  }
  pictureClassName__9f3e
  internalType
}
`

export const PictureComponentSourcesDeepNestingFragment = graphql`fragment PictureComponentSourcesDeepNesting on PictureComponentSources {
  srcSet__866d
  media__420c
  type__5ef8
}
`

export const SectionComponentDeepNestingFragment = graphql`fragment SectionComponentDeepNesting on SectionComponent {
  width__c976
  gutter__7060
  mode__123d
  content__2cb4 {
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
  background__44d0
  spaceBefore__8a4a
  spaceAfter__9774
  headline__77a3 {
    ...HeadlineComponentDeepNesting
  }
  internalType
}
`

export const QuotesSliderComponentDeepNestingFragment = graphql`fragment QuotesSliderComponentDeepNesting on QuotesSliderComponent {
  slides__d47f {
    ...QuoteComponentDeepNesting
  }
  internalType
}
`

export const QuoteComponentDeepNestingFragment = graphql`fragment QuoteComponentDeepNesting on QuoteComponent {
  image__f09b
  text__b65e
  source__86ac
  date__3f4e
  internalType
}
`

export const ToggleComponentDeepNestingFragment = graphql`fragment ToggleComponentDeepNesting on ToggleComponent {
  id__788a
  name__f2d9
  checked__90a6
  disabled__d11c
  internalType
}
`

export const TagLabelComponentDeepNestingFragment = graphql`fragment TagLabelComponentDeepNesting on TagLabelComponent {
  label__7246
  size__d93f
  link__6ced
  removable__7eaf
  internalType
}
`

export const VisualComponentDeepNestingFragment = graphql`fragment VisualComponentDeepNesting on VisualComponent {
  height__f2ca
  media__8f99 {
    ...VisualComponentMediaDeepNesting
  }
  overlay__6df1
  box__5bd7 {
    ...VisualComponentBoxDeepNesting
  }
  backgroundColor__4ca8
  inbox__8206
  skipButton__bf9d
  className__d3dc
  internalType
}
`

export const VisualComponentMediaDeepNestingFragment = graphql`fragment VisualComponentMediaDeepNesting on VisualComponentMedia {
  mode__0c0c
  image__e376 {
    ...VisualComponentMediaImageDeepNesting
  }
  video__a9a8 {
    ...VisualComponentMediaVideoDeepNesting
  }
}
`

export const VisualComponentMediaImageDeepNestingFragment = graphql`fragment VisualComponentMediaImageDeepNesting on VisualComponentMediaImage {
  srcMobile__d852
  srcTablet__5f96
  srcDesktop__6fc8
  indent__a206
  alt__0d80
}
`

export const VisualComponentMediaVideoDeepNestingFragment = graphql`fragment VisualComponentMediaVideoDeepNesting on VisualComponentMediaVideo {
  srcMobile__d852
  srcTablet__5f96
  srcDesktop__6fc8
}
`

export const VisualComponentBoxDeepNestingFragment = graphql`fragment VisualComponentBoxDeepNesting on VisualComponentBox {
  enabled__2a36
  headline__6888
  text__e470
  link__76eb {
    ...VisualComponentBoxLinkDeepNesting
  }
  indent__a206
  horizontal__c3de
  vertical__f41c
  background__c2d1
}
`

export const VisualComponentBoxLinkDeepNestingFragment = graphql`fragment VisualComponentBoxLinkDeepNesting on VisualComponentBoxLink {
  enabled__2a36
  label__3a22
  variant__8ad7
  size__9939
  className__d3dc
  icon__8111 {
    ...IconComponentDeepNesting
  }
  iconBefore__ed1a
  iconAfter__82f7
  dataComponent__37f1
  fillAnimation__e697
  iconAnimation__87e9
  href__8857
  newTab__449f
}
`

export const VisualSliderComponentDeepNestingFragment = graphql`fragment VisualSliderComponentDeepNesting on VisualSliderComponent {
  autoplay__e333
  slides__e195 {
    ...VisualSliderComponentSlidesDeepNesting
  }
  internalType
}
`

export const VisualSliderComponentSlidesDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesDeepNesting on VisualSliderComponentSlides {
  height__f2ca
  media__8f99 {
    ...VisualSliderComponentSlidesMediaDeepNesting
  }
  overlay__6df1
  box__5bd7 {
    ...VisualSliderComponentSlidesBoxDeepNesting
  }
  backgroundColor__4ca8
  inbox__8206
  skipButton__bf9d
  className__d3dc
  internalType__aecc
  label__cd20
}
`

export const VisualSliderComponentSlidesMediaDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaDeepNesting on VisualSliderComponentSlidesMedia {
  mode__c9af
  image__417b {
    ...VisualSliderComponentSlidesMediaImageDeepNesting
  }
  video__053f {
    ...VisualSliderComponentSlidesMediaVideoDeepNesting
  }
}
`

export const VisualSliderComponentSlidesMediaImageDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaImageDeepNesting on VisualSliderComponentSlidesMediaImage {
  srcMobile__3296
  srcTablet__ec7d
  srcDesktop__7ece
  indent__73f9
  alt__686c
}
`

export const VisualSliderComponentSlidesMediaVideoDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesMediaVideoDeepNesting on VisualSliderComponentSlidesMediaVideo {
  srcMobile__3296
  srcTablet__ec7d
  srcDesktop__7ece
}
`

export const VisualSliderComponentSlidesBoxDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesBoxDeepNesting on VisualSliderComponentSlidesBox {
  enabled__bbdd
  headline__841b
  text__d008
  link__95a0 {
    ...VisualSliderComponentSlidesBoxLinkDeepNesting
  }
  indent__73f9
  horizontal__9f0a
  vertical__fd20
  background__7293
}
`

export const VisualSliderComponentSlidesBoxLinkDeepNestingFragment = graphql`fragment VisualSliderComponentSlidesBoxLinkDeepNesting on VisualSliderComponentSlidesBoxLink {
  enabled__bbdd
  label__cd20
  variant__9cf5
  size__0caa
  className__ce8d
  icon__2395 {
    ...IconComponentDeepNesting
  }
  iconBefore__f3d8
  iconAfter__5027
  dataComponent__fb41
  fillAnimation__a759
  iconAnimation__0e1c
  href__d3a7
  newTab__0a14
}
`

export const ContactComponentDeepNestingFragment = graphql`fragment ContactComponentDeepNesting on ContactComponent {
  image__a463 {
    ...PictureComponentDeepNesting
  }
  title__5426
  subtitle__92ac
  phone__520b
  email__70d5
  copy__cda3
  internalType
}
`

export const StorytellingComponentDeepNestingFragment = graphql`fragment StorytellingComponentDeepNesting on StorytellingComponent {
  backgroundImage__cb66
  backgroundColor__291a
  full__be79
  image__cc97 {
    ...StorytellingComponentImageDeepNesting
  }
  box__5f7a {
    ...StorytellingComponentBoxDeepNesting
  }
  internalType
}
`

export const StorytellingComponentImageDeepNestingFragment = graphql`fragment StorytellingComponentImageDeepNesting on StorytellingComponentImage {
  source__20fd
  ratio__f5fa
  vAlign__9bd7
  hAlign__9705
  order__eda1 {
    ...StorytellingComponentImageOrderDeepNesting
  }
}
`

export const StorytellingComponentImageOrderDeepNestingFragment = graphql`fragment StorytellingComponentImageOrderDeepNesting on StorytellingComponentImageOrder {
  mobileImageLast__f625
  desktopImageLast__ed82
}
`

export const StorytellingComponentBoxDeepNestingFragment = graphql`fragment StorytellingComponentBoxDeepNesting on StorytellingComponentBox {
  headline__7c3f {
    ...HeadlineComponentDeepNesting
  }
  text__a401
  textAlign__4df6
  textColor__ad35
  vAlign__9bd7
  hAlign__9705
  link__5d0d {
    ...LinkButtonComponentDeepNesting
  }
}
`

export const CollapsibleBoxComponentDeepNestingFragment = graphql`fragment CollapsibleBoxComponentDeepNesting on CollapsibleBoxComponent {
  summary__919d
  text__9abc
  internalType
}
`

export const CountUpComponentDeepNestingFragment = graphql`fragment CountUpComponentDeepNesting on CountUpComponent {
  to__fc5f
  icon__ed13 {
    ...IconComponentDeepNesting
  }
  topic__b6c8
  text__0f41
  link__ac78 {
    ...LinkButtonComponentDeepNesting
  }
  internalType
}
`

export const TextMediaComponentDeepNestingFragment = graphql`fragment TextMediaComponentDeepNesting on TextMediaComponent {
  text__117a
  mediaAlignment__0da3
  media__d3b5 {
    ...VideoDeepNesting,
    ...ImageDeepNesting,
    ...LightboxImageDeepNesting
  }
  internalType
}
`

export const VideoDeepNestingFragment = graphql`fragment VideoDeepNesting on Video {
  video__e832 {
    ...VideoVideoDeepNesting
  }
  full__b18e
}
`

export const VideoVideoDeepNestingFragment = graphql`fragment VideoVideoDeepNesting on VideoVideo {
  src__25d9
  iframe__a598
  title__d5d3
  width__eaae
  height__b435
}
`

export const ImageDeepNestingFragment = graphql`fragment ImageDeepNesting on Image {
  image__aea8 {
    ...PictureComponentDeepNesting
  }
  full__b18e
}
`

export const LightboxImageDeepNestingFragment = graphql`fragment LightboxImageDeepNesting on LightboxImage {
  lightboxImage__9a34 {
    ...LightboxLazyImageComponentDeepNesting
  }
  full__b18e
}
`

export const TeaserBoxComponentDeepNestingFragment = graphql`fragment TeaserBoxComponentDeepNesting on TeaserBoxComponent {
  topic__8a0d
  text__da70
  darkStyle__b59c
  link__884d {
    ...TeaserBoxComponentLinkDeepNesting
  }
  image__5eb9
  ratio__d62c
  imageSpacing__2828
  internalType
}
`

export const TeaserBoxComponentLinkDeepNestingFragment = graphql`fragment TeaserBoxComponentLinkDeepNesting on TeaserBoxComponentLink {
  label__2879
  variant__aef7
  size__f9e3
  className__e53a
  icon__c8bc {
    ...IconComponentDeepNesting
  }
  iconBefore__e3e2
  iconAfter__0381
  dataComponent__6581
  fillAnimation__3883
  iconAnimation__de53
  href__81a9
  newTab__8646
  hidden__8022
}
`

export const LogoTilesComponentDeepNestingFragment = graphql`fragment LogoTilesComponentDeepNesting on LogoTilesComponent {
  logos__8ff6 {
    ...PictureComponentDeepNesting
  }
  internalType
}
`

export const TeaserRowComponentDeepNestingFragment = graphql`fragment TeaserRowComponentDeepNesting on TeaserRowComponent {
  topic__eb4b
  text__003d
  darkStyle__4848
  link__2757 {
    ...TeaserRowComponentLinkDeepNesting
  }
  internalType
}
`

export const TeaserRowComponentLinkDeepNestingFragment = graphql`fragment TeaserRowComponentLinkDeepNesting on TeaserRowComponentLink {
  label__a6f8
  variant__86d9
  size__2530
  className__ad8d
  icon__b08c {
    ...IconComponentDeepNesting
  }
  iconBefore__984e
  iconAfter__7ed4
  dataComponent__b7c0
  fillAnimation__bc5a
  iconAnimation__ed85
  href__98a1
  newTab__69f7
  hidden__3cb3
}
`

export const SliderComponentDeepNestingFragment = graphql`fragment SliderComponentDeepNesting on SliderComponent {
  autoplay__5854
  className__6e21
  component__655b
  arrows__f98f
  internalType
}
`

export const TeaserComponentDeepNestingFragment = graphql`fragment TeaserComponentDeepNesting on TeaserComponent {
  topic__d049
  text__cc83
  darkStyle__d107
  link__a055 {
    ...TeaserComponentLinkDeepNesting
  }
  internalType
}
`

export const TeaserComponentLinkDeepNestingFragment = graphql`fragment TeaserComponentLinkDeepNesting on TeaserComponentLink {
  label__0cb2
  variant__664a
  size__9ba0
  className__70fc
  icon__6211 {
    ...IconComponentDeepNesting
  }
  iconBefore__bf0f
  iconAfter__7e6e
  dataComponent__efae
  fillAnimation__bd8e
  iconAnimation__e67d
  href__1f3e
  newTab__ba61
  hidden__d38f
}
`

export const VisualSlidePreviewComponentDeepNestingFragment = graphql`fragment VisualSlidePreviewComponentDeepNesting on VisualSlidePreviewComponent {
  previewLabel__516c
  internalType
}
`



