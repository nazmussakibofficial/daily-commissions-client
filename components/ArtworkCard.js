import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import styles from '../styles/Home.module.css'

const ArtworkCard = ({ artwork, setCommissioningProduct }) => {
    const { user } = useContext(AuthContext);
    const { name, image, price, sellerName, sellerPhoto } = artwork;

    return (
        <div className="card w-84 bg-base-100 shadow-xl rounded-none border-secondary border-4 p-4">
            <figure>
                <div className={`${styles.imgOverlay}`}>
                    <img src={image} alt="" className={styles.imgOverlayImage} />
                    <div className={styles.overlay}>
                        <div className={`text-2xl text-zinc-600 ${styles.hoverText}`}>{name}</div>
                    </div>
                </div>
            </figure>
            <div className="card-body flex-row justify-center pl-0 pb-2">
                <div className="avatar">
                    <div className="w-24 mask mask-squircle">
                        <img src={sellerPhoto} />
                    </div>
                </div>
                <div className='ml-5'>
                    <p className="font-bold">{sellerName}</p>
                    <p>Price Range: {price}$ </p>
                    {
                        user?.uid ?
                            <label onClick={() => { setCommissioningProduct(artwork) }} htmlFor="confirmation-modal" className="btn btn-outline w-full mt-2 uppercase">Commission</label>
                            :
                            <button className="btn uppercase" disabled>Log in to commission</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;