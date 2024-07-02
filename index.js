const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port= 3001;

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/MoneyList',)
    .then(() => console.log("Connected to Database"))
    .catch(err => console.log("Error in connecting to the Database", err));

// Define schema and model
const expenseSchema = new mongoose.Schema({
    Category: String,
    Amount: Number,
    Info: String,
    Date: String
});
const Expense = mongoose.model('Expense', expenseSchema);

// Route for adding expense
app.post("/add", async (req, res) => {
    try {
        const { category_select, amount_input, info, date_input } = req.body;

        const expenseData = {
            Category: category_select,
            Amount: amount_input,
            Info: info,
            Date: date_input
        };

        const expense = new Expense(expenseData);
        await expense.save();

        console.log("Record Inserted Successfully");
        res.status(200).send("Record Inserted Successfully");
    } catch (err) {
        console.error("Error inserting record", err);
        res.status(500).send("Error inserting record");
    }
});

// Route for serving the main page
app.get("/", (req, res) => {
    res.set({ "Allow-access-Allow-Origin": '*' });
    return res.redirect('index.html');
});

app.listen(3001, () => {
    console.log("Listening on port 5000");
});
