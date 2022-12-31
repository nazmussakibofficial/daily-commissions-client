import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";
import Loading from "../components/Loading";
import MyArtworkCard from "../components/MyArtworkCard";
import { AuthContext } from "../contexts/AuthProvider";

const myartworks = () => {
    const { userInfo } = useContext(AuthContext);
    const email = userInfo[0]?.email
    const [deletingProduct, setDeletingProduct] = useState(null);

    const { data: myArtworks, isLoading, refetch } = useQuery({
        queryKey: ['myArtworks', email],
        queryFn: async () => {
            try {
                const res = await fetch(`https://daily-commissions-server.vercel.app/myartworks?email=${email}`);
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    const handleDelete = (artwork) => {
        fetch(`https://daily-commissions-server.vercel.app/artworks/${artwork._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${artwork.name} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>;
    }
    return (
        <div>
            <Head>
                <title>My Artworks - Daily Commissions</title>
            </Head>
            <div className="container mx-auto p-5 my-5">
                <h2 className="text-3xl mb-5 font-bold text-center">My Artworks</h2>
                <div>
                    {myArtworks.map(myArtwork => <MyArtworkCard key={myArtwork._id} myArtwork={myArtwork} setDeletingProduct={setDeletingProduct}></MyArtworkCard>)}
                </div>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.name}, it cannot be undone`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deletingProduct}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default myartworks;