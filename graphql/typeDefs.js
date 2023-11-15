export default `#graphql 
    directive @auth on  OBJECT | FIELD_DEFINITION
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
    type TeacherSome {
        _id:ID! 
        name:Name! 
        department:ID! 
    }
    type TeacherMore  {
        _id:ID! 
        name:Name! 
        gender:Gender! 
        birthDate:String!
        address:Address! 
        department:ID! 
        homeRoom:ID 
    }
    type StudentSome {
        _id:ID!
        name:Name!
    }
    type StudentMore {
        _id:ID!
        name:Name!
        gender:Gender!
        birthDate:String!
        address:Address!
        refrence:[ID!]!
        class:ID!
    }
    type ParentSome {
        _id:ID!
        name:Name!
    }
    type ParentMore {
        _id:ID!
        name:Name!
        gender:Gender!
        birthDate:String!
        address:Address!
        child:[ID!]!
    }
    type ClassSome {
        _id:ID!
        grade:Int!
    }
    type ClassMore {
        _id:ID!
        grade:Int!
        section:String!
        stream:Stream!
        homeRoomTeacher:ID
        teachers:[ID!]
    }
    type DepartmentSome {
        _id:ID!
        name:String!
    }
    type DepartmentMore {
        _id:ID!
        name:String!
        head:ID
    }
    type Schedule {
        _id:ID!
    }
    type Attendance {
        _id:ID!
    }
    type Assignment {
        _id:ID!
    }
    union Teacher = TeacherMore | TeacherSome
    union Student = StudentMore | StudentSome
    union Parent = ParentMore | ParentSome
    union Class = ClassMore | ClassSome
    union Department = DepartmentMore | DepartmentSome 
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
        ):[Teacher!]! @auth
        students(
            _id:ID 
            name:NameInput 
            gender:Gender 
            birthDate:String 
            address:AddressInput 
            reference:[ID] 
            class:ID
        ):[Student!]! @auth
        parents(
            _id:ID 
            name:NameInput 
            gender:Gender 
            birthDate:String 
            address:AddressInput 
            child:[ID] 
        ):[Parent!]! @auth
        classes(
            _id:ID!
            grade:Int!
            section:String!
            stream:Stream!
            homeRoomTeacher:ID
            teachers:[ID!]
        ):[Class!]! @auth
        departments(
            _id:ID!
            name:String!
            head:ID
        ):[Department!]! @auth
        
    }
`;
