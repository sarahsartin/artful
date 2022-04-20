const postgresClient = require('pg');

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

  async function verifyQuery (username, password) {
      let query = `SELECT * FROM users WHERE email = \'${username}\' AND password = \'${password}\'`
    const client = await pool.connect()
    let res
    try {
      await client.query('BEGIN')
      try {
        res = await client.query(query)
        await client.query('COMMIT')
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    } finally {
      client.release()
    }
    if (res){
        console.log("You have successfully logged in.")
    }
    return res
  }
  
  async function main () {
    try {
      const { rows } = await verifyQuery("greyman", "GoodTimes")
      console.log(JSON.stringify(rows))
    } catch (err) {
      console.log('Database ' + err)
    }
  }
  
  main()
  