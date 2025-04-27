import mysql from "mysql2";

// Reason for using pool
// https://stackoverflow.com/questions/55560039/how-is-the-correct-way-to-handle-mysql-connections-in-node-js
// Reaseon for using mysql2
// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// Reason for authentication issues
// https://stackoverflow.com/questions/40477625/nodejs-mysql-er-access-denied-error-access-denied-for-user-rootlocalhost

const pool = mysql.createPool({
    connectionLimit: 10,
    host : "localhost",
    user : "mmarushika",
    password : "Mgm2@2005",
    database : 'job_finder'
})

async function executeQuery(sql, values) {
    return new Promise((resolve, reject) => {
        pool.execute(sql, values, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function insertMultiple(sql, values) {
    return new Promise((resolve, reject) => {
        pool.query(sql, [values], (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export async function createUser(username, password) {
    const sql = 'INSERT INTO USERS(username, password) VALUES ?'
    const values = [[username, password]]
    pool.query(sql, [values], (err, result) => {
        try {
            if(err) throw err;
            console.log(result);
        } catch(err) {
            console.log(err);
        }  
    })
}

export async function getUser(username) {
    const sql = 'SELECT * FROM USERS WHERE username = ?';
    const values = [username];
    const result = await executeQuery(sql, values);
    return result;
}

export async function updateProfile(user) {
    // Clear user fields
    /*let sql = 'DELETE FROM FIELDS WHERE username = ?'
    let values = [user.username];
    //executeQuery(sql, values);

    // Add new user fields
    sql = 'INSERT INTO FIELDS (username, field_name) VALUES ?'
    values = user.fields.map(field => [user.username, field]);
    console.log(values);
    insertMultiple(sql, values).catch(console.err);*/

    // Update user details
    let values = [
        ['name', user.name],
        ['email', user.email],
        ['phone_no', user.phone_no],
        ['yoe', user.yoe],
        ['qualification', user.qualification],
        ['description', user.description]
    ];
    console.log(values);
    values.forEach(value => {
        let sql = `UPDATE USERS SET ${value[0]} = ? WHERE username = ?`;
        executeQuery(sql, [value[1], user.username]);
    });
}

const profile = {
    username : 'alice123',
    name : "Alice",
    email : "alice123@gmail.com",
    phone_no : "123456789",
    yoe : "< 1 years",
    qualification : "High School Diploma",
    description : "Blah",
    fields : ['Artificial Intelligence & Machine Learning', 'Engineering', 'Environmental Science', 'Research & Development']
}
const job = {
    poster: 'emily123',
    id: 'm9zopav900suvc0cdb45',
    timestamp: '"2025-04-27T13:27:38.565Z"',
    title: 'A',
    employer_name: 'A',
    employer_email: 'A',
    employer_phone_no: 123213,
    city: 'A',
    yoe: '< 1 years',
    qualification: 'High School Diploma',
    description: 'A',
    fields: [ 'Artificial Intelligence & Machine Learning', 'Engineering' ]
  }
export async function addJobListing(job) {
    // Add job details
    let sql = 'INSERT INTO JOBS VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let values = [job.poster, job.id, job.timestamp, job.title, job.employer_name,
         job.employer_email, job.employer_phone_no, job.city, job.yoe, 
         job.qualification, job.description];
    await executeQuery(sql, values);

    // Add job listing fields
    sql = 'INSERT INTO JOB_FIELDS (job_id, field_name) VALUES ?'
    values = job.fields.map(field => [job.id, field]);
    console.log(values);
    insertMultiple(sql, values).catch(console.err); 
}

export async function getJobListings(user) {
    let sql = `SELECT * FROM JOBS WHERE poster = ?`;

    const rows = await executeQuery(sql, [user]);
    const res = await Promise.all(rows.map(async (i) => {
        sql = 'SELECT field_name FROM JOB_FIELDS WHERE job_id = ?'
        const fields = await executeQuery(sql, [i.id]);
        const fieldNames = fields.map(i => i.field_name);
        return {...i, fields : [...fieldNames]};
    }));
    return res;
}

async function run() {
    const res = await getJobListings('emily123');
    console.dir(res, { depth: null });
}


run();