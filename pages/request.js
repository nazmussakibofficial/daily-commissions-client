import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthProvider";

const request = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const { data: artists, isLoading } = useQuery({
        queryKey: ['artists'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://daily-commissions-server.vercel.app/artists`);
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    const imageHostKey = process.env.NEXT_PUBLIC_imgbb_key;

    const optionCategories = [
        {
            category_id: 'cardmaking',
            name: 'Card Making'
        },
        {
            category_id: 'fiberarts',
            name: 'Fiber Arts'
        },
        {
            category_id: 'glassarts',
            name: 'Glass Arts'
        },
        {
            category_id: 'origami',
            name: 'Origami'
        },
        {
            category_id: 'papermache',
            name: 'Paper Mache'
        },
        {
            category_id: 'pottery',
            name: 'Pottery'
        }
    ]

    const handleAddCommission = data => {
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
                    const commission = {
                        name: data.name,
                        image: imgData.data.url,
                        category: data.category,
                        price: data.price,
                        buyerName: user?.displayName,
                        buyerEmail: user?.email,
                        buyerPhoto: user?.photoURL,
                        artistEmail: data.artist,
                        isPaid: false,
                        isCompleted: false
                    }
                    fetch('https://daily-commissions-server.vercel.app/commissions', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(commission)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            router.push('/');
                        })
                }
            })

    }

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <Head>
                <title>Request A Commission - Daily Commissions</title>
            </Head>
            <div className="hero mt-10 bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-center mb-5">Commission An Artwork</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-5">
                        <form onSubmit={handleSubmit(handleAddCommission)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Artwork name:</span>
                                </label>
                                <input {...register("name")}
                                    type="text" placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Artwork picture:</span>
                                </label>
                                <input {...register("photo")} type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Choose category:</span>
                                </label>
                                <select {...register('category')} className="select select-accent w-full max-w-xs">
                                    {optionCategories.map((category, i) => <option key={i} value={category.category_id}>{category.name}</option>)}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Choose An Artist:</span>
                                </label>
                                <select {...register('artist')} className="select select-accent w-full max-w-xs">
                                    {artists.map((artist) => <option key={artist._id} value={artist.email}>{artist.name}</option>)}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price Range:</span>
                                </label>
                                <input {...register("price")}
                                    type="text" placeholder="price" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-secondary" value='Submit & Request' type='submit'></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default request;