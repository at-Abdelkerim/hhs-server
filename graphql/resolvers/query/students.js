export default async (
	_,
	{ _id, name, gender, birthDate, address, reference, class: cls },
	{ user, models: { Teacher, Student, Parent, Class } }
) => {
	if (user.role == "registrar") {
		let students = [];
		try {
			students = await Student.find({
				...(_id && { _id }),
				...(name?.first && { "name.first": name.first }),
				...(name?.father && { "name.father": name.father }),
				...(name?.last && { "name.last": name.last }),
				...(gender && { gender }),
				...(birthDate && { birthDate }),
				...(address?.region && { "address.region": address.region }),
				...(address?.zone && { "address.zone": address.zone }),
				...(address?.wereda && { "address.wereda": address.wereda }),
				...(address?.kebele && { "address.kebele": address.kebele }),
				...(address?.subKebele && {
					"address.subKebele": address.subKebele,
				}),
				...(reference && { reference: { $all: [reference] } }),
				...(cls && { class: cls }),
			});
		} catch (err) {}
		return students;
	} else if (user.role == "director") {
		let students = [];
		try {
			students = await Student.find({
				...(_id && { _id }),
				...(name?.first && { "name.first": name.first }),
				...(name?.father && { "name.father": name.father }),
				...(name?.last && { "name.last": name.last }),
				...(gender && { gender }),
				...(birthDate && { birthDate }),
				...(address?.region && { "address.region": address.region }),
				...(address?.zone && { "address.zone": address.zone }),
				...(address?.wereda && { "address.wereda": address.wereda }),
				...(address?.kebele && { "address.kebele": address.kebele }),
				...(address?.subKebele && {
					"address.subKebele": address.subKebele,
				}),
				...(reference && { reference: { $all: [reference] } }),
				...(cls && { class: cls }),
			});
		} catch (err) {}
		return students;
	} else if (user.role == "teacher") {
		let students = [];
		try {
			students = await Student.find(
				{
					class: cls
						? {
								$in: await Class.find(
									{
										teachers: {
											$all: [user._id],
										},
									},
									"_id"
								).then((doc) => doc.map((value) => value._id)),
								$eq: cls,
						  }
						: {
								$eq: await Teacher.findById(
									user._id,
									"-_id homeRoom"
								).then((doc) => doc.homeRoom),
						  },
					...(_id && { _id }),
					...(name?.first && { "name.first": name.first }),
					...(name?.father && { "name.father": name.father }),
					...(name?.last && { "name.last": name.last }),
					...(reference && { reference: { $all: [reference] } }),
				},
				"name reference"
			);
		} catch (err) {}
		return students;
	} else if (user.role == "student") {
		let students = [];
		try {
			students = await Student.find(
				{
					class: await Student.findById(user._id, "-_id class").then(
						(doc) => doc.class
					),
					...(_id && { _id }),
					...(name?.first && { "name.first": name.first }),
					...(name?.father && { "name.father": name.father }),
					...(name?.last && { "name.last": name.last }),
				},
				"name"
			);
		} catch (err) {}
		return students;
	} else if (user.role == "parent") {
		let students = [];
		try {
			students = await Student.find(
				{
					reference: { $all: [user._id] },
					...(_id && { _id }),
					...(name?.first && { "name.first": name.first }),
					...(name?.father && { "name.father": name.father }),
					...(name?.last && { "name.last": name.last }),
					...(cls && { class: cls }),
				},
				"name reference class"
			);
		} catch (err) {}
		return students;
	}
};
