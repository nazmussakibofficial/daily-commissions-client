import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useContext } from "react";
import Loading from "../components/Loading";
import MyOrderCard from "../components/MyOrderCard";
import { AuthContext } from "../contexts/AuthProvider";

const myorders = () => {
    const { userInfo } = useContext(AuthContext);
    const email = userInfo[0]?.email
    const { data: orders, isLoading } = useQuery({
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
                    {orders.map(order => <MyOrderCard key={order._id} order={order}></MyOrderCard>)}
                </div>
            </div>


        </div>
    );
};

export default myorders;