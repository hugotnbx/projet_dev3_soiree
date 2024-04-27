import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId:'com.example.testapp',
  appName: 'iziplan',
  webDir: 'www',
 
  bundledWebRuntime: false,
  server: {
      androidScheme: 'https' // Schéma par défaut pour Android
    },
  
  /*plugins: {
    Deeplinks: {
      scheme: 'iziplan', // Le schéma doit correspondre à celui utilisé pour votre site web
      host: 'app', // L'hôte de votre site web
      androidPathPrefix: '/', // Le préfixe de chemin pour Android
      iosPathPrefix: '/', // Le préfixe de chemin pour iOS
      debug: true
    }
    AppLinks: {
      androidScheme: 'iziplan',
    }
  }*/
};

export default config;

