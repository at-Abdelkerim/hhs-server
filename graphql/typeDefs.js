export default `#graphql 
    directive @auth(role:[Role]) on  OBJECT | FIELD_DEFINITION
    enum Role { 
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
    type Teacher @auth {
        _id:ID! 
        name:Name! 
        gender:Gender! @auth(role:[registrar,director])
        birthDate:String! @auth(role:[registrar,director])
        address:Address! @auth(role:[registrar,director])
        department:ID! 
        homeRoom:ID @auth(role:[registrar,director])
    }
    type Student {
        _id:ID!
        name:Name!
        gender:Gender!
        birthDate:String!
        address:Address!
        refrence:[ID!]!
        class:ID!
    }
    type Parent {
        _id:ID!
        name:Name!
        gender:Gender!
        birthDate:String!
        address:Address!
        children:[ID!]!
    }
    type Class {
        _id:ID!
        grade:Int!
        section:String!
        stream:Stream!
        homeRoomTeacher:ID
        teachers:[ID!]
    }
    type Department {
        _id:ID!
        name:String!
        head:ID
    }
    type Query {
        token(tel:Int!,password:String!):Token! 
        teachers(
            _id:ID 
            name:NameInput 
            gender:Gender 
            birthDate:String 
            address:AddressInput 
            department:ID 
            homeRoom:ID 
        ):[Teacher!]! 
        
    }
`;
