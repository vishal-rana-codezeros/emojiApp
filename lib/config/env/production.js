module.exports = {
    enviroment :'production',
    port:process.env.PORT,
    protocol:'http',
    TAG:"production",
    mongo:{
        dbName:process.env.dbName,
        dbUrl:process.env.dbUrl,
        options:{

        }
    },
   

};