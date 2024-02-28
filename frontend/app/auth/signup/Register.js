"use client"

import { useEffect, useState } from "react"
import { useMutation } from "react-query"
import toast from 'react-hot-toast'
import axios from 'axios'
import { errorsConversion } from "@/Utils"
import Spinner from "@/components/Spinner"
import { useRouter } from "next/navigation"
const Register = () => {
    const { push } = useRouter()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        image: ""
    })
    const [errors, setErrors] = useState({})
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
   
    const { error, isError, isSuccess, isLoading, mutate, data } = useMutation(data =>{
        return axios.post(`${process.env.NEXT_PUBLIC_API}/auth/register`, data)
    })
    console.log(`data = ${data}, error = ${error},`)
    const submitForm = (e) => {
        e.preventDefault()
        mutate({ ...user })
    }
    useEffect(() => {
        if (isError) {
            if (error?.response?.status === 400) {
                const response = errorsConversion(error?.response?.data?.errors)
                setErrors(response)
            }
        }
        console.log(errors)
        if (isSuccess) {
            toast.success("Your account has been created successfully")
            setUser({
                name: "",
                email:'',
                password:'', 
            })
            setErrors({})
            push('/auth/login')
        }
    }, [isError, isSuccess])
    const Switch = () => {
        push('/auth/login')
        setUser("")
    }

    return (
        <section className="h-screen   ">
            <div className="dark:bg-slate-900  flex h-full items-center py-16 bg-gray-100">
                <main className="w-full max-w-md mx-auto p-6 ">
                    
                    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign Up</h1>
                                <p className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Already have an account ?
                                    <span onClick={Switch} className="cursor-pointer text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="../examples/html/signup.html">
                                        Sign In here
                                    </span>
                                </p>
                            </div>

                            <div className="mt-5">
                                
                            {!isLoading ? 
                                <form onSubmit={submitForm}>
                                    <div className="grid gap-y-4">
                                        <div>
                                            <label for="email" className="block text-sm mb-2 dark:text-white">Name</label>
                                            <div className="relative">
                                                <input type="text"  name="name" value={user.name} onChange={onChange} className="border outline-none py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"  aria-describedby="email-error" />
                                                {errors.name  && <span className='text-rose-600'>{errors.name}</span> }
                                                <div className="hidden absolute inset-y-0 end-
                                                0 flex items-center pointer-events-none pe-3">
                                                    <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                        </div>
                                        <div>
                                            <label for="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                                            <div className="relative">
                                                <input type="email"  name="email" value={user.email} onChange={onChange} className="outline-none py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" aria-describedby="email-error" />
                                                {errors.email  && <span className='text-rose-600'>{errors.email}</span> }
                                                <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                                    <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <label for="password" className="block text-sm mb-2 dark:text-white">Password</label>

                                            </div>
                                            <div className="relative">
                                                <input type="password"  name="password" value={user.password} onChange={onChange} className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"  aria-describedby="password-error" />
                                                {errors.password  && <span className='text-rose-600'>{errors.password}</span> }
                                                <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                                    <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                        </div>
                                        
                                        <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Register</button>
                                    </div>
                                </form> : <Spinner/>}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default Register