import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react-hooks/rules-of-hooks
const navigator = useNavigate()

const Axios_config = () => {
    // axios.interceptors.request.use(function (config: any) {
    //     // const token: any = localStorage.getItem('token');
    //     // config.headers = { authorization: token };
    //     config.withCredentials = true;
    //     return config;
    // });






    // ------------------------------------

    axios.interceptors.response.use(function (response) {
        if (response.data?.success === false && response.data?.isLogdin === 'no') {
            navigator('/sign-in')
        }
        return response;
    }, function (error) {
        return Promise.reject(error);
    });

}

export default Axios_config
