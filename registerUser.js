const postgresClient = require('pg');
console.log('Starting')

/**
 * Configuration for the connection to my database docker container
 */
var config = {
    user: 'sarah', 
    database: 'artful', 
    password: 'password123', // should obfuscate this at some point
    host: 'localhost', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 30000 
  }
  
  const pool = new postgresClient.Pool(config)

  async function insertUser (email, password) {
    console.log("Inserting user");
    let query = `INSERT INTO USERS(email, password) VALUES (\'${email}\', \'${password}\')`
    const client = await pool.connect()
    let res
    try {
      await client.query('BEGIN')
      try {
        res = await client.query(query)
        await client.query('COMMIT')
        console.log('')
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    } finally {
      client.release()
    }
    if (res){
        console.log("Successfully inserted new user into table.")
    }
    return res
  }
  
  async function main () {
    try {
      const { rows } = await insertUser("greyman@whitemail.com", "password123")
      console.log(JSON.stringify(rows))
    } catch (err) {
      console.log('Database ' + err)
    }
  }
  
  // main()


  console.log('Done')