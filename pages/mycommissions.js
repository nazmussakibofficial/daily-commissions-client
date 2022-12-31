import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useContext } from "react";
import Loading from "../components/Loading";
import MyCommissionCard from "../components/MyCommissionCard";
import { AuthContext } from "../contexts/AuthProvider";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";


const mycommissions = () => {
    const { userInfo } = useContext(AuthContext);
    const email = userInfo[0]?.email
    const [completedProduct, setCompletedProduct] = useState(null);

    const { data: commissions, isLoading, refetch } = useQuery({
        queryKey: ['commissions', email],
        queryFn: async () => {
            try {
                const res = await fetch(`https://daily-commissions-server.vercel.app/commissions?email=${email}`);
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    const handleComplete = (commission) => {
        const isCompleted = true;
        const isPaid = false;

        fetch(`https://daily-commissions-server.vercel.app/commissions/${commission._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ isCompleted, isPaid })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('You have completed the commission!');
                    refetch();
                }
            })
    };

    if (isLoading) {
        return <Loading></Loading>;
    }
    return (
        <div>
            <Head>
                <title>My Commissions - Daily Commissions</title>
            </Head>
            <div className="container mx-auto p-5 my-5">
                <h2 className="text-3xl mb-5 font-bold text-center">My Commissions</h2>
                <div>
                    {commissions.map(commission => <MyCommissionCard key={commission._id}
                        commission={commission}
                        setCompletedProduct={setCompletedProduct}
                    ></MyCommissionCard>)}
                </div>
            </div>
            {
                completedProduct && <ConfirmationModal
                    title={`Are you sure you want to complete?`}
                    message={`after completing ${completedProduct.name} commission, you can get paid.`}
                    successAction={handleComplete}
                    successButtonName="Complete"
                    modalData={completedProduct}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default mycommissions;