import express from "express";
import mongoose from "mongoose";
import { schema as UserSchema } from "./models/ToDoList.js";

mongoose.connect("mongodb://localhost/ToDoList");

const collection = new mongoose.model("ToDoDatas", UserSchema, "ToDoDatas");


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

var toDoEditItem;

app.get("/", async (req, res) => {
    try {
        const toDoList = await collection.find({}, { toDo: 1});
        console.log(toDoList.map(item => item.toDo));            //Do display only toDo from the array.
        console.log("-------------------------------------------");

        res.render("index.ejs", {
            toDoList: toDoList,
            toDoEditItem : toDoEditItem
        });
    }
    catch (err) {
        console.log(err);
    }
})

app.post("/add", async (req, res) => {
    try {
        const data = req.body.textField;
        await collection.insertMany({ toDo: data });
        res.redirect("/");
        toDoEditItem="";
    }
    catch (err) {
        console.log(err);
    }
})

app.post("/edit/:item_id", async (req, res) => {
    try{
        const id = req.params.item_id;
        console.log("Edited item id : ",id);
        const toDoEdit = await collection.findOne({_id : id}, { toDo: 1 , _id : 0});
        toDoEditItem=toDoEdit.toDo;
        console.log(toDoEditItem);
        await collection.deleteOne({_id : id});
        res.redirect("/");
    }
    catch{
        console.log(err);
    }
})



app.post("/delete/:item_id", async (req, res) => {
    try{
        const id = req.params.item_id;
        console.log("Deleted item id : ",id);
        await collection.deleteOne({_id : id});
        res.redirect("/");
    }
    catch{
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
