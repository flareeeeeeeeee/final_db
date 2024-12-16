import React from 'react'
import { createRoot } from "react-dom/client";
// Axios
import axios from "axios";
// Apps

import "./_metronic/assets/fonticon/fonticon.css";
import "./_metronic/assets/keenicons/duotone/style.css";
import "./_metronic/assets/keenicons/outline/style.css";
import "./_metronic/assets/keenicons/solid/style.css";
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 */

import "./_metronic/assets/sass/style.scss";
import "./_metronic/assets/sass/plugins.scss";
import "./global.css";

import { AppRoutes } from "./routing/AppRoutes";
import { AuthProvider } from "./providers";
// setupAxios(axios);

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
