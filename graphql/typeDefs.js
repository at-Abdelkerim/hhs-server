export default `#graphql 
    directive @auth(role:Role=user) on  FIELD_DEFINITION | OBJECT
    enum Role {
        user
        director
        registrar
        teacher
        student
        parent
    }
    enum Gender {
        male
        female
    }
    enum Stream {
        common
        natural
        social
    }
    input NameInput {
        first:String
        father:String
        last:String
    }
    input AddressInput {
        region:String
        zone:String
        wereda:String
        kebele:Int
        subKebele:Int
    } 
    type Token {
        accessToken:String!
        refreshToken:String!
    }
    type Name {
        first:String!
        father:String!
        last:String!
    } 
    type Address {
        region:String!
        zone:String!
        wereda:String!
        kebele:Int!
        subKebele:Int!
    } 
    type Teacher {
        _id:ID!
        name:Name!
        gender:Gender!
        birthDate:String!
        address:Address!
        department:String!
        homeRoom:String
    } 
    type Student {
        _id:ID!
        name:Name!
        gender:Gender!
        birthDate:String!
        address:Address!
        refrence:[String!]
        class:String!
    }
    type Parent {
        _id:ID!
        name:Name!
        gender:Gender!
        birthDate:String!
        address:Address!
        children:[String!]!
    }
    type Class {
        _id:ID!
        grade:Int!
        section:String!
        stream:Stream!
        homeRoomTeacher:String
        teachers:[String!]
    }
    type Department {
        _id:ID!
        name:String!
        head:String
    }
    type Query {
        token(tel:Int!,password:String!):Token! 
        teachers(
            _id:ID
            name:NameInput
            gender:Gender
            birthDate:String
            address:AddressInput
            department:String
            homeRoom:String
        ):[Teacher!] @auth
    }
`;
