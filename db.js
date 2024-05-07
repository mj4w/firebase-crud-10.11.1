import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import config from './config';

const firebaseApp = initializeApp(config.firebaseConfig);
const f = getFirestore(firebaseApp);

export default f;
