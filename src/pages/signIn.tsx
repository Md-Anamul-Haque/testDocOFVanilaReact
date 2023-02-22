/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CUD, CUDManager } from '../CUD'
import styled from './SignIn.module.css'
const SignIn = () => {
    const [user, setUser] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<any>(null)
    const navigator = useNavigate()

    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        CUD.post({
            url: `/api/sign-in/`,
            data: user,
        }, (res, err) => {
            if (err) {
                setIsError(err.message)
            }
            if (res.data?.success && res.data?.isLogdin === 'yes') {
                navigator('/admin/')
            } else {
                setIsError(res.data?.message)
            }
        })
    }
    // auth check
    useEffect(() => {
        axios.get(`/api/sign-in/`)
            .then((res: any) => {
                console.log(res.data)
                if (res.data?.success && res.data?.isLogdin === 'yes') {
                    setTimeout(() => {
                        navigator('/admin/')
                    }, 1000);
                }
            })
            .catch(err => {
                setIsError(err.message)
            })
            .finally(() => {
                setIsLoading(false)
            });
    }, [navigator])
    return (
        <main className={styled.main}>
            <CUDManager />
            <div className={styled.container}>
                <section className={styled.wrapper}>
                    <div className="heading">
                        <h1 className={`${styled.text} ${styled.text_large}`}>
                            Sign In
                            {isLoading && (
                                <span>...</span>
                            )}
                        </h1>
                        {/* <p className={`${styled.text} ${styled.text_normal}`}>New user? <span><a href="#" className={`${styled.text} ${styled.text_links}`}>Create an account</a></span>
                        </p> */}
                    </div>
                    <form className={styled.form} method="post" onSubmit={handleSubmit}>
                        <div className={styled.input_control}>
                            <label htmlFor="email" className={styled.input_label} hidden>username</label>
                            <input type="text" name="username" id="username" onChange={handleChange} className={styled.input_field} placeholder="username" />
                        </div>
                        <div className={styled.input_control}>
                            <label htmlFor="password" className={styled.input_label} hidden>Password</label>
                            <input type="password" name="password" id="password" onChange={handleChange} className={styled.input_field} placeholder="Password" />
                        </div>
                        <div className={styled.input_control}>
                            <a href="#" className={`${styled.text}  ${styled.text_links}`}>Forgot Password</a>
                            <button type="submit" className={styled.submit_btn}>Sign In</ button>
                        </div>
                        {isError && <span className={styled.error}>{isError}</span>}
                    </form>
                </section>
            </div>
        </main>
    )
}

export default SignIn
