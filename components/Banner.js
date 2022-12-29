import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import banner1 from '../images/banners/banner1.jpg'
import banner2 from '../images/banners/banner2.jpg'
import banner3 from '../images/banners/banner3.jpg'
const Banner = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="carousel w-full h-60 bg-base-200 my-5">
            <div id="slide1" className="carousel-item relative w-full justify-end">
                <div className="absolute flex flex-col justify-end transform -translate-y-1/2 left-24 top-1/2">
                    <h1 className='text-4xl font-bold hidden lg:block my-5'>Holiday Sales</h1>
                    <p className='hidden lg:block mb-5'>During Holidays, There are discounts on commisioning artworks.</p>
                    {user?.uid ? <></> : <Link href='/login'><button className="btn btn-secondary hidden lg:block uppercase">Log in to start commissioning</button></Link>}
                </div>
                <img src={banner1} className="w-1/2 hidden lg:inline-flex" alt='' ></img>
                <img src={banner1} className="w-full lg:hidden" alt=''></img>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full justify-end">
                <div className="absolute flex flex-col justify-end transform -translate-y-1/2 left-24 top-1/2">
                    <h1 className='text-4xl font-bold hidden lg:block my-5'>Quality Over Quantity</h1>
                    <p className='hidden lg:block mb-5'>Our aim is to provide quality arts.</p>
                    {user?.uid ? <></> : <Link href='/login'><button className="btn btn-secondary hidden lg:block uppercase">Log in to start commissioning</button></Link>}
                </div>
                <img src={banner2} className="w-1/2 hidden lg:inline-flex" alt='' ></img>
                <img src={banner2} className="w-full lg:hidden" alt=''></img>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full justify-end">
                <div className="absolute flex flex-col justify-end transform -translate-y-1/2 left-24 top-1/2">
                    <h1 className='text-4xl font-bold hidden lg:block my-5'>Providing support for <br /> million artists</h1>
                    <p className='hidden lg:block mb-5'>Find things you'll love. Support independent sellers.</p>
                    {user?.uid ? <></> : <Link href='/login'><button className="btn btn-secondary hidden lg:block uppercase">Log in to start commissioning</button></Link>}
                </div>
                <img src={banner3} className="w-1/2 hidden lg:inline-flex" alt='' ></img>
                <img src={banner3} className="w-full lg:hidden" alt=''></img>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;