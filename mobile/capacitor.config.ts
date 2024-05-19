import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.iziplan.app',
  appName: 'Iziplan',
  webDir: 'www',
 
  bundledWebRuntime: false,
  server: {
      androidScheme: 'https' // Schéma par défaut pour Android
    },

  plugins: {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      //smallIcon:"ic_launcher_round",
      smallIcon:"ic_launcher_round",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;

