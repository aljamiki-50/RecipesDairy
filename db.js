import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function GetAllData() {
  // this will handle me all the rose i am looking for actually in a data here
  const rows = await pool.query("SELECT * FROM recipes   ");
  // console.log(rows[0]);
  return rows[0]
}

// const allData = await GetAllData();

// lets have a fun to get smth with an idea for example

export async function getbyid(id) {
  typeof id !== "number" ||
    (!Number.isInteger(id) && console.log("You added a non-integer value"));
  const rows = await pool.query(
    //  the thing is we cant allow untrusted value here it will cause us an issue
    `
    SELECT * FROM recipes  where recipe_id = ?
    `,
    [id]
  );

  return rows[0];

  // console.log(rows[0]);
}
// getbyid(2);

export async function AddRecipee(title, ingredients, instructions) {
  const [rows] = await pool.query(
    `
    insert into Recipes (title,ingredients,instructions) values (?,?,?)
    `,
    [title, ingredients, instructions]
  );

  // allData;

  const id =  rows.insertId

  return getbyid(id)

  // return {
  //   id: rows.insertId,
  //   title: title,
  //   ingredients: ingredients,
  //   instructions: instructions,
    
  // };
}

// const added = await AddRecipee("test3", "test3", "test3");
// console.log("the func retue",added);

// "LemonPie",
// "a lot of lemons has to be around ",
// "lemon should be fresh so you can enjoy the bitteness of the lemon with the biscuits it self "
