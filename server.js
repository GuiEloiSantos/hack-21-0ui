const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const training = require("./training.js");
const axios = require('axios').default;
const {NlpManager} = require('node-nlp');

const manager = new NlpManager({languages: ['en'], nlu: {useNoneFeature: false}});


const knex = require("knex")({
    client: "pg",
    searchPath: ["hack_21_0ui"],
    connection: {
        database: "hack_21_0ui",
        host: "hack-21-0ui-1.cbh1nk2bl81k.ap-southeast-2.rds.amazonaws.com",
        port: 5432,
        user: "postgres",
        password: "uB7mUnQ2xRdrTl",
    }
})

training(manager);

app.use(bodyParser.json({limit: "5mb"}));

app.get("/", ((req, res) => {
        const response = manager.process('en', req.query.q).then(res => {
            let startDate = false;
            let endDate = false;
            for (let entity in res.entities) {
                if (res.entities[entity].entity === 'daterange') {


                    console.log(startDate);
                }
            }
        });

        knex("chat_state").insert({conversation_id: "xxxxxxxx", data: {hi: "there"}})
            .then(() => res.send("Hello World"))
            .catch((error) => {
                console.log("\x1b[36m", "server. error",error, "\x1b[0m",);
                res.send("error")
            });
    }
));

app.post("/", (req, res) => {
    console.log(req.body);
    const body = req.body;
    const senderId = body.data.message.senderId;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let incomingMessageText = body.data.message.text;

    if (senderId === "1") {
        console.log('this stopped')
        return;
    }
    console.log(incomingMessageText);
    incomingMessageText = incomingMessageText.toLowerCase();


    if (incomingMessageText.includes("apply") && incomingMessageText.includes("leave")) {

        const response = manager.process('en', incomingMessageText).then(res => {
            let startDate = false;
            let endDate = false;
            for (let entity in res.entities) {
                if (res.entities[entity].entity === 'daterange') {
                    console.log(res.entities[entity].entity);
                    startDate = new Date(res.entities[entity].resolution.start).toLocaleDateString("en-US", options);
                    endDate = new Date(res.entities[entity].resolution.end).toLocaleDateString("en-US", options);
                }
            }

            if (!startDate) {
                return answerMessage("Did you mean to apply for leave? I didn't understand your date range", body);
            }

            return answerMessage("Do you want to apply for leave from " + startDate + " to " + endDate + "? (Yes/No)", body);
        });
        return;

    }

    if (incomingMessageText.includes("yes")) {
        return answerMessage("Please enter your leave reason", body);
    }

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
        axios.post("https://api.talkjs.com/v1/" + process.env.TALK_JS_APP_ID + "/conversations/" + body.data.message.conversationId + "/messages", [
            {
                "text": text,
                "sender": "1",
                "type": "UserMessage"
            }
        ], {
            headers: {
                'Authorization': 'Bearer ' + process.env.TALK_JS_API_TOKEN,
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
