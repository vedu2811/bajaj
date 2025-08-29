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

  const isNumber = (str) => {
    return !isNaN(str) && !isNaN(parseFloat(str));
  };
  const isAlphabet = (char) => {
    return /^[a-zA-Z]$/.test(char);
  };
  const isSpecial = (char) => {
    return !isNumber(char) && !isAlphabet(char);
  };

  const concat = (items) => {
    const allChars = [];
    items.forEach((item) => {
      for (let char of item) {
        if (isAlphabet(char)) {
          allChars.push(char.toLowerCase());
        }
      }
    });

    allChars.reverse();

    let result = "";
    for (let i = 0; i < allChars.length; i++) {
      if (i % 2 === 0) {
        result += allChars[i].toLowerCase();
      } else {
        result += allChars[i].toUpperCase();
      }
    }

    return result;
  };

  const odd = [];
  const even = [];
  const letters = [];
  const special = [];
  let sum = 0;

  data.forEach((item) => {
    const str = String(item);

    if (isNumber(str)) {
      const num = parseInt(str);
      sum += num;

      if (num % 2 == 0) {
        even.push(str);
      } else {
        odd.push(str);
      }
    } else if (str.split("").every((char) => isAlphabet(char))) {
      letters.push(str.toUpperCase());
    } else if (str.split("").some((char) => isSpecial(char))) {
      str.split("").forEach((char) => {
        if (isSpecial(char)) {
          special.push(char);
        }
      });
    }
  });

  const user_id = `${myDetails.name}_${myDetails.birth}`;

  const response = {
    is_success: true,
    user_id: user_id,
    email: myDetails.email,
    roll_number: myDetails.reg,
    odd_numbers: odd,
    even_numbers: even,
    alphabets: letters,
    special_characters: special,
    sum: sum,
    data: data,
  };
  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
