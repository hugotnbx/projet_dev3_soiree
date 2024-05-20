importScripts(
    "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js",
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js",
  );
  
  firebase.initializeApp({
    apiKey: "BAwLDrE7miMccdkr2SFjiOAV6qfdCzf3bk1OXJ-zwfMuvyn8x7ANDJusV4p6siYLx5D3iCbx49xZv2TQOqbmRYo",
    authDomain: "https://iziplan.l2-1.ephec-ti.be:64000",
    projectId: "iziplan-1fa27",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "1:858821507199:android:006e9d591f8d0522e8274a"
  });
  const messaging = firebase.messaging();