import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useContext } from "react";
import Loading from "../components/Loading";
import MyCommissionCard from "../components/MyCommissionCard";
import { AuthContext } from "../contexts/AuthProvider";

const mycommissions = () => {
    const { userInfo } = useContext(AuthContext);
    const email = userInfo[0]?.email
    const { data: commissions, isLoading } = useQuery({
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
                    {commissions.map(commission => <MyCommissionCard key={commission._id} commission={commission}></MyCommissionCard>)}
                </div>
            </div>


        </div>
    );
};

export default mycommissions;