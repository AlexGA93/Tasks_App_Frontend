import { Card } from "react-bootstrap"
import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../routes/routes";
import { CardPropsType } from "../../types/types";

const CardTask = ({ taskId, taskTitle, taskDesc }: CardPropsType) => {
  return (
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title><Link to={`/private/${PrivateRoutes.SINGLEPAGE}/${taskId}`}>{ taskTitle }</Link></Card.Title>
        <Card.Text>
          { taskDesc }
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
export default CardTask