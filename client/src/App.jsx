import { ThemeProvider } from 'styled-components';
import { Theme } from './utils/Variables';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeroPage } from './components/HeroPage';
import { DataLayout } from './components/DataLayout';
import { Students, Courses, Exams } from './components/DataPage';
import Particles from './utils/Particles';
import { SWRConfig } from 'swr';
import { ErrorPage } from './components/ErrorPage';

const fetcher = (url) => {
  const token = localStorage.getItem("token");
  return fetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).then((res) => res.json());
};

function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider theme={Theme}>
        <Particles
          particleColors={[Theme.colors.primary, Theme.colors.primary]}
          particleCount={300}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={200}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HeroPage />} />

            <Route element={<DataLayout />}>
              <Route path="/students" element={<Students />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/exams" element={<Exams />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
            
          </Routes>
        </BrowserRouter>

      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;