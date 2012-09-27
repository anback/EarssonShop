var bootstrapDB = function() {
    if(Users.find().count() === 0)  {
        console.log("inserting user 'Hörselexperten'");
        Users.insert({name: "Hörselexperten", password:"he", email:"he", superuser : true});
    }
}

