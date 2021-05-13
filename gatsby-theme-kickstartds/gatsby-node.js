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
    name: `KickstartDsContentComponent`,
    fields: {
      text: 'String',
    },
    resolveType: value => `${pascalCase(value.type)}Schema`,
  })

  createTypes([`
    """
    Count Up GraphQL: Component to to increase a number up to a final value
    """
    type CountUpSchema implements KickstartDsContentComponent {
      """Number: Final number to count to"""
      to: Int!
    
      """Icon: Icon"""
      icon: CountUpSchemaIcon
    
      """Topic: Topic for the count-up box. Displayed before the text, in bold"""
      topic: String
    
      """Text content: Copy text for the element"""
      text: String
    
      """Link Button: link-button"""
      link: CountUpSchemaLink
    }
    
    """Icon: Icon"""
    type CountUpSchemaIcon {
      """Icon identifier"""
      icon: String
    
      """Aria role"""
      role: String
    
      """additional class"""
      className: String
    }
    
    """Link Button: link-button"""
    type CountUpSchemaLink {
      """Label: Text used on button"""
      label: String!
    
      """Button Style: Choose one of the styles from the list"""
      variant: CountUpSchemaLinkVariant!
    
      """Button Size: Choose a size between small, medium and large"""
      size: CountUpSchemaLinkSize!
    
      """
      Additional Classes: Add additional css classes that should be applied to the button
      """
      className: String
    
      """Icon: Icon"""
      icon: CountUpSchemaLinkIcon
    
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
    }
    
    """Icon: Icon"""
    type CountUpSchemaLinkIcon {
      """Icon identifier"""
      icon: String
    
      """Aria role"""
      role: String
    
      """additional class"""
      className: String
    }
    
    """Button Size: Choose a size between small, medium and large"""
    enum CountUpSchemaLinkSize {
      small
      medium
      large
    }
    
    """Button Style: Choose one of the styles from the list"""
    enum CountUpSchemaLinkVariant {
      solid
      solid_inverted
      clear
      clear_inverted
      outline
      outline_inverted
    }

    """
    Content Box GraphQL: Component to display content in a condensed, boxed form
    """
    type ContentBoxSchema implements KickstartDsContentComponent {
      type: String!
      
      """
      Image ratio: Choose one of the set ratios, all ratios except 'none' stretch the image to 100% width
      """
      ratio: ContentBoxSchemaRatio!
    
      """
      Alignment: Choose an alignment for the box. For the image it only applies for a 'ratio' value of 'none'
      """
      alignement: ContentBoxSchemaAlignement!
    
      """
      Image source: Select an image to display inside the content box, at the top
      """
      image: String
    
      """Topic: Topic for the content box. Displayed before the text, in bold"""
      topic: String
    
      """Text content: Text for the content box"""
      text: String
    
      """Link: Content box link configuration"""
      link: ContentBoxSchemaLink
    }
    
    """
    Alignment: Choose an alignment for the box. For the image it only applies for a 'ratio' value of 'none'
    """
    enum ContentBoxSchemaAlignement {
      left
      center
      right
    }
    
    """Link: Content box link configuration"""
    type ContentBoxSchemaLink {
      """Display link: Toggles visibility of the link"""
      enabled: Boolean
    
      """Label: Text used on button"""
      label: String!
    
      """Button Style: Choose one of the styles from the list"""
      variant: ContentBoxSchemaLinkVariant!
    
      """Button Size: Choose a size between small, medium and large"""
      size: ContentBoxSchemaLinkSize!
    
      """
      Additional Classes: Add additional css classes that should be applied to the button
      """
      className: String
    
      """Icon: Icon"""
      icon: ContentBoxSchemaLinkIcon
    
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
    }
    
    """Icon: Icon"""
    type ContentBoxSchemaLinkIcon {
      """Icon identifier"""
      icon: String
    
      """Aria role"""
      role: String
    
      """additional class"""
      className: String
    }
    
    """Button Size: Choose a size between small, medium and large"""
    enum ContentBoxSchemaLinkSize {
      small
      medium
      large
    }
    
    """Button Style: Choose one of the styles from the list"""
    enum ContentBoxSchemaLinkVariant {
      solid
      solid_inverted
      clear
      clear_inverted
      outline
      outline_inverted
    }
    
    """
    Image ratio: Choose one of the set ratios, all ratios except 'none' stretch the image to 100% width
    """
    enum ContentBoxSchemaRatio {
      none
      VALUE_4_3
      VALUE_16_9
      VALUE_1_1
    }

    union KickstartDsContent = ContentBoxSchema

    type Container {
      width: ContainerWidth
      gutter: ContainerGutter
      mode: ContainerMode
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
    
    """Section GraphQL"""
    type SectionSchema {
      width: SectionSchemaWidth
      gutter: SectionSchemaGutter
      mode: SectionSchemaMode
      background: SectionSchemaBackground
      spaceBefore: SectionSchemaSpaceBefore
      spaceAfter: SectionSchemaSpaceAfter
    
      """Headline: Headline"""
      headline: SectionSchemaHeadline
      content: [KickstartDsContentComponent]
    }
    
    enum SectionSchemaBackground {
      default
      accent
      dark
    }
    
    enum SectionSchemaGutter {
      large
      default
      small
      none
    }
    
    """Headline: Headline"""
    type SectionSchemaHeadline {
      """Level: Select the headline level to use, or p alternatively"""
      level: SectionSchemaHeadlineLevel!
    
      """Alignment: Choose an alignment for the headline"""
      align: SectionSchemaHeadlineAlign!
    
      """Text: Text content for the headline"""
      content: String
    
      """Subheadline: Text content for the optional subheadline"""
      subheadline: String
    
      """Bottom spacing: Add additional spacing to the bottom of the headline"""
      spaceAfter: SectionSchemaHeadlineSpaceAfter!
    
      """
      Page header: Set the headline as a page header, triggering special css treatment
      """
      pageHeader: Boolean
    }
    
    """Alignment: Choose an alignment for the headline"""
    enum SectionSchemaHeadlineAlign {
      left
      center
      right
    }
    
    """Level: Select the headline level to use, or p alternatively"""
    enum SectionSchemaHeadlineLevel {
      h1
      h2
      h3
      h4
      h5
      p
    }
    
    """Bottom spacing: Add additional spacing to the bottom of the headline"""
    enum SectionSchemaHeadlineSpaceAfter {
      none
      small
      large
    }
    
    enum SectionSchemaMode {
      default
      tile
      list
    }
    
    enum SectionSchemaSpaceAfter {
      default
      small
      none
    }
    
    enum SectionSchemaSpaceBefore {
      default
      small
      none
    }
    
    enum SectionSchemaWidth {
      full
      max
      wide
      default
      narrow
    }

    interface KickstartDsPage implements Node {
      id: ID!
      layout: String!
      heading: String!
      description: String
      title: String
      date: Date @dateformat
      content: [SectionSchema]
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
