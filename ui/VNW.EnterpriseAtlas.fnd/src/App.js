import { Route, Router, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './components/groups/layout';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
