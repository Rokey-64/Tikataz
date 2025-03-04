import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './components/atlas/groups/layout';
import StudioLayout from './components/studio/layout/studioLayout';
import CardLayout from './components/studio/layout/cardLayout';
import TagContainer from "./components/studio/cards/tag_container";
import CompanyInfoForm from "./components/studio/profile/companyInfo";
import Feedback from "./components/studio/feedback";
import Setting from "./components/studio/setting";
import InsertCardForm from "./components/studio/cards/insert_card_form";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/me" element={<StudioLayout />}>
          <Route path="studio" element={<TagContainer />} />
          <Route path="general" element={<CompanyInfoForm />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="/me/card" element={<CardLayout />}>
          <Route path="" element={<InsertCardForm />} />
        </Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
