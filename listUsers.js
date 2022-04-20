import { Pool } from 'pg';

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
  
  const pool = new Pool(config)
  
  async function executeQuery (q) {
    const client = await pool.connect()
    let res
    try {
      await client.query('BEGIN')
      try {
        res = await client.query(q)
        await client.query('COMMIT')
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    } finally {
      client.release()
    }
    return res
  }

  async function verifyQuery (username, password) {
      let query = 'SELECT * FROM users WHERE username = \'${username}\' AND password = \'${password}\''
    const { rows } = await executeQuery(query)
    const client = await pool.connect()
    let res
    try {
      await client.query('BEGIN')
      try {
        res = await client.query(q)
        await client.query('COMMIT')
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    } finally {
      client.release()
    }
    return res
  }
  
  async function main () {
    try {
      const { rows } = await executeQuery('SELECT * FROM users;')
      console.log(JSON.stringify(rows))
    } catch (err) {
      console.log('Database ' + err)
    }
  }
  
  main()
  