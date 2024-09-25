var admin = require("firebase-admin");
const model = require("../src/User/user.model")
// const base64 = require("base-64")
const dotenv = require("dotenv")
dotenv.config()


// var serviceAccount = require("../service_account.json");
var encodedString = process.env.FIREBASE_ENCODED_FILE
// var serviceAccount = base64.decode(encodedString)
var serviceAccount = JSON.parse(Buffer.from(encodedString, 'base64').toString('utf-8'));
// console.log("serviceAccount", serviceAccount)



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = {

    sendPushNotification: async (data, callback) => {
        const { body, message, userId } = data
        try {
            const userData = await model.findOne({ _id: userId })
            const accesstoken = userData.FCM_Token
            if (!accesstoken) {
                return callback(null, "FCM Token Not Found")
            }
            const payload = {
                token: accesstoken,
                notification: {
                    title: userData.userName,
                    body: body,
                },
                data: {
                    message: message.body
                }
            };
            const response = await admin.messaging().send(payload);
            // console.log('Successfully sent notification:', response);
            return callback(null, response);

        } catch (err) {
            console.log(err)
            return callback(err)
        }

    }
}
