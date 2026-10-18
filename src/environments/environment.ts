// Configuration de l'application Web fournie par la console Firebase.
export const environment = {
  firebase: {
    apiKey: 'AIzaSyBnfqgiWAda9Zq8cHtNtJV8vpF0CJjn2ck',
    authDomain: 'seg3502-lab5-51e71.firebaseapp.com',
    projectId: 'seg3502-lab5-51e71',
    storageBucket: 'seg3502-lab5-51e71.firebasestorage.app',
    messagingSenderId: '249313000505',
    appId: '1:249313000505:web:f4a4e2abaa763237e7a1e8'
  }
};

export const firebaseConfigured = Boolean(
  environment.firebase.apiKey && environment.firebase.projectId && environment.firebase.appId
);
