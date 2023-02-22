import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Card from '../components/Card'
const API_URL = process.env.REACT_APP_API_URL

const Home = () => {
    const [datas, setDatas] = useState<any>()
    const [isError, setIsError] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        axios.get(API_URL + '/api/links')
            .then(res => {
                if (res.data?.success) {
                    setDatas(res.data.data)
                } else {

                }
            })
            .catch(err => {
                setIsError(err.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            placeItems: 'center',
            textAlign: 'left',
            height: '100vh',
            overflowY: 'auto'

        }}>
            {isError && <Card>{isError}</Card>}
            {isLoading && <Card>'Loading'</Card>}

            {datas && <ol >
                {datas.map((data: any, i: number) => {
                    return <li key={`link${i}`} >
                        <NavLink to={data.doc_id + '/'} className="document-link">
                            {data.doc_id}
                        </NavLink>
                    </li>
                })}
            </ol>}


        </div>
    )
}

export default Home
