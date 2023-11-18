export default async (
	_,
	{ _id, name, gender, birthDate, address, department, homeRoom },
	{ user, models: { Teacher, Student, Parent } }
) => {
	if (user.role == "registrar") {
		let teachers = [];
		try {
			teachers = await Teacher.find({
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
				...(department && { department }),
				...(homeRoom && { homeRoom }),
			});
		} catch (err) {}
		return teachers;
	} else if (user.role == "director") {
		let teachers = [];
		try {
			teachers = await Teacher.find({
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
				...(department && { department }),
				...(homeRoom && { homeRoom }),
			});
		} catch (err) {}
		return teachers;
	} else if (user.role == "teacher") {
		let teachers = [];
		try {
			const he = await Teacher.findById(
				user._id,
				"-_id department homeRoom"
			).populate({ path: "homeRoom", select: "-_id teachers" });
			teachers = await Teacher.find(
				{
					$or: [
						(!(homeRoom || department) || homeRoom) && {
							_id: { $in: he.homeRoom.teachers },
						},
						(!(homeRoom || department) || department) && {
							department: he.department,
						},
					],
					...(_id && { _id }),
					...(name?.first && { "name.first": name.first }),
					...(name?.father && { "name.father": name.father }),
					...(name?.last && { "name.last": name.last }),
				},
				"name department"
			);
		} catch (err) {}
		return teachers;
	} else if (user.role == "student") {
		let teachers = [];
		try {
			const he = await Student.findById(user._id, "-_id class").populate({
				path: "class",
				select: "-_id homeRoomTeacher teachers",
			});
			teachers = await Teacher.find(
				{
					_id: {
						$or: [
							{ $in: he.class.teachers },
							{ $eq: he.class.homeRoomTeacher },
						],
						...(_id && { $eq: _id }),
					},
					...(name?.first && { "name.first": name.first }),
					...(name?.father && { "name.father": name.father }),
					...(name?.last && { "name.last": name.last }),
					...(department && { department }),
				},
				"name department"
			);
		} catch (err) {}
		return teachers;
	} else if (user.role == "parent") {
		let teachers = [];
		try {
			const he = await Parent.findById(user._id, "-_id child").populate([
				{
					path: "child",
					select: "-_id class",
					populate: {
						path: "class",
						select: "teachers",
					},
				},
			]);
			console.log("here", he.child);
			teachers = await Teacher.find(
				{
					$or: [
						{
							_id: he.child.reduce((result, current) => {
								return [...result, ...current.class.teachers];
							}, []),
						},
						{
							homeRoom: he.child.reduce((result, current) => {
								return [...result, current.class._id];
							}, []),
						},
					],
					...(_id && { _id }),
					...(name?.first && { "name.first": name.first }),
					...(name?.father && { "name.father": name.father }),
					...(name?.last && { "name.last": name.last }),
					...(department && { department }),
				},
				"name department"
			);
		} catch (err) {}
		return teachers;
	}
};
