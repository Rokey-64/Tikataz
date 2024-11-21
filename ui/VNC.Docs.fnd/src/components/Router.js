import ListOfAPI from './Datatest_02.js';
import HomePage from './home.js';
import BodyLayout from './bodyLayout.js';
import EditorLayout from './editorLayout.js';
import fetchCatalogsAPI from "./Api.js";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,useLoaderData
} from "react-router-dom";

// You can do this:
const Router = createBrowserRouter(

    createRoutesFromElements(
        <Route>
            <Route path="/" Component={HomePage} loader={ ()=>{return fetchCatalogsAPI()}}>
                <Route path='/' element={<BodyLayout />} />
                {
                    ListOfAPI.GetDate().map((content) => {
                        return <Route path={'/catlg/' + content.href} key={content.id} element={<BodyLayout />} />
                    })
                }
            </Route>
            <Route path="/editor" element={<EditorLayout /> } loader={ ()=>{return fetchCatalogsAPI()}}/>
        </Route>
    )
);

export default Router




/**
|--------------------------------------------------
    <Routes>
        <Route path="/" Component={HomePage}>
          <Route path='/' element={<BodyLayout />}/>
          {
            ListOfAPI.GetDate().map((content) => {
              return <Route path={'/' + content.href} key={content.id} element={<BodyLayout />} />
            })
          }
        </Route>
        <Route path="/editor" element={<EditorLayout />} loader={()=>{return data}}/>
      </Routes> 
|--------------------------------------------------
*/