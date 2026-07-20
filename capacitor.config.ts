import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nietie.newresidents',
  appName: 'NIE/IA',
  webDir: 'dist', // 👈 ¡Aquí le decimos que use 'dist' en vez de 'www'!
  server: {
    androidScheme: 'https',
    allowNavigation: [
      'generativelanguage.googleapis.com' // 👈 ¡Lista blanca para la IA directa!
    ]
  },
  plugins: {
    CapacitorHttp: {
      enabled: true // 👈 ¡Activamos el bypass de CORS!
    }
  }
};

export default config;
