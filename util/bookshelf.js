module.exports = function(Bookshelf) {

    Bookshelf.PG = Bookshelf.initialize({
        client: 'pg',
        connection: {
            host : 'localhost',
            user : 'postgres',
            password : 'fuckoff99',
            database : 'postgres'
        }
        //, debug: true
    });
}
/*
 connection: {
 host : 'ec2-54-197-238-239.compute-1.amazonaws.com',
 user : 'ksoxflwpdgipkv',
 password : 'y6FzhyESWLdX7xSPTm4FJFTvKB',
 database : 'df0mr75u1e3886'
 }

{
    "db" : {
    "host" : "ec2-54-197-238-239.compute-1.amazonaws.com",
        "port" : 5432,
        "name" : "df0mr75u1e3886",
        "username":"ksoxflwpdgipkv",
        "password":"y6FzhyESWLdX7xSPTm4FJFTvKB"
}
}
*/