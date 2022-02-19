var admin = require("firebase-admin");
var serviceAccount = require("../bookworm-d0305-firebase-adminsdk-8jdgi-07fe8087b0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

admin.auth().getUser('ZANj4kGtbxVE4bv09Avc3XiDop23')
    .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${userRecord}`);
    })
    .catch((error) => {
    console.log('Error fetching user data:', error);
    });
