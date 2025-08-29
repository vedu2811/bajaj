const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Working");
});

const myDetails = {
  name: "vedant_jalan",
  birth: "28112003",
  email: "vedant28j@gmail.com",
  reg: "22BCE9182",
};

// POST
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input",
    });
  }

  const user_id = `${myDetails.name}_${myDetails.birth}`;
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
