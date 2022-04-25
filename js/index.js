const { Pool, Client } = require("pg");

const credentials = {
  user: "sarah",
  host: "localhost",
  database: "galleryDB",
  password: "password123",
  port: 5051,
};

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}

// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();

  return now;
}

// Use a self-calling function so we can use async / await.

(async () => {
  const poolResult = await poolDemo();
  console.log("Time with pool: " + poolResult.rows[0]["now"]);

  const clientResult = await clientDemo();
  console.log("Time with client: " + clientResult.rows[0]["now"]);
})();

async function registerPerson(person) {
    const text = `
      INSERT INTO people (fullname, gender, phone, age)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [person.fullname, person.gender, person.phone, person.age];
    return pool.query(text, values);
  }
  
  async function getPerson(personId) {
    const text = `SELECT * FROM people WHERE id = $1`;
    const values = [personId];
    return pool.query(text, values);
  }
  
  async function updatePersonName(personId, fullname) {
    const text = `UPDATE people SET fullname = $2 WHERE id = $1`;
    const values = [personId, fullname];
    return pool.query(text, values);
  }
  
  async function removePerson(personId) {
    const text = `DELETE FROM people WHERE id = $1`;
    const values = [personId];
    return pool.query(text, values);
  }

  (async () => {
    // Register a new user and get an id, which comes from the RETURNING clause.
    const registerResult = await registerPerson({
      fullname: "Jane Doe",
      gender: "F",
      phone: "5555555555",
      age: 29,
    });
    const personId = registerResult.rows[0]["id"];
    console.log("Registered a person with id: " + personId);
  
    // Obtain the full person object from the database.
    const getPersonResult = await getPerson(personId);
    console.log(
      "Result of SELECT query for person '" +
        personId +
        "': " +
        JSON.stringify(getPersonResult.rows[0], null, "  ")
    );
  
    // Update the person's full name and query for them again to verify.
    await updatePersonName(personId, "Jane Johnson");
    const getChangedPersonResult = await getPerson(personId);
    console.log(
      "Result of SELECT query for person after name change '" +
        personId +
        "': " +
        JSON.stringify(getChangedPersonResult.rows[0], null, "  ")
    );
  
    // Clean up the database by removing the person record.
    await removePerson(personId);
  
    await pool.end();
  })();