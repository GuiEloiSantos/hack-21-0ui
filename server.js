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
app.use(bodyParser.json({limit: "5mb"}));

app.get("/", ((req, res) => res.send("Its allllllliiiiiivvvvveeeeeeeeeee!!!!!!!!!!")));

app.post("/", (req, res) => {
    const body = req.body;
    const incomingMessageText = body.data.message.text;
    const senderId = body.data.message.senderId;

    if (senderId == 1) {
        console.log('this stopped')
        return;
    }
    console.log(incomingMessageText);

    // Check if message has "whats my leave balance"
    if(incomingMessageText.includes("what") && incomingMessageText.includes("leave") && incomingMessageText.includes("balance") ) {
        answerMessage('Your leave balance is: ' + 20 , body);
    }


    function answerMessage(text, body) {
        axios.post("https://api.talkjs.com/v1/tB2H2aVb/conversations/" + body.data.message.conversationId + "/messages", [
            {
                "text": text,
                "sender": "1",
                "type": "UserMessage"
            }
        ], {
            headers: {
                'Authorization': 'Bearer sk_test_LswQkC1AuOIjw3Gqy8YnRLxiDaoZCGYi',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            res.send(response.data);
        }).catch(error => {
            console.log(error);
            res.send(error);
        });
    }



})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sever listening at http://localhost:${PORT}`));
