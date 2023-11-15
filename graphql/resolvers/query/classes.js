export default async (_, {}, { user, models: {} }) => {
	if (user.role == "registrar") {
		return [];
	} else if (user.role == "director") {
		return [];
	} else if (user.role == "teacher") {
		return [];
	} else if (user.role == "student") {
		return [];
	} else if (user.role == "parent") {
		return [];
	}
};
