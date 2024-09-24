var admin = require("firebase-admin");
const model = require("../src/User/user.model")


var serviceAccount = require("../service_account.json");

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
