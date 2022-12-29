import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useContext } from "react";
import Loading from "../components/Loading";
import MyArtworkCard from "../components/MyArtworkCard";
import { AuthContext } from "../contexts/AuthProvider";

const myartworks = () => {
    const { userInfo } = useContext(AuthContext);
    const email = userInfo[0]?.email
    const { data: myArtworks, isLoading } = useQuery({
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
                    {myArtworks.map(myArtwork => <MyArtworkCard key={myArtwork._id} myArtwork={myArtwork}></MyArtworkCard>)}
                </div>
            </div>


        </div>
    );
};

export default myartworks;