import fs from "fs";

export default {
	...["Teacher", "Parent", "Class", "Department"].reduce(
		(result, current) => {
			return {
				...result,
				[current]: {
					__resolveType(source, { user: { role } }, info) {
						if (role == "registrar" || role == "director") {
							return current + "More";
						}
						if (
							role == "teacher" ||
							role == "student" ||
							role == "parent"
						) {
							return current + "Some";
						}
						throw new GraphQLError(
							"You have no access to get this data",
							{ extensions: { code: "UNAUTHORIZED" } }
						);
					},
				},
			};
		},
		{}
	),
	Student: {
		__resolveType(source, { user: { role } }, info) {
			if (role == "registrar" || role == "director")
				return "StudentForAdmin";
			else if (role == "teacher") {
				return "StudentForTeacher";
			} else if (role == "student") {
				return "StudentForStudent";
			} else if (role == "parent") {
				return "StudentForParent";
			}
			throw new GraphQLError("You have no access to get this data", {
				extensions: { code: "UNAUTHORIZED" },
			});
		},
	},
	Query: await fs
		.readdirSync("./graphql/resolvers/query")
		.reduce(async (query, file) => {
			return {
				...(await query),
				[file.split(".")[0]]: await import("./query/" + file).then(
					({ default: data }) => data
				),
			};
		}, {}),
};
