export default async (
  _,
  { _id, name, gender, birthDate, address, department, homeRoom },
  { user, models: { Teacher, Student, Parent } }
) => {
  if (user.role == "registrar") {
    // const teachers =
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
      ...(address?.subKebele ? { "address.subKebele": address.subKebele } : {}),
      ...(department ? { department: department } : {}),
      ...(homeRoom ? { homeRoom: homeRoom } : {}),
    });
  } else if (user.role == "director") {
    // const teachers =
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
      ...(address?.subKebele ? { "address.subKebele": address.subKebele } : {}),
      ...(department ? { department: department } : {}),
      ...(homeRoom ? { homeRoom: homeRoom } : {}),
    });
  } else if (user.role == "teacher") {
    const u = await Teacher.findById(user._id, "-_id homeRoom").populate({
      path: "homeRoom",
      select: "-_id teachers",
      populate: {
        path: "teachers",
        select: "name department",
      },
    });
    return u.homeRoom.teachers;
  } else if (user.role == "student") {
    const {
      class: { teachers },
    } = await Student.findById(user._id, "-_id class").populate({
      path: "class",
      select: "-_id teachers",
      populate: {
        path: "teachers",
        match: {},
        select: "name department",
        populate: [{ path: "department", select: "name" }],
      },
    });
    return teachers;
  } else if (user.role == "parent") {
    const {
      child: {
        class: { teachers },
      },
    } = await Parent.findById(user._id, "-_id child").populate([
      {
        path: "child",
        select: "-_id class",
        populate: {
          path: "class",
          select: "-_id teachers",
          populate: {
            path: "teachers",
            match: {},
            select: "name department",
            populate: [{ path: "department", select: "name" }],
          },
        },
      },
    ]);
    return teachers;
  } else {
    return { gender: "male" };
  }
};
