import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './components/atlas/groups/layout';
import StudioLayout from './components/common/Layout/StudioLayout';
import CardLayout from './components/common/Layout/CardLayout';
import InlineCardList from "./components/studio/cards/InlineCardList";
import Profiles from "./components/studio/Profiles";
import Feedback from "./components/studio/Feedback";
import Setting from "./components/studio/Settings";
import CardEditModeInit from "./components/studio/cards/CardEditModeInit";
import QuotationsDashboard from './components/quotations/Dardboard';
import PricingPage from './components/quotations/PricingPage';
import HistoryQuotations from './components/quotations/HistoryQuotations';
import DisplayRFQDetail from './components/quotations/HistoryQuotations/DisplayRFQDetail';
import Suppliers from './components/quotations/Suppliers';
import ExpiredDateNotify from './components/common/ExpiredDateNotify';



function App() {
  const [headerContent, setHeaderContent] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/expired" element={<ExpiredDateNotify />} />
        <Route path="/me" element={<StudioLayout />}>
          <Route path="studio" element={<InlineCardList />} />
          <Route path="general" element={<Profiles />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="/edit" element={<CardLayout />}>
          <Route path="card" element={<CardEditModeInit/>} />
        </Route>
        <Route path="/rfq" element={<CardLayout />}>
          <Route path="dashboard" element={<QuotationsDashboard/>} />
          <Route path="dashboard/pricing" element={<PricingPage/>} />
          <Route path="dashboard/history" element={<HistoryQuotations/>} />
          <Route path="dashboard/history/views" element={<DisplayRFQDetail/>} />
          <Route path="suppliers" element={<Suppliers/>} />
        </Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
