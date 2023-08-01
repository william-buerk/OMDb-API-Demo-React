import {lazy , Suspense} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from './features/SearchPage/SearchPage.tsx';
const DescriptionPage = lazy(() => import('./features/DescriptionPage/DescriptionPage.tsx'));

import './App.scss';

export default function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/description" element={
            <Suspense>
              <DescriptionPage />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>

      

    </div>
  );
}
