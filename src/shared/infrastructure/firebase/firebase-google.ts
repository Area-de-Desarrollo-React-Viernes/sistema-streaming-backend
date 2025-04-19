import * as admin from 'firebase-admin';
import path from 'path';

const serviceAccount = path.resolve(__dirname, '../../../../spectra.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
export { admin };