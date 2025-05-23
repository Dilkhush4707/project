
import express from "express";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import cors from 'cors'
import { connectToMongoDB, getCollection } from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const dbName = "searchFeature";

app.use(express.json());
app.use(cors());

app.get("/search", async (req, res) => {
  try {
    const collectionName = "products";
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Missing search query" });
    }

    const productCollection = await getCollection(dbName, collectionName);
    const aggregationPipeline = [
      {
        $search: {
          index: "product",
          autocomplete: {
            query: query,
            path: "description",
          },
        },
      },
      { $limit: 5 },
    ];

    const results = await productCollection
      .aggregate(aggregationPipeline)
      .toArray();
    res.status(200).json({ data: results });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const init = async () => {
  await connectToMongoDB();
  console.log("✅ MongoDB connected...");

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
};

app.get("/products/:id", async (req, res) => {
  try {
    const collectionName = "products"; // Assuming the collection is 'products'
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const productCollection = await getCollection(dbName, collectionName);
    const result = await productCollection.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: result });
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
init();
