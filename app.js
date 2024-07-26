import express from "express";
import { GetAllData, getbyid, AddRecipee } from "./db.js";



// array.forEach(element => {
  
// });

// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
  
// }




const app = express();
app.use(express.json())
// assigning express to our folder  where our files locating 
app.use(express.static("public"))

// applying ejes so to inject data to the view  so we use in app res.render instead of send 
app.set("view engine","ejs")

app.use(express.urlencoded({extended:true}))

// get all the receipee in one page here
app.get("/receipes", async (req, res) => {
  const receipes = await GetAllData();
  // console.log(allreceipes)
  res.render("index.ejs", { receipes: receipes });

  // res.send(receipes[0].title);
});

// add your own recipe

app.get("/Addreceipes", async (req, res) => {
  const receipes = await GetAllData();
  // console.log(allreceipes)
  res.render("addRecipe.ejs");

  // res.send("new page for rendering");
});

// getting a certain receipee here

app.get("/receipes/:id", async (req, res) => {
  const id = req.params.id;
  const receipe = await getbyid(id);
  res.render()
  // res.send(receipe);
});

// creating  our recipee here

app.post("/receipes", async (req, res) => {
  const data = req.body;
  const title = data.title;
  const ingredients = data.ingredients;
  const instructions = data.instructions;

  // console.log("the data is ", title + ingredients + instructions);
  const receipe = await AddRecipee( title, ingredients, instructions);
  res.redirect("/receipes")
  // res.send(data.ingredients+"   " +data.title);
});

app.listen(8080, () => {
  console.log("server is running on 8080");
});

// error handling here by express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


