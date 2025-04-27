import mysql from "mysql2";

const connection = mysql.createConnection({
    connectionLimit: 10,
    host : "localhost",
    user : "mmarushika",
    password : "Mgm2@2005",
    database : 'job_finder'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Create auth table 
let sql = 
`CREATE TABLE auth (
    username VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY(username)
)`

sql = 
`CREATE TABLE Users (
    username VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_no INTEGER,
    city VARCHAR(255),
    yoe VARCHAR(20),
    qualification VARCHAR(50),
    description TEXT(65535),
    PRIMARY KEY(username)
)`

sql = 
`CREATE TABLE jobs (
    poster VARCHAR(255),
    id VARCHAR(30),
    timestamp VARCHAR(50),
    title VARCHAR(255),
    employer_name VARCHAR(255),
    email VARCHAR(255),
    phone_no INTEGER,
    city VARCHAR(255),
    yoe VARCHAR(20),
    qualification VARCHAR(50),
    description TEXT(65535),
    PRIMARY KEY(id)
)`


sql = `CREATE TABLE job_fields (
    job_id VARCHAR(255) NOT NULL,
    field_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (job_id, field_name),
    FOREIGN KEY (job_id) REFERENCES Jobs(id)
);`

sql = 
`CREATE TABLE user_fields (
    username VARCHAR(255) NOT NULL,
    field_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (username, field_name),
    FOREIGN KEY (username) REFERENCES Users(username)
);`

connection.query(sql, (err, result) => {
    try {
        if(err) throw err;
        console.log(result);
    } catch(err) {
        console.log(err);
    }  
});