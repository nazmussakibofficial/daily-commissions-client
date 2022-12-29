import styles from '../styles/Home.module.css'

const Loading = () => {
    return (
        <div className='flex justify-center my-10'>
            <div className={styles.loading}>
                <span className='bg-primary'></span><span className='bg-primary'></span><span className='bg-primary'></span>
            </div>
        </div>
    );
};

export default Loading;