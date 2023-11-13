import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { GraphQLError, defaultFieldResolver } from "graphql";

export default (schema, directiveName) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_TYPE]: (fieldConfig) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        // console.log("type1", fieldConfig);
        fieldConfig.resolve = async (source, args, context, info) => {
          if (context.user) {
            return await resolve(source, args, context, info);
          } else {
            throw new GraphQLError("You need to provid valid token", {
              extensions: { code: "UNAUTHENTICATED" },
            });
          }
        };
        console.log(
          "type1",
          fieldConfig._fields().homeRoom.astNode.directives[0].arguments[0]
            .value.values
        );
        return fieldConfig;
      }
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        // console.log(fieldConfig);
        fieldConfig.resolve = async (source, args, context, info) => {
          if (
            authDirective.role.includes("user") ||
            authDirective.role.includes(context.user.role)
          ) {
            return await resolve(source, args, context, info);
          }
          throw new GraphQLError("You have no access to get this data", {
            extensions: { code: "UNAUTHORIZED" },
          });
        };
        return fieldConfig;
      }
    },
  });
};
