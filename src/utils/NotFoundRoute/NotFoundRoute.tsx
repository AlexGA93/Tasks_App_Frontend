import { Route, Routes } from "react-router-dom"
import { NotFoundPropsType } from "../../types/types"
import { NotFound } from "../../components"

const NotFoundRoute = ({ children }: NotFoundPropsType) => {
    /**
     * If there isn't any of the child routes ({ children }), 
     * we want to render a not found component for the every route that there is not i nchildren
     * (<Routes path="*" element={<NotFound />} />)
     */
  return (
    <Routes>
        { children }
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default NotFoundRoute