import { useEffect, useState } from 'react';
import { Navbar as BootstrapNavbar, Button, Container } from 'react-bootstrap';
import { MdOutlineAddTask } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { Modal } from '..';
import { RootState } from '../../redux/store';
import { ModalStateType, UserType } from '../../types/types';

const Navbar = () => {

  const userState = useSelector((state: RootState) => state.userReducer.user);
  const [localUserState, setLocalUserState] = useState<UserType>(userState);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalStateType>({flag:0, modalTitle:"", modalDesc:""});
  const navigate = useNavigate();

  const handleButtons = (flag: number) => {
    // modal
    setShowModal(true);
    if(flag === 0) {
      // new task
      setModalContent({ flag, modalTitle: "New Task", modalDesc: ""});
    } else {
      // log out
      setModalContent({ flag, modalTitle: "Log out", modalDesc: "Are you sure you want to log out?"});
    }
  }

  useEffect(() => {
    //Runs on the first render
    setLocalUserState(userState);
    //And any time any dependency value changes
  }, [userState])
  

  return (
    <BootstrapNavbar className="bg-body-tertiary">
        <Container>
          <BootstrapNavbar.Brand>
            <MdOutlineAddTask />{' '}
            Tasks App!
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Collapse className="justify-content-end">
            { localUserState._id==="" ? (
              <div className="auth-buttons">
                <Button onClick={() => navigate("/public/login")} variant="outline-secondary">Log in</Button>
                <Button onClick={() => navigate("/public/register")} variant="outline-dark">Register</Button>
              </div>
            ) : (
              <div className="user-info">
                {/* username */}
                <BootstrapNavbar.Text>
                  Signed in as: <span>{localUserState.username}</span>
                </BootstrapNavbar.Text>
                {/* new task */}
                <Button variant="outline-info" onClick={() => handleButtons(0)}>New Task</Button>
                {/* logout button */}
                <Button variant="outline-danger" onClick={() => handleButtons(1)}>Log out</Button>
              </div>
            ) }
            

        </BootstrapNavbar.Collapse>

        <Modal 
          showModal={showModal} 
          setShowModal={setShowModal} 
          modalContent={modalContent}
          />
        </Container>
      </BootstrapNavbar>
  )
}
export default Navbar