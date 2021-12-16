const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios').default;


const knex = require("knex")({
    client: "pg",
    searchPath: ["hack-21-0ui"],
    connection: {
        database: "postgres",
        host: "hack-21-0ui-1.cbh1nk2bl81k.ap-southeast-2.rds.amazonaws.com",
        port: 5432,
        user: "postgres",
        password: "uB7mUnQ2xRdrTl",
    }
})
app.use(bodyParser.json({ limit: "5mb" }));

app.get("/", ((req, res) => res.send("Its allllllliiiiiivvvvveeeeeeeeeee!!!!!!!!!!")) );

app.post("/", (req, res) => {
    const body = req.body;
    const incomingMessageText = body.data.message.text;
    axios.post("https://api.talkjs.com/v1/tB2H2aVb/conversations/3e5b86cb367a6b8c0689/messages", [
        {
            "text": "Im the master of the world!",
            "sender": "1",
            "type": "UserMessage"
        }
    ],{
        headers: {
                'Authorization': 'Bearer sk_test_LswQkC1AuOIjw3Gqy8YnRLxiDaoZCGYi',
                'Content-Type': 'application/json'
            }
    })
    res.json(body);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sever listening at http://localhost:${PORT}`));
