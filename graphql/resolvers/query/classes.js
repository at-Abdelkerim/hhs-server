export default async (
	_,
	{ _id, grade, section, stream, homeRoomTeacher, teachers },
	{ user, models: { Teacher, Student, Parent, Class } }
) => {
	if (user.role == "registrar") {
		const temp = await Class.find({
			...(_id && { _id }),
			...(grade && { grade }),
			...(section && { section }),
			...(stream && { stream }),
			...(homeRoomTeacher && { homeRoomTeacher }),
			...(teachers && { teachers: { $all: teachers } }),
		});
		console.log(temp);
		return temp;
	} else if (user.role == "director") {
		const temp = await Class.find({
			...(_id && { _id }),
			...(grade && { grade }),
			...(section && { section }),
			...(stream && { stream }),
			...(homeRoomTeacher && { homeRoomTeacher }),
			...(teachers && { teachers: { $all: teachers } }),
		});
		console.log(temp);
		return temp;
	} else if (user.role == "teacher") {
		const temp = await Class.find({
			$or: {
				...(teachers && { teachers: { $all: [user._id] } }),
				...(_id && {
					_id: await Teacher.findById(user._id, "-_id homeRoom").then(
						(doc) => doc.homeRoom
					),
				}),
			},
			...(grade && { grade }),
			...(section && { section }),
			...(stream && { stream }),
		});
		console.log(temp);
		return temp;
	} else if (user.role == "student") {
		const temp = await Class.find({
			...(_id && { _id: await Student.findById(user._id, "class") }).then(
				(doc) => doc.class
			),
			...(grade && { grade }),
			...(section && { section }),
			...(stream && { stream }),
		});
		console.log(temp);
		return temp;
	} else if (user.role == "parent") {
		const temp = await Class.find({
			...(_id && { _id }),
			...(grade && { grade }),
			...(section && { section }),
			...(stream && { stream }),
		});
		console.log(temp);
		return temp;
	}
};
