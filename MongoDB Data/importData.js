const mongoose = require("mongoose");
const fs = require("fs");

// MongoDB connection URI
const uri =
  "mongodb+srv://somyagupta052003:WTtlrg3PxBvo1yXj@cluster0.3rsph.mongodb.net/recipe?retryWrites=true&w=majority"; // Replace with your connection string

// Define Mongoose schemas for categories and recipes
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  category: { type: String, required: true }, // or ObjectId if you're linking to categories
  email: { type: String, required: true }, // New email field
  image: { type: String, required: true }, // New image field
});

// Create Mongoose models
const Category = mongoose.model("Category", categorySchema);
const Recipe = mongoose.model("Recipe", recipeSchema);

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas");

    // Read and insert categories
    const categoriesData = fs.readFileSync("categories.json", "utf8");
    const categories = JSON.parse(categoriesData);
    await Category.insertMany(categories);
    console.log("Categories inserted successfully");

    // Read and insert recipes
    const recipesData = fs.readFileSync("recipes.json", "utf8");
    const recipes = JSON.parse(recipesData);
    await Recipe.insertMany(recipes);
    console.log("Recipes inserted successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB or inserting data:", error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the main function
main();
