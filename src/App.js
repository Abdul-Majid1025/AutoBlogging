import ReportsPage from "./Pages/ReportsPage";
import "./App.css";
import GlobalInjector from "./Store/GlobalInjectors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebsitesPage from "Pages/WebsitesPage";
import WebsiteDetailPage from "Pages/WebsiteDetailPage";
import ReportDetailPage from "Pages/ReportDetailPage";

function App() {
  GlobalInjector();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ReportsPage />} />
          <Route path="report" element={<ReportDetailPage />} />
          <Route path="websites" element={<WebsitesPage />} />
          <Route path="website" element={<WebsiteDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
