import logo from '../images/brand-logo.png';
import styles from '../styles/Home.module.css'

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <div>
                <img className='w-32' src={logo} alt=""></img>
                <p className={`${styles.brandlogo} text-3xl`}>Daily Commissions.</p>
                <p>A Platform To Nourish Creativity</p>
            </div>
            <div>
                <span className="footer-title">For Artists</span>
                <a className="link link-hover">Add Your Commission</a>
                <a className="link link-hover">Proper Ways to get your payment</a>
                <a className="link link-hover">Advertise Yourself</a>
            </div>
            <div>
                <span className="footer-title">For Consumers</span>
                <a className="link link-hover">Request an Commission</a>
                <a className="link link-hover">How to gift the commissions to others</a>
                <a className="link link-hover">Rules to follow when commissioning artworks</a>
                <a className="link link-hover">How to pay</a>
            </div>
            <div>
                <span className="footer-title">Legal</span>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </div>
        </footer>
    );
};

export default Footer;