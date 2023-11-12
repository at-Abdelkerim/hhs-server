import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { GraphQLError, defaultFieldResolver } from "graphql";

export default (schema, directiveName) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async (source, args, context, info) => {
          if (context.user) {
            if (
              authDirective.role == "user" ||
              authDirective.role == context.user.role
            ) {
              return await resolve(source, args, context, info);
            }
            throw new GraphQLError("You have no access to get this data", {
              extensions: { code: "UNAUTHORIZED" },
            });
          }
          throw new GraphQLError("You need to provid valid token", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        };
        return fieldConfig;
      }
    },
  });
};
