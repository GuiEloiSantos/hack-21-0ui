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
    const senderId = body.data.message.senderId;
    let incomingMessageText = body.data.message.text;

    if (senderId === "1") {
        console.log('this stopped')
        return;
    }
    console.log(incomingMessageText);

    // Check if message has "whats my leave balance"
    incomingMessageText = incomingMessageText.toLowerCase();
    if (incomingMessageText.includes("what") && incomingMessageText.includes("leave") && incomingMessageText.includes("balance")) {
        return answerMessage('Your leave balance is: ' + 20, body);
    }
    if (incomingMessageText.includes("next") && incomingMessageText.includes("pay") && incomingMessageText.includes("when")) {
        return answerMessage('Your next payment is due at 24 of December', body);
    }
    if (incomingMessageText.includes("next") && incomingMessageText.includes("pay") && incomingMessageText.includes("how much")) {
        return answerMessage('Your payment will be a total $100.000 and will be deposited on your account at 24 of December', body);
    }

    return answerMessage("Sorry I didn't understand that, I can help you check your leave balance or apply to leave", body);

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
