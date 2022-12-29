import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
const Main = ({ children, darkMode, setDarkMode }) => {
    return (
        <div className="bg-base-200" data-theme={darkMode ? "black" : "wireframe"}>
            <Toaster></Toaster>
            <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
            {children}
            <Footer></Footer>
        </div>
    );
};

export default Main;




