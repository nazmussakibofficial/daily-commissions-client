import { BsCardImage } from 'react-icons/bs';
import { FaUsers, FaTruck } from 'react-icons/fa';
const Overview = () => {
    return (
        <div className="hidden md:flex justify-around container mx-auto my-10 gap-10">
            <div>
                <BsCardImage className='text-3xl mb-2' />
                <h1 className="font-bold mb-2">Authentic and hand-crafted Items</h1>
                <p>Buy or commission original artworks from <br /> artists all around the world</p>
            </div>
            <div>
                <FaTruck className='text-3xl mb-2' />
                <h1 className="font-bold mb-2">Risk-free shopping</h1>
                <p>Secure transactions, delivery within 14 days, <br /> Can be replaced within 1 week</p>
            </div>
            <div>
                <FaUsers className='text-3xl mb-2' />
                <h1 className="font-bold mb-2">Creative connection</h1>
                <p> Follow different artists, rate and review <br /> their commissions</p>
            </div>

        </div>
    );
};

export default Overview;