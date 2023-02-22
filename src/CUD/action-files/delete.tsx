import axios from 'axios';
import { toast } from 'react-toastify';


export const handleDelete = (req: { url: string }, cb: (response: any, error: any) => any) => {
    const { url } = req;
    const resolveReactToast = new Promise((resolve, reject) => {
        axios.delete(url)
            .then((res) => {
                if (res.data?.success) {
                    cb(res, {})
                    return resolve(res.data.message)
                } else {
                    cb(res, {})
                    return reject(res.data.message)
                }
            })
            .catch((err) => {
                cb({}, err)
                return reject(err.message)
            })
    });
    toast.promise(
        resolveReactToast,
        {
            pending: 'Loading...',
            success: {
                render(props: any) {
                    return typeof props.data == 'string' ? props.data : JSON.stringify(props.data)
                },
            },
            error: {
                render(props: any) {
                    return typeof props.data == 'string' ? props.data : JSON.stringify(props.data)
                }
            }
        }
    )
}

