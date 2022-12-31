import styles from '../styles/Home.module.css'

const FeaturedCard = ({ item }) => {
    const { name, image, category, price, sellerName, sellerPhoto } = item;

    return (
        <div className="card bg-base-100 shadow-xl rounded-none border-secondary border-4 p-4">
            <figure>
                <div className={`${styles.imgOverlay}`}>
                    <img src={image} alt="" className={`h-48 ${styles.imgOverlayImage}`} />
                    <div className={styles.overlay}>
                        <div className={`text-2xl text-zinc-600 ${styles.hoverText}`}>{name}</div>
                    </div>
                </div>
            </figure>
            <div className="card-body flex-row pl-0 pb-2">
                <div className="avatar">
                    <div className="w-16 mask mask-squircle">
                        <img src={sellerPhoto} />
                    </div>
                </div>
                <div className='ml-5'>
                    <p className="font-bold">{sellerName}</p>
                    <p>Price Range: {price} $ </p>
                    <p className='capitalize'>Category: {category} </p>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCard;