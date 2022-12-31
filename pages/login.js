import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import consumer from '../images/formconsumer.jpg'

const login = () => {
    const { register, handleSubmit } = useForm();
    const { signIn, sigInWithGoogle } = useContext(AuthContext);
    const router = useRouter();

    const handleLogin = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                router.push('/')
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    const handleGoogleSignin = () => {
        sigInWithGoogle()
            .then(result => {
                const user = result.user;
                saveUser(user?.displayName, user?.email, 'Consumer')
            })
            .catch(e => console.error(e))

    }

    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('https://daily-commissions-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // router.push('/')
            })
    }

    return (
        <div>
            <Head>
                <title>Login - Daily Commissions</title>
            </Head>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold mb-5">Login to your <br /> existing account!</h1>
                        <img src={consumer.src} alt="" className='hidden lg:block max-w-sm rounded-lg shadow-2xl'></img>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-5">
                        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-secondary" value='Login' type='submit'></input>
                            </div>
                        </form>
                        <p>New to Daily Commissions? <Link className='link link-accent' href='/register'>Create a new account</Link></p>
                        <div className="divider mt-2">OR</div>
                        <button onClick={handleGoogleSignin} className="btn btn-outline btn-accent mb-5 mx-3 uppercase">Log in with google</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default login;