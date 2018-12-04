module.exports = {
    enviroment :'development',
    port:process.env.PORT,
    protocol:'http',
    TAG:"development",
    mongo:{
        dbName:process.env.dbName,
        dbUrl:process.env.dbUrl,
        options:{

        }
    },
   

};