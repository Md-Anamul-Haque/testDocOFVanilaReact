import axios from 'axios';
import { toast } from 'react-toastify';

export const handlePost = (
    req: {
        url: string;
        data: any;
        headers?: any;
    },
    cb: (response: any, error: any) => any
) => {
    const options = {
        method: 'post',
        ...req
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        // data: data,
        // url,
    };
    const resolveReactToast = new Promise((resolve, reject) => {

        axios(options)
            .then((res) => {
                if (res.data?.success) {
                    cb(res, {})
                    console.log(res.data)
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
            // success: 'success',
            // error: 'error',
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

