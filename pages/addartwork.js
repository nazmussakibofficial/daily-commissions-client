import Head from "next/head";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";

const addartwork = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const router = useRouter();

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

    const handleAddArtwork = data => {
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
                    const artwork = {
                        name: data.name,
                        image: imgData.data.url,
                        category: data.category,
                        price: data.price,
                        sellerName: user.displayName,
                        sellerEmail: user.email,
                        sellerPhoto: user.photoURL,
                        isPaid: false,
                        isCompleted: false
                    }
                    fetch('https://daily-commissions-server.vercel.app/artworks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(artwork)
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
    return (
        <div>
            <Head>
                <title>Add Your Artwork - Daily Commissions</title>
            </Head>
            <div className="hero mt-10 bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-center mb-5">Add Your Artwork</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-5">
                        <form onSubmit={handleSubmit(handleAddArtwork)} className="card-body">
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
                                    <span className="label-text">Price range:</span>
                                </label>
                                <input {...register("price")}
                                    type="text" placeholder="price" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-secondary" value='Submit & Add' type='submit'></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default addartwork;