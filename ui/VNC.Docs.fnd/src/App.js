import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, RouterProvider, Routes, Route, Router, HashRouter } from 'react-router-dom';
import HomePage from './components/Home.js';
import BodyLayout from './components/BodyLayout.js';
import './index.scss';
import fetchCatalogsAPI from "./components/Api.js";
const EditLayout = lazy(() => import("./components/EditorLayout.js"))

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const catlgs = await fetchCatalogsAPI()
      setData(catlgs)
    }
    fetch()
  }, [])

  return (
    // <RouterProvider router={Router} />
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage data={data} />} >
            <Route path='/' element={<BodyLayout />} />
            {
              data.map((content) => {
                return <Route path={'/' + content.href_url} key={content.id} element={<BodyLayout idCatlg={content.id} />} />
              })
            }
          </Route>

          <Route path="/editor" element={<EditLayout data={data} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
