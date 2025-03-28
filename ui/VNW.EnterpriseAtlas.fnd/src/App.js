import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './components/atlas/groups/layout';
import StudioLayout from './components/studio/layout/StudioLayout';
import CardLayout from './components/studio/layout/CardLayout';
import InlineCardList from "./components/studio/cards/InlineCardList";
import Profiles from "./components/studio/Profiles";
import Feedback from "./components/studio/Feedback";
import Setting from "./components/studio/Settings";
import CardEditModeInit from "./components/studio/cards/CardEditModeInit";
import QuotationsDashboard from './components/quotations/Dardboard';
import PricingPage from './components/quotations/PricingPage';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
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
          <Route path="pricing" element={<PricingPage/>} />
        </Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
