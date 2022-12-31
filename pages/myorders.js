import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";
import Loading from "../components/Loading";
import MyOrderCard from "../components/MyOrderCard";
import { AuthContext } from "../contexts/AuthProvider";

const myorders = () => {
    const { userInfo } = useContext(AuthContext);
    const email = userInfo[0]?.email
    const [paidProduct, setPaidProduct] = useState(null);
    console.log(paidProduct)

    const { data: orders, isLoading, refetch } = useQuery({
        queryKey: ['orders', email],
        queryFn: async () => {
            try {
                const res = await fetch(`https://daily-commissions-server.vercel.app/orders?email=${email}`);
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    const handlePayment = (commission) => {
        const isCompleted = true;
        const isPaid = true;

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
                    toast.success('You have paid for the commission!');
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
                <title>My Orders - Daily Commissions</title>
            </Head>
            <div className="container mx-auto p-5 my-5">
                <h2 className="text-3xl mb-5 font-bold text-center">My Orders</h2>
                <div>
                    {orders.map(order => <MyOrderCard key={order._id} order={order} setPaidProduct={setPaidProduct}></MyOrderCard>)}
                </div>
            </div>
            {
                paidProduct && <ConfirmationModal
                    title={`Are you sure you want to pay?`}
                    message={`after paying for ${paidProduct.name} commission, you can only get a refund within 7 days.`}
                    successAction={handlePayment}
                    successButtonName="Pay"
                    modalData={paidProduct}
                >
                </ConfirmationModal>
            }

        </div>
    );
};

export default myorders;