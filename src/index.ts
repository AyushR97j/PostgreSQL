//write a function to create a users table in your db
import { Client } from "pg";

///////////////////////////////env config//////////////////////////////////////////

import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/////////////////////////////////////////////////////////////////////////////////////

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
