'use strict';

import dotenv from 'dotenv'
import assert from 'assert'

dotenv.config()

const {
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID 
} = process.env

assert(PORT, 'port must be required')
assert(HOST, 'host must be required')

const config = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig : {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
        measurementId: MEASUREMENT_ID
    }

}

export default config