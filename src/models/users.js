const fs = require("fs")
const path = require("path")
const bcrypt = require("bcryptjs")
const model = { 
    
    allUsers: path.resolve(__dirname, "../data/users.json"),
    
   
    
    readAllUsers: () => fs.readFileSync(model.allUsers),

    listAllUsers: () => JSON.parse(model.readAllUsers()),

    writeAllUsers: (data) => fs.writeFileSync(model.allUsers, JSON.stringify( data,null,2)),

    generateId: () => {
        let allUsers = model.listAllUsers();
        let lastUser = allUsers.pop();

        //si existen usuarios retorna el ultimo id +1, si no existe osea es undefined retorna 1
        return lastUser ?  lastUser.id + 1 : 1 ; 

    },

    newUser: (data) =>  Object({
            id: model.generateId(),
            isAdmin: false,
            name: data.nombreCompleto,
            email: data.email, 
            userName: data.nombreUsuario,
            birth: data.fechaNacimiento,
            adress: data.domicilio,
            profile: data.perfilUser,
            interest: data.intereses,
            file: data.file ? "/images/" + data.file : null,
            //encripto la contraseña
            password: bcrypt.hashSync(data.password)

        }),

        
    
    saveNewUser: (data) => { 
        let user = model.newUser(data)
        let allUsers = model.listAllUsers();

        allUsers.push(user);
        model.writeAllUsers(allUsers)
        return user;
    },
    findById: (id) => { 
        let allUsers = model.listAllUsers();
        let userFound = allUsers.find(oneUser => oneUser.id == id);
        return userFound ; 

    },

    //me permite encontrar usuario por propiedad,
    //property es la propiedad del objeto por ejemplo email o usuario o nombre
    //value es el email en concreto q queremos buscar
    findByProperty: (property, value) => { 

        let allUsers = model.listAllUsers();
        let userFound = allUsers.find(oneUser => oneUser[property] == value)
        return userFound ? userFound : false;
    },
    delete: (id) => {
        let allUsers = model.listAllUsers();
        let newListOfUsers = allUsers.filter(oneUser => oneUser.id !== id );
         
        model.writeAllUsers(newListOfUsers)
        return true ; 
    }

}

module.exports = model 

//console.log(model.findByProperty("email", "Rusbelt-makinsay@gmail.com"))

//console.log(model.delete(3))