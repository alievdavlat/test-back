import 'dotenv/config'

export default {
	firebaseConfig  :   {
		apiKey: process.env.FIRE_BASE_API_KEY as string,
		authDomain: process.env.FIRE_BASE_DOMAIN,
		projectId: process.env.FIRE_BASE_PROJECTID,
		storageBucket: process.env.FIRE_BASE_STRORAGE_BUCKET,
		messagingSenderId: process.env.FIRE_BASE_MESSAGE_SENDERID,
		appId: process.env.FIRE_BASE_APP_ID,
		measurementId:process.env.FIRE_BASE_MESSUREMENT_ID
	}

}