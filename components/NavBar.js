import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import logo from '../images/brand-logo.png';
import styles from '../styles/Home.module.css'

const NavBar = ({ darkMode, setDarkMode }) => {
    const { user, logOut, userInfo, isLoading } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    return (
        <div className="container mx-auto">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href='/artworks'>Artworks</Link></li>
                            {user?.uid ? <></> :
                                <>
                                    <li><Link href='/login'>Login</Link></li>
                                    <li><Link href='/register'>Join Now</Link></li>
                                </>
                            }
                            <li><a>Theme:<input onClick={() => setDarkMode(!darkMode)} type="checkbox" className="toggle toggle-md" /></a></li>
                            {user?.uid && <li tabIndex={0}>
                                <a>
                                    <>{user?.displayName}</>
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                                </a>
                                <ul className="p-2 bg-base-100">
                                    {
                                        userInfo[0] && userInfo[0]?.role === 'consumer' && <>
                                            <li><Link href='/request'>Request a commission</Link></li>
                                            <li><Link href='/myorders'>My Orders</Link></li>
                                        </>
                                    }
                                    {
                                        userInfo[0] && userInfo[0]?.role === 'artist' && <>
                                            <li><Link href='/addartwork'>Add Artwork</Link></li>
                                            <li><Link href='/mycommissions'>My Commissions</Link></li>
                                            <li><Link href='/myartworks'>My Artworks</Link></li>
                                        </>
                                    }
                                    <li><button onClick={handleLogOut}>Logout</button></li>
                                </ul>
                            </li>}
                        </ul>
                    </div>
                    <div className="avatar">
                        <div className="w-8 rounded">
                            <img src={logo.src} alt=""></img>
                        </div>
                    </div>
                    <Link href='/' className={`${styles.brandlogo} btn btn-ghost normal-case text-3xl font-normal`}>Daily Commissions</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href='/artworks'>Artworks</Link></li>
                        {user?.uid ? <></> :
                            <>
                                <li><Link href='/login'>Login</Link></li>
                                <li><Link href='/register'>Join Now</Link></li>
                            </>
                        }
                    </ul>
                    <div className="divider divider-horizontal">|</div>
                    <input onClick={() => setDarkMode(!darkMode)} type="checkbox" className="toggle toggle-md" />
                    {user?.uid && <div className="dropdown dropdown-end ml-5">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} alt="" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                userInfo[0] && userInfo[0].role === 'Consumer' && <>
                                    <li><Link href='/request'>Request a commission</Link></li>
                                    <li><Link href='/myorders'>My Orders</Link></li>
                                </>
                            }
                            {
                                userInfo[0] && userInfo[0].role === 'Artist' && <>
                                    <li><Link href='/addartwork'>Add Artwork</Link></li>
                                    <li><Link href='/mycommissions'>My Commissions</Link></li>
                                    <li><Link href='/myartworks'>My Artworks</Link></li>
                                </>
                            }
                            <li><button onClick={handleLogOut}>Logout</button></li>
                        </ul>
                    </div>}
                </div>
            </div>

        </div >
    );
};

export default NavBar;