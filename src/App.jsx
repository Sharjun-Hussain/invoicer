import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Preloader from "./components/Preloader";
import AdBlockModal from "./components/AdBlockModal";
import GlobalDirectLinkAd from "./components/GlobalDirectLinkAd";
import TemplatePage from "./pages/TemplatePage";
import ReceiptPage from "./pages/ReceiptPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Preloader />
      <AdBlockModal />
      <GlobalDirectLinkAd />
      <BrowserRouter>
        <Routes>
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
          <Route path="/" element={<Index />} />
          <Route path="/template" element={<TemplatePage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
