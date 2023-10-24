export interface NotFoundPropsType {
  children: JSX.Element | JSX.Element[];
}

export interface GuardPropsType {
  validation: boolean;
}

export interface ReduxStoreType {
  userReducer: UserStateType;
}

export interface ToastOptionsType {
  position: string;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: undefined;
  theme: string;
}
export interface ToastPayload {
  value: boolean;
  toastFlag: string;
  toastMessage: string;
}

export interface ToastPropType {
  handleToast: (payload: ToastPayload) => void;
}

export interface AuthStateType {
  isLoading: boolean;
  error: null | undefined | string;
}

export interface LoginUserType {
  email: string;
  password: string;
}

export interface RegisterUserType {
  username: string;
  email: string;
  password: string;
}

export interface UserType {
  _id?: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface UserStateType {
  user: UserType;
  isLoading: boolean;
  error: null | undefined | string;
}

export interface TaskType {
  _id?: string;
  title: string;
  description: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface TasksStateType {
  tasks: TaskType[];
  singleTask: TaskType;
  isLoading: boolean;
  error: null | undefined | string;
}

export interface ModalStateType {
  flag: number;
  modalTitle: string;
  modalDesc?: string;
}

export interface CenteredModalPropsType {
  taskdata: TaskType;
  show: boolean;
  onHide: () => void;
  mode: string;
}

export interface NewTaskType {
  title: string;
  description: string;
}

export interface ModalPropsType {
  showModal: boolean;
  setShowModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  modalContent?: ModalStateType;
  formValue?: NewTaskType;
}

export interface CardPropsType {
  taskId: string;
  taskTitle: string;
  taskDesc: string;
}

export interface FormTaskPropsType {
  formData?: NewTaskType;
  handleClose: () => void;
}

export interface PublicPropsType {
  handleToast: (payload: {
    value: boolean;
    toastFlag: string;
    toastMessage: string;
  }) => void;
}
