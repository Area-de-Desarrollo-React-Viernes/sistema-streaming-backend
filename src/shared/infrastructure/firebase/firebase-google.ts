import * as admin from 'firebase-admin';
import path from 'path';

let serviceAccountPath: string;

if (process.env.NODE_ENV === 'production') {

    serviceAccountPath = path.resolve('/etc/secrets', 'spectra.json');
} else {
    
    serviceAccountPath = path.resolve(__dirname, '../../../../spectra.json');
}
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath)
    });
}
export { admin };