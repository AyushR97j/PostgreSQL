///////////////////////////////env config//////////////////////////////////////////

import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/////////////////////////////////////////////////////////////////////////////////////

/*
//write a function to create a users table in your db////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Client } from "pg";

const client = new Client({
  connectionString:
    process.env.CONNECTION_STRING,
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
}

createUsersTable();
*/

//write a function that lets you insert data in a table in your db//////////////////////////////////////////////////////////////////////////////////////////////////

/*
import { Client } from "pg";

async function insertData() {
  const client = new Client({
    connectionString:
      process.env.CONNECTION_STRING,
  });

  try{
    await client.connect();
    const insertQuery = "INSERT INTO users (username, email, password) VALUES('username1', 'user1@example.com', 'user1_pass');";
    const res = await client.query(insertQuery);
    console.log('Insertion success:', res);
  } catch(error) {
    console.log('Erro in insertion:', error);
  } finally {
    await client.end();
  }

}

insertData();

*/

//Fetch user data from the db given an email

import { Client } from "pg";

async function getUser(email: string) {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    await client.connect();
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      console.log("User Found", result.rows[0]);
      return result.rows[0];
    } else {
      console.log("User Not Found With given email");
      return null;
    }
  } catch (err) {
    console.log("Error during fetching user", err);
    throw err;
  } finally {
    await client.end();
  }
}

getUser('user2@example.com').catch(console.error);
