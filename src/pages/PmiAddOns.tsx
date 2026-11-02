import { Navigate, useParams } from 'react-router-dom'

/** Add-ons live on the Personalise page — keep this route as a redirect. */
export function PmiAddOns() {
  const { benefitId = 'axa-pmi' } = useParams()
  return <Navigate to={`/benefits/${benefitId}/personalise`} replace />
}
