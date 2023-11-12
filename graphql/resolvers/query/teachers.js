export default async (
  _,
  args,
  { user: { _id, role }, models: { Teacher, Parent } }
) => {
  if (role == "registrar") {
    const temp = await Teacher.find({});
    console.log(temp);
  } else if (role == "director") {
    const teachers = await Teacher.find({});
    console.log(teachers);
  } else if (role == "teacher") {
    const {
      hoemRoom: { teachers },
    } = await Teacher.find({ _id }, "-_id homeroom").populate(
      "homeroom",
      "-_id teachers"
    );
    console.log(teachers);
  } else if (role == "student") {
    const {
      class: { teachers },
    } = await Student.find({ _id }, "-_id class").populate(
      "class",
      "_is teachers"
    );
    console.log(teachers);
  } else if (role == "parent") {
    const {
      child: {
        class: { teachers },
      },
    } = await Parent.find({ _id }, "-_id children").populate([
      {
        path: "children",
        select: "-_id class",
        populate: {
          path: "class",
          select: "-_id teachers",
          populate: { path: "teachers" },
        },
      },
    ]);
    console.log(teachers);
  }
  return [
    {
      _id: "qwertyuiopasdfghjkl",
      name: { first: "abdelkerim", father: "ahmed", last: "mohammed" },
      gender: "male",
      birthDate: "10/06/1999",
      address: {
        region: "amhara",
        zone: "south wollo",
        wereda: "harbu",
        kebele: 1,
        subKebele: 3,
      },
      department: "asdfghjkl",
      hoemRoom: "asdfghjkl",
    },
  ];
};
