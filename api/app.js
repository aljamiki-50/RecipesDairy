import express from "express";
import {
  GetAllData,
  getbyid,
  AddRecipee,
} from "../db.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files from the "public" directory
app.use(express.static("public"));
// Setting EJS as the view engine
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("welcome");
});

// Route to get all recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await GetAllData();
    //  res.send(recipes[0].title);
    // res.render("index.ejs", { receipes: recipes });
    res.render("index", { receipes: recipes });
  } catch (error) {
    res.status(500).send("Error retrieving recipes");
  }
});

// Route to add a new recipe (renders form)
// app.get("/Addreceipes", (req, res) => {
//   res.render("addRecipe");
// });

// Route to get a specific recipe by ID
// app.get("/recipes/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const recipe = await getbyid(id);
//     res.render("recipeDetail", { recipe: recipe });
//   } catch (error) {
//     res.status(500).send("Error retrieving recipe");
//   }
// });

app.post("/recipes", async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    await AddRecipee(title, ingredients, instructions);
    // res.render("index")
    res.redirect("/recipes");
  } catch (error) {
    res.status(500).send("Error adding recipe");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// module.exports=app

export default app; // Export the app for Vercel
// export const handler = serverless(app);
