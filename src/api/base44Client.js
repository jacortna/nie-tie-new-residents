import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Create a client with authentication required pointing to your specific project
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: 'https://nieia-new-residents-018179cc.base44.app', // 👈 ¡Corregido! Sin la barra "/" al final
  requiresAuth: false,
  appBaseUrl
});