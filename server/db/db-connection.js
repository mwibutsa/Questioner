import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

class Database {
  constructor() {
    this.pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });

    this.connect = async () => this.pool.connect();


    this.userTable = `
    CREATE TABLE IF NOT EXISTS user_table (
    id UUID PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    othername VARCHAR(30),
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    phone_number CHAR(15) NOT NULL,
    registered DATE NOT NULL,
    is_admin int NOT NULL,
    password VARCHAR(120) NOT NULL,
    token VARCHAR(120),
    confirmed int NOT NULL
        );
        `;
    this.meetupTable = `
    CREATE TABLE IF NOT EXISTS meetup_table (
        id UUID PRIMARY KEY,
        created_on DATE NOT NULL,
        location VARCHAR(128) NOT NULL,
        topic TEXT NOT NULL,
        happening_on DATE NOT NULL

    );
    `;
    this.questionTable = `
    CREATE TABLE IF NOT EXISTS question_table (
        id UUID PRIMARY KEY,
        created_on DATE NOT NULL,
        created_by UUID REFERENCES user_table (id) ON DELETE CASCADE,
        meetup UUID REFERENCES meetup_table (id) ON DELETE CASCADE,
        title VARCHAR(128) NOT NULL,
        body TEXT NOT NULL,
        upvotes INT NOT NULL,
        downvotes INT NOT NULL
    );
    `;
    this.commentTable = `
    CREATE TABLE IF NOT EXISTS comment_table (
        id UUID PRIMARY KEY,
        created_on DATE NOT NULL,
        created_by UUID REFERENCES user_table (id) ON DELETE CASCADE,
        question UUID REFERENCES question_table (id) ON DELETE CASCADE,
        body TEXT NOT NULL
    );
    `;
    this.votersTable = `
    CREATE TABLE IF NOT EXISTS voters_table (
      id UUID PRIMARY KEY,
      created_on DATE NOT NULL,
      voted_by UUID REFERENCES user_table(id) ON DELETE CASCADE,
      question_id UUID REFERENCES question_table (id) ON DELETE CASCADE,
      vote CHAR(8) NOT NULL
    )`;

    this.resevationTable = `
    CREATE TABLE IF NOT EXISTS rsvp_table (
        id UUID PRIMARY KEY,
        created_on DATE NOT NULL,
        user_id UUID REFERENCES user_table (id) ON DELETE CASCADE,
        meetup_id UUID REFERENCES meetup_table (id) ON DELETE CASCADE,
        answer VARCHAR(6) NOT NULL
    );
    `;

    this.tagTable = `
    CREATE TABLE IF NOT EXISTS tag_table (
        id UUID PRIMARY KEY,
        tag_name VARCHAR(128) NOT NULL
    );
    `;

    this.meetupImagesTable = `
    CREATE TABLE IF NOT EXISTS meetup_images_table (
        id UUID PRIMARY KEY,
        meetup UUID REFERENCES meetup_table (id) ON DELETE CASCADE,
        url VARCHAR(128) NOT NULL
    );
    `;

    this.meetupTagsTable = `
    CREATE TABLE IF NOT EXISTS meetup_tags_table (
        id UUID PRIMARY KEY,
        meetup UUID REFERENCES meetup_table (id) ON DELETE CASCADE,
        tag UUID REFERENCES tag_table (id) ON DELETE CASCADE
    );
    `;
    this.userImagesTable = `
    CREATE TABLE IF NOT EXISTS user_images_table (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES user_table (id) ON DELETE CASCADE,
        url VARCHAR(128) NOT NULL,
        is_profile int NOT NULL

    );
    `;
    this.initializeDb();
  }

  async executeQuery(query, data = []) {
    const connection = await this.connect();
    try {
      // execute a query with parameter
      if (data.length) {
        return await connection.query(query, data);
      }
      // execute a query without parameter
      return await connection.query(query);
    } catch (error) {
      return error;
    } finally {
      connection.release();
    }
  }

  async initializeDb() {
    await this.executeQuery(this.userTable);
    await this.executeQuery(this.meetupTable);
    await this.executeQuery(this.questionTable);
    await this.executeQuery(this.commentTable);
    await this.executeQuery(this.meetupImagesTable);
    await this.executeQuery(this.meetupTagsTable);
    await this.executeQuery(this.userImagesTable);
    await this.executeQuery(this.resevationTable);
    await this.executeQuery(this.tagTable);
    await this.executeQuery(this.votersTable);
  }
}
export default new Database();
