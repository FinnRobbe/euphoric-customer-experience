import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import { AppShell } from './components/shell/AppShell'
import { BenefitCompare } from './pages/BenefitCompare'
import { BenefitDetail } from './pages/BenefitDetail'
import { BenefitFeatures } from './pages/BenefitFeatures'
import { BenefitPersonalise } from './pages/BenefitPersonalise'
import { BenefitsGrid } from './pages/BenefitsGrid'
import { FeatureDetail } from './pages/FeatureDetail'
import { PmiAddOns } from './pages/PmiAddOns'
import { PmiBilling } from './pages/PmiBilling'
import { ChatPrototypePage } from './pages/PlaceholderPage'
import { Saved } from './pages/Saved'
import { PlanProvider } from './state/PlanContext'

function RootLayout() {
  return (
    <PlanProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </PlanProvider>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <BenefitsGrid /> },
      {
        path: 'benefits/pmi',
        element: <Navigate to="/benefits/axa-pmi" replace />,
      },
      {
        path: 'benefits/pmi/features',
        element: <Navigate to="/benefits/axa-pmi/features" replace />,
      },
      {
        path: 'benefits/pmi/personalise',
        element: <Navigate to="/benefits/axa-pmi/personalise" replace />,
      },
      {
        path: 'benefits/pmi/compare',
        element: <Navigate to="/benefits/axa-pmi/compare" replace />,
      },
      { path: 'benefits/:benefitId', element: <BenefitDetail /> },
      {
        path: 'benefits/:benefitId/features',
        element: <BenefitFeatures />,
        children: [
          { path: ':featureId', element: <FeatureDetail /> },
        ],
      },
      {
        path: 'benefits/:benefitId/personalise',
        element: <BenefitPersonalise />,
        children: [
          { path: 'feature/:featureId', element: <FeatureDetail /> },
        ],
      },
      {
        path: 'benefits/:benefitId/personalise/add-ons',
        element: <PmiAddOns />,
      },
      {
        path: 'benefits/:benefitId/billing',
        element: <PmiBilling />,
      },
      {
        path: 'benefits/:benefitId/compare',
        element: <BenefitCompare />,
      },
      { path: 'chat', element: <ChatPrototypePage /> },
      { path: 'saved', element: <Saved /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
