import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AppLayout from './components/shared/AppLayout';
import Home from './pages/Home';
import Consulta from './pages/Consulta';
import Permisos from './pages/Permisos';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

const SinConexion = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 text-center"
    style={{ background: "linear-gradient(160deg, #f8f4ec 0%, #ede4cc 35%, #10103a 100%)" }}>
    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
      style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(201,168,0,0.4)" }}>
      <span style={{ fontSize: "2.5rem" }}>ðŸ“¶</span>
    </div>
    <h2 className="text-2xl font-bold text-white mb-3">Sin conexiÃ³n a internet</h2>
    <p style={{ color: "rgba(255,255,255,0.7)" }} className="text-sm leading-relaxed mb-8">
      NIE/TIE New Residents necesita conexiÃ³n a internet para mostrarte la publicidad que nos permite mantener la app gratuita.
      Por favor, conecta tu dispositivo a internet y vuelve a intentarlo.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-8 py-3 rounded-xl font-bold text-base"
      style={{ background: "linear-gradient(135deg, #C9A800, #f0d060)", color: "#10103a" }}>
      Reintentar
    </button>
    <p className="mt-6 text-xs" style={{ color: "rgba(201,168,0,0.6)" }}>
      NIE/TIE Â· New Residents Â· EspaÃ±a
    </p>
  </div>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError } = useAuth();
  const [isConnected, setIsConnected] = useState(true);
  const [checkingNetwork, setCheckingNetwork] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  // Scroll al inicio en cada cambio de ruta
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  // BotÃ³n atrÃ¡s de Android
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const handler = CapacitorApp.addListener('backButton', () => {
      if (location.pathname === '/') {
        CapacitorApp.exitApp();
      } else {
        navigate(-1);
      }
    });
    return () => { handler.then(h => h.remove()); };
  }, [location, navigate]);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (Capacitor.isNativePlatform()) {
          const status = await Network.getStatus();
          setIsConnected(status.connected);
        }
      } catch (e) {
        setIsConnected(true); // si falla la comprobaciÃ³n, asumimos que hay conexiÃ³n
      } finally {
        setCheckingNetwork(false);
      }
    };

    checkConnection();

    // Escuchar cambios de red
    const listener = Network.addListener('networkStatusChange', (status) => {
      setIsConnected(status.connected);
    });

    return () => {
      listener.then(l => l.remove());
    };
  }, []);

  // Mostramos spinner mientras comprobamos red
  if (checkingNetwork || isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#f8f4ec]">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#C9A800] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Sin conexiÃ³n
  if (!isConnected) {
    return <SinConexion />;
  }

  if (authError && authError.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/permisos" element={<Permisos />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App;

