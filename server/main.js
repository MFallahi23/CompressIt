import express from "express";
import dotenv from "dotenv";
import pool from "./helpers/db.js";
import cors from "cors";
import userRoute from "./routes/users.router.js";
import compressRoute from "./routes/compress.routes.js";
import adminRoute from "./routes/admin.routes.js";
import corsOptions from "./config/corsOptions.js";
import { errorHandler } from "./middleware/errorHandler.js";
import credentials from "./middleware/credentials.js";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve images from the "images" directory
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/user", userRoute);
app.use("/api/compress", compressRoute);
app.use("/api/admin", adminRoute);
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error Handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

// Test the connection with the db
async function testConnection() {
  try {
    const client = await pool.connect();
    const res = await client.query("SELECT 1");

    console.log("Connection successful!");
    client.release();
  } catch (error) {
    console.error("Error connecting to the db", error);
  }
}

testConnection();
