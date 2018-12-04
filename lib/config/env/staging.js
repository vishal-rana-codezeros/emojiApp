module.exports = {
    enviroment :'staging',
    port:process.env.PORT,
    protocol:'http',
    TAG:"staging",
    mongo:{
        dbName:process.env.dbName,
        dbUrl:process.env.dbUrl,
        options:{

        }
    },
   

};