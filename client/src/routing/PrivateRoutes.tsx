// import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../_metronic/layout/MasterLayout";
// import TopBarProgress from "react-topbar-progress-indicator";
// import { getCSSVariableValue } from "../_metronic/assets/ts/_utils";
// import { WithChildren } from "../_metronic/helpers";


const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>

        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};


export { PrivateRoutes };
