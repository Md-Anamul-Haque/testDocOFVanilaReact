import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleDelete } from "./action-files/delete";
import { handlePost } from './action-files/post';
import { handlePut } from './action-files/put';
export const CUD = {
    post: handlePost,
    delete: handleDelete,
    put: handlePut
}

export const CUDManager = ({ ...ref }) => (<ToastContainer {...ref} />)