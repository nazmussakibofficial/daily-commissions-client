import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import ArtworkCard from "../components/ArtworkCard";
import ConfirmationModal from "../components/ConfirmationModal";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthProvider";

const artworks = () => {
    const { user } = useContext(AuthContext);
    const [commissioningProduct, setCommissioningProduct] = useState(null)

    const { data: artworks, isLoading } = useQuery({
        queryKey: ['artworks'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://daily-commissions-server.vercel.app/artworks`);
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    const handleAddCommission = data => {
        const commission = {
            name: data.name,
            image: data.image,
            category: data.category,
            price: data.price,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyerPhoto: user?.photoURL,
            artistEmail: data.sellerEmail,
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
                toast.success(`${data.name} is commissioned!`);
            })
    }


    if (isLoading) {
        return <Loading></Loading>;
    }



    return (
        <div>
            <Head>
                <title>All Artworks - Daily Commissions</title>
            </Head>
            <div className="container mx-auto p-5 my-5">
                <h2 className="text-3xl mb-5 font-bold text-center">Artworks that are recommended by artists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {artworks.map(artwork => <ArtworkCard key={artwork._id} artwork={artwork} setCommissioningProduct={setCommissioningProduct}></ArtworkCard>)}
                </div>
            </div>
            {
                commissioningProduct && <ConfirmationModal
                    title={`Are you sure you want to commission?`}
                    message={`after commissioning ${commissioningProduct.name}, it might take upto 7 days to complete`}
                    successAction={handleAddCommission}
                    successButtonName="Commission"
                    modalData={commissioningProduct}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default artworks;