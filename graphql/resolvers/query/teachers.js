export default async (
	_,
	{ _id, name, gender, birthDate, address, department, homeRoom },
	{ user, models: { Teacher, Student, Parent } }
) => {
	if (user.role == "registrar") {
		return await Teacher.find({
			...(_id ? { _id: _id } : {}),
			...(name?.first ? { "name.first": name.first } : {}),
			...(name?.father ? { "name.father": name.father } : {}),
			...(name?.last ? { "name.last": name.last } : {}),
			...(gender ? { gender: gender } : {}),
			...(birthDate ? { birthDate: birthDate } : {}),
			...(address?.region ? { "address.region": address.region } : {}),
			...(address?.zone ? { "address.zone": address.zone } : {}),
			...(address?.wereda ? { "address.wereda": address.wereda } : {}),
			...(address?.kebele ? { "address.kebele": address.kebele } : {}),
			...(address?.subKebele
				? { "address.subKebele": address.subKebele }
				: {}),
			...(department ? { department: department } : {}),
			...(homeRoom ? { homeRoom: homeRoom } : {}),
		});
	} else if (user.role == "director") {
		return await Teacher.find({
			...(_id ? { _id: _id } : {}),
			...(name?.first ? { "name.first": name.first } : {}),
			...(name?.father ? { "name.father": name.father } : {}),
			...(name?.last ? { "name.last": name.last } : {}),
			...(gender ? { gender: gender } : {}),
			...(birthDate ? { birthDate: birthDate } : {}),
			...(address?.region ? { "address.region": address.region } : {}),
			...(address?.zone ? { "address.zone": address.zone } : {}),
			...(address?.wereda ? { "address.wereda": address.wereda } : {}),
			...(address?.kebele ? { "address.kebele": address.kebele } : {}),
			...(address?.subKebele
				? { "address.subKebele": address.subKebele }
				: {}),
			...(department ? { department: department } : {}),
			...(homeRoom ? { homeRoom: homeRoom } : {}),
		});
	} else if (user.role == "teacher") {
		const he = await Teacher.findById(
			user._id,
			"-_id department homeRoom"
		).populate({ path: "homeRoom", select: "-_id teachers" });
		return await Teacher.find(
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
				...(name?.first ? { "name.first": name.first } : {}),
				...(name?.father ? { "name.father": name.father } : {}),
				...(name?.last ? { "name.last": name.last } : {}),
			},
			"name department"
		);
	} else if (user.role == "student") {
		const he = await Student.findById(user._id, "-_id class").populate({
			path: "class",
			select: "-_id homeRoomTeacher teachers",
		});
		return await Teacher.find(
			{
				_id: {
					$or: [
						{ $in: he.class.teachers },
						{ $eq: he.class.homeRoomTeacher },
					],
					...(_id && { $eq: _id }),
				},
				...(name?.first ? { "name.first": name.first } : {}),
				...(name?.father ? { "name.father": name.father } : {}),
				...(name?.last ? { "name.last": name.last } : {}),
			},
			"name department"
		);
	} else if (user.role == "parent") {
		const he = await Parent.findById(user._id, "-_id child").populate([
			{
				path: "child",
				select: "-_id class",
				populate: {
					path: "class",
					select: "-_id homeRoomTeacher teachers",
				},
			},
		]);
		return await Teacher.find(
			{
				_id: {
					$or: [
						{ $in: he.child.class.teachers },
						{ $eq: he.child.class.homeRoomTeacher },
					],
					...(_id && { $eq: _id }),
				},
				...(name?.first ? { "name.first": name.first } : {}),
				...(name?.father ? { "name.father": name.father } : {}),
				...(name?.last ? { "name.last": name.last } : {}),
			},
			"name department"
		);
	}
};
