export default async (
	_,
	{ _id, name, gender, birthDate, address, child, cls },
	{ user, models: { Teacher, Student, Parent, Class } }
) => {
	if (user.role == "registrar") {
		return await Parent.find({
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
			...(child && { child: { $all: [child] } }),
		});
	} else if (user.role == "director") {
		return await Parent.find({
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
			...(child && { child: { $all: [child] } }),
		});
	} else if (user.role == "teacher") {
		return await Parent.find(
			{
				child: {
					$all: await Student.find(
						{
							class: {
								$in: [
									...(cls
										? await Class.find(
												{
													teachers: {
														$all: [user._id],
													},
												},
												"_id"
										  ).then((doc) =>
												doc.map((value) => value._id)
										  )
										: await Teacher.findById(
												user._id,
												"-_id homeRoom"
										  ).then((doc) => doc.homeRoom)),
								],
							},
						},
						"_id"
					).then((doc) => doc.map((value) => value._id)),
				},
				...(_id && { _id }),
				...(name?.first && { "name.first": name.first }),
				...(name?.father && { "name.father": name.father }),
				...(name?.last && { "name.last": name.last }),
			},
			"name"
		);
	} else if (user.role == "student") {
		return await Parent.find(
			{
				child: { $all: [user._id] },
				...(_id && { _id }),
				...(name?.first && { "name.first": name.first }),
				...(name?.father && { "name.father": name.father }),
				...(name?.last && { "name.last": name.last }),
			},
			"name"
		);
	} else if (user.role == "parent") {
		return await Parent.find(
			{
				child: { $all: [user._id], $ne: user._id },
				...(_id && { _id }),
				...(name?.first && { "name.first": name.first }),
				...(name?.father && { "name.father": name.father }),
				...(name?.last && { "name.last": name.last }),
			},
			"name"
		);
	}
};
