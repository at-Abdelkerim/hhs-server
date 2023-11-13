import { model, Schema, SchemaTypes } from "mongoose";

const name = new Schema({
  first: {
    type: String,
    lowercase: true,
    required: true,
  },
  father: {
    type: String,
    lowercase: true,
    required: true,
  },
  last: {
    type: String,
    lowercase: true,
    required: true,
  },
});
const address = new Schema({
  region: {
    type: String,
    lowercase: true,
    required: true,
    default: "amhara",
  },
  zone: {
    type: String,
    lowercase: true,
    required: true,
    default: "south wollo",
  },
  wereda: {
    type: String,
    lowercase: true,
    required: true,
    default: "harbu",
  },
  kebele: {
    type: Number,
    min: 1,
    max: 100,
    required: true,
  },
  subKebele: {
    type: Number,
    min: 1,
    max: 50,
    required: true,
  },
});

export default {
  User: new model(
    "user",
    new Schema({
      id: {
        type: SchemaTypes.ObjectId,
        required: true,
      },
      role: {
        type: String,
        lowercase: true,
        required: true,
      },
      tel: {
        type: Number,
        min: 700000000,
        max: 999999999,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        lowercase: true,
        required: true,
      },
    })
  ),
  Registrar: new model("registrar", new Schema({})),
  Teacher: new model(
    "teacher",
    new Schema({
      name: name,
      gender: {
        type: String,
        lowercase: true,
        required: true,
        enum: ["male", "female"],
      },
      birthDate: {
        type: Date,
        required: true,
      },
      address: address,
      department: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "department",
      },
      homeRoom: {
        type: SchemaTypes.ObjectId,
        unique: true,
        ref: "class",
      },
    })
  ),
  Student: new model(
    "student",
    new Schema({
      name: name,
      gender: {
        type: String,
        lowercase: true,
        required: true,
        enum: ["male", "female"],
      },
      birthDate: {
        type: Date,
        required: true,
      },
      address: address,
      reference: [
        {
          type: SchemaTypes.ObjectId,
          required: true,
          unique: true,
          ref: "parent",
        },
      ],
      class: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "class",
      },
    })
  ),
  Parent: new model(
    "parent",
    new Schema({
      name: name,
      gender: {
        type: String,
        lowercase: true,
        required: true,
        enum: ["male", "female"],
      },
      birthDate: {
        type: Date,
        required: true,
      },
      address: address,
      child: [
        {
          type: SchemaTypes.ObjectId,
          unique: true,
          required: true,
          ref: "student",
        },
      ],
    })
  ),
  Class: new model(
    "class",
    new Schema({
      grade: {
        type: Number,
        min: 9,
        max: 12,
        immutable: true,
        required: true,
        default: 9,
      },
      section: {
        type: String,
        lowercase: true,
        maxLength: 1,
        immutable: true,
        required: true,
      },
      stream: {
        type: String,
        lowercase: true,
        immutable: true,
        required: true,
        enum: ["common", "natural", "social"],
        default: "common",
      },
      homeRoomTeacher: {
        type: SchemaTypes.ObjectId,
        unique: true,
        ref: "teacher",
      },
      teachers: [
        {
          type: SchemaTypes.ObjectId,
          unique: true,
          ref: "teacher",
        },
      ],
    })
  ),
  Department: new model(
    "department",
    new Schema({
      name: {
        type: String,
        lowercase: true,
        unique: true,
        immutable: true,
        required: true,
      },
      head: {
        type: SchemaTypes.ObjectId,
        unique: true,
        ref: "teacher",
      },
    })
  ),
};
