import type { RouteRecord } from 'vite-react-ssg';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Cabinet from './pages/Cabinet';
import Equipe from './pages/Equipe';
import Expertises from './pages/Expertises';
import Contact from './pages/Contact';
import DroitCommercial from './pages/expertises/DroitCommercial';
import DroitSocietes from './pages/expertises/DroitSocietes';
import DroitNumerique from './pages/expertises/DroitNumerique';
import DroitConsommation from './pages/expertises/DroitConsommation';
import DroitConstruction from './pages/expertises/DroitConstruction';
import ModesAlternatifs from './pages/expertises/ModesAlternatifs';
import MentionsLegales from './pages/MentionsLegales';
import { RouteTracker } from './components/RouteTracker';

function RootLayout() {
  return (
    <>
      <RouteTracker />
      <Layout />
    </>
  );
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cabinet', element: <Cabinet /> },
      { path: 'equipe', element: <Equipe /> },
      { path: 'expertises', element: <Expertises /> },
      { path: 'expertises/droit-commercial', element: <DroitCommercial /> },
      { path: 'expertises/droit-societes', element: <DroitSocietes /> },
      { path: 'expertises/droit-numerique', element: <DroitNumerique /> },
      { path: 'expertises/droit-consommation', element: <DroitConsommation /> },
      { path: 'expertises/droit-construction', element: <DroitConstruction /> },
      { path: 'expertises/modes-alternatifs', element: <ModesAlternatifs /> },
      { path: 'contact', element: <Contact /> },
      { path: 'mentions-legales', element: <MentionsLegales /> },
    ],
  },
];
