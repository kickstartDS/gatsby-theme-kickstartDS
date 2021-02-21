exports.createSchemaCustomization = ({ actions, schema }, themeOptions) => {
  const { createTypes } = actions

  createTypes(`interface KickstartDSPost @nodeInterface {
      id: ID!
      title: String!
  }`);

  createTypes(
    schema.buildObjectType({
      name: `KickstartDSWordpressPost`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
      },
      interfaces: [`Node`, `KickstartDSPost`],
    })
  );
}
