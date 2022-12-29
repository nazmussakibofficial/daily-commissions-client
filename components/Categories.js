import cardmaking from '../images/categories/cardmaking.jpg'
import fiberarts from '../images/categories/fiberarts.jpg'
import glassarts from '../images/categories/glassarts.jpg'
import origami from '../images/categories/origami.jpg'
import papermache from '../images/categories/papermache.jpg'
import pottery from '../images/categories/pottery.jpg'
import CategoryCard from './CategoryCard'


const Categories = () => {
    const categories = [
        {
            category_id: 'cardmaking',
            img: cardmaking,
            name: 'Card Making'
        },
        {
            category_id: 'fiberarts',
            img: fiberarts,
            name: 'Fiber Arts'
        },
        {
            category_id: 'glassarts',
            img: glassarts,
            name: 'Glass Arts'
        },
        {
            category_id: 'origami',
            img: origami,
            name: 'Origami'
        },
        {
            category_id: 'papermache',
            img: papermache,
            name: 'Paper Mache'
        },
        {
            category_id: 'pottery',
            img: pottery,
            name: 'Pottery'
        }
    ]

    return (
        <div className='container mx-auto border-primary border-8 p-5 my-5'>
            <h1 className='text-xl font-bold ml-10 mb-5'>Artworks by category</h1>
            <div className='flex flex-wrap justify-around gap-4'>
                {
                    categories.map((category, i) => <CategoryCard key={i} category={category}></CategoryCard>)
                }

            </div>
        </div>
    );
};

export default Categories;