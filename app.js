const express = require("express");
const cors = require("cors");
const app = express();
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
