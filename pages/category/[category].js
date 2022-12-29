import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import ArtworkCard from "../../components/ArtworkCard";
import { AuthContext } from "../../contexts/AuthProvider";

const pathCategories = [
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

const Category = ({ categoryArtworks }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const { category } = router.query;
    const categoryObj = pathCategories.find(path => path.category_id === category)
    const categoryName = categoryObj.name;

    const handleAddCommission = data => {
        const commission = {
            name: data.name,
            image: data.image,
            category: data.category,
            price: data.price,
            buyerName: user.displayName,
            buyerEmail: user.email,
            buyerPhoto: user.photoURL,
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
                toast.success(`${data.name} is added successfully`);
            })
    }

    return (
        <div>
            <Head>
                <title>{categoryName} Arts - Daily Commissions</title>
            </Head>
            <div className="container mx-auto p-5 my-5">
                <h2 className="text-3xl mb-5 font-bold text-center">{categoryName} Arts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryArtworks.map(artwork => <ArtworkCard key={artwork._id} artwork={artwork} handleAddCommission={handleAddCommission}></ArtworkCard>)}
                </div>
            </div>
        </div>
    );
};

export const getStaticProps = async (context) => {
    const { params } = context;

    const res = await fetch(`https://daily-commissions-server.vercel.app/category/${params.category}`);
    const data = await res.json();

    return {
        props: {
            categoryArtworks: data
        }
    }
}

export const getStaticPaths = () => {

    const paths = pathCategories.map((category) => {
        const { category_id, name } = category;
        return {
            params: {
                category: category_id.toString()
            }
        }
    })


    return {
        paths,
        fallback: false,
    }

}

export default Category;