import { useQuery } from "@tanstack/react-query";
import FeaturedCard from "./FeaturedCard";
import Loading from "./Loading";

const Featured = () => {
    const { data: recentItems, isLoading } = useQuery({
        queryKey: ['recentItems'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://daily-commissions-server.vercel.app/recent`);
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
        <div className="container mx-auto p-5 my-5">
            <h2 className="text-2xl mb-5 ml-5 font-semibold">Discover recent artworks</h2>
            <div className="flex flex-wrap">
                {recentItems.map(item => <FeaturedCard key={item._id} item={item}></FeaturedCard>)}
            </div>
        </div>
    );
};

export default Featured;