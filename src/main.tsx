import { StrictMode, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { usePageView } from "./usePageView";
import { AuthProvider, useAuth } from "./AuthContext";
import PasswordGate from "./PasswordGate";

import App from "./App";
import ProjectsPage from "./ProjectsPage";
import AboutMe from "./AboutMe.tsx";
import VrVolunteerSystem from "./VrVolunteerSystem";
import SwiftfoodPage from "./swiftfood";
import HealthtechPage from "./healthtech";
import SmarthomePage from "./Smarthome";
import Other4Page from "./other-4";
import GenerativeImagePage from "./generative-image";

import "./index.css";

function PageViewTracker() {
  usePageView();
  return null;
}

function Protected({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <PasswordGate />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <PageViewTracker />
        <Routes>
          {/* 公开页面 */}
          <Route path="/" element={<App />} />
          <Route path="/about" element={<AboutMe />} />

          {/* 需要密码的页面 */}
          <Route path="/projects" element={<Protected><ProjectsPage /></Protected>} />
          <Route path="/projects/volunteer" element={<Protected><VrVolunteerSystem /></Protected>} />
          <Route path="/projects/swiftfood" element={<Protected><SwiftfoodPage /></Protected>} />
          <Route path="/projects/healthtech" element={<Protected><HealthtechPage /></Protected>} />
          <Route path="/projects/smarthome" element={<Protected><SmarthomePage /></Protected>} />
          <Route path="/projects/other-4" element={<Protected><Other4Page /></Protected>} />
          <Route path="/projects/creative-2" element={<Protected><GenerativeImagePage /></Protected>} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
