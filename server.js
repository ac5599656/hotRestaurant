const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("./"))

const customerInfo = [{
        name: "you",
        phoneNumber: "123-456-7890",
        email: "you@youmail.com",
        uniqueID: 1,

    },
    {
        name: "me",
        phoneNumber: "908-765-4321",
        email: "me@memail.com",
        uniqueID: 2,
    },


];





const waitlist = [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/form", function (req, res) {
    res.sendFile(path.join(__dirname, "reservation_form.html"));
});

app.get("/views", function (req, res) {
    res.sendFile(path.join(__dirname, "reservation_views.html"));
});

app.get("/api/customerInfo", function (req, res) {

    return res.json(customerInfo);

});
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);


});
app.get("/api/clearTable", function (req, res) {

    return res.json(customerInfo);

});



app.post("/api/customerInfo", function (req, res) {

    const newCustomer = req.body;
    newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();

    // console.log(newCustomer);
    if (customerInfo.length > 4) {
        waitlist.push(newCustomer);
    } else {
        customerInfo.push(newCustomer);
    }


    res.json(newCustomer);
});


app.post("/api/clearTable", function (req, res) {

    customerInfo.length = [];
    waitlist.length = [];
    res.status(200).json("Ok")
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});