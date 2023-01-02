import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthProvider';
import artist from '../images/formartist.jpg'

const register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, sigInWithGoogle } = useContext(AuthContext);
    const imageHostKey = process.env.NEXT_PUBLIC_imgbb_key;
    const router = useRouter();

    const handleSignUp = data => {
        const image = data.photo[0]
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const photo = imgData.data.url
                    createUser(data.email, data.password)
                        .then(result => {
                            const user = result.user;
                            console.log(user);
                            toast('Welcome to Daily Commissions.')
                            const userInfo = {
                                photoURL: photo,
                                displayName: data.name
                            }
                            updateUser(userInfo)
                                .then(() => {
                                    saveUser(data.name, data.email, data.role)
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(error => { console.log(error) });
                }

            })

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
        let user = { name, email, role }

        fetch('https://daily-commissions-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                router.push('/')
            })
    }


    return (
        <div>
            <Head>
                <title>Sign up - Daily Commissions</title>
            </Head>
            <div className="hero min-h-screen bg-base-200 py-10">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold mb-5">Register and Start!</h1>
                        <img src={artist.src} alt="" className='hidden lg:block max-w-sm rounded-lg shadow-2xl'></img>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-5 pb-5">
                        <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input {...register("name")}
                                    type="text" placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upload your photo</span>
                                </label>
                                <input {...register("photo")} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: "Email is Required" })}
                                    type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <p className='text-error mt-2'>{errors.email?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: "Password is Required", minLength: { value: 6, message: 'Password must be 6 characters' } })} type="password" placeholder="password" className="input input-bordered" />
                                {errors.password && <p className='text-error mt-2'>{errors.password?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Choose your role:</span>
                                </label>
                                <select {...register('role')} className="select select-accent w-full max-w-xs">
                                    <option value='Consumer'>Consumer</option>
                                    <option value='Artist'>Artist</option>
                                </select>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-secondary" value='Register' type='submit'></input>
                            </div>
                        </form>
                        <p className='mx-auto'>Already Registered? <Link className='link link-accent' href='/login'>Log in</Link></p>
                        <div className="divider mt-2">OR</div>
                        <button onClick={handleGoogleSignin} className="btn btn-outline btn-accent mb-5 mx-3 uppercase">Log in with google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default register;