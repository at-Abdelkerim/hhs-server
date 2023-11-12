import { model, Schema, SchemaTypes } from "mongoose";

export default {
  User: new model(
    "user",
    Schema({
      id: {
        type: SchemaTypes.ObjectId,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      tel: {
        type: Number,
        min: 700000000,
        max: 999999999,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    })
  ),
  Registrar: new model("registrar", new Schema({})),
  Teacher: new model(
    "teacher",
    new Schema({
      name: {
        first: {
          type: String,
          required: true,
        },
        father: {
          type: String,
          required: true,
        },
        last: {
          type: String,
          required: true,
        },
      },
      gender: {
        type: String,
        required: true,
      },
      birthDate: {
        type: Date,
        required: true,
      },
      address: {
        region: {
          type: String,
          required: true,
        },
        zone: {
          type: String,
          required: true,
        },
        wereda: {
          type: String,
          required: true,
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
      },
      department: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "department",
      },
    })
  ),
  Student: new model(
    "student",
    new Schema({
      name: {
        first: {
          type: String,
          required: true,
        },
        father: {
          type: String,
          required: true,
        },
        last: {
          type: String,
          required: true,
        },
      },
      gender: {
        type: String,
        required: true,
      },
      birthDate: {
        type: Date,
        required: true,
      },
      address: {
        region: {
          type: String,
          required: true,
        },
        zone: {
          type: String,
          required: true,
        },
        wereda: {
          type: String,
          required: true,
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
      },
      reference: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "parent",
      },
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
      name: {
        first: {
          type: String,
          required: true,
        },
        father: {
          type: String,
          required: true,
        },
        last: {
          type: String,
          required: true,
        },
      },
      gender: {
        type: String,
        required: true,
      },
      birthDate: {
        type: Date,
        required: true,
      },
      address: {
        region: {
          type: String,
          required: true,
        },
        zone: {
          type: String,
          required: true,
        },
        wereda: {
          type: String,
          required: true,
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
      },
      child: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "student",
      },
    })
  ),
  Class: new model(
    "class",
    new Schema({
      grade: {
        type: Number,
        min: 9,
        max: 12,
        required: true,
        immutable: true,
        default: () => 9,
      },
      section: {
        type: String,
        maxLength: 2,
        required: true,
        immutable: true,
      },
      stream: {
        type: String,
        required: true,
        immutable: true,
        default: () => "common",
      },
      homeRoomTeacher: SchemaTypes.ObjectId,
    })
  ),
  Department: new model(
    "department",
    new Schema({
      name: {
        type: String,
        required: true,
      },
      head: SchemaTypes.ObjectId,
    })
  ),
};
