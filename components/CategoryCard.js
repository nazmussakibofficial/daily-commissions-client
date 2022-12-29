import styles from '../styles/Home.module.css'

const CategoryCard = ({ category }) => {
    const { img, name, category_id } = category;
    return (
        <a href={`/category/${category_id}`}>
            <div className="w-48">
                <div className={styles.imgOverlay}>
                    <img src={img} alt="" className={styles.imgOverlayImage}></img>
                    <div className={styles.overlay}>
                        <div className={`text-2xl text-zinc-600 ${styles.hoverText}`}>{name}</div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default CategoryCard;