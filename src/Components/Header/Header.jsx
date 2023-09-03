import { Link } from "react-router-dom";
import icon from "../../assets/text.png";

const Header = () => {
    return (
        <div className=" flex items-center gap-96 md:justify-between bg-gray-100 p-4">
            <div className="flex text-center gap-4 text-2xl">
                <img src={icon} className="w-10" alt="" />
                <Link to="/">Font Upload & Grouping</Link>
            </div>
            <div className="navLinks text-lg flex gap-10 pr-20">
                <Link to="/preview" className="active:text-red-300">Preview</Link>
                <Link to="/group" className="active:text-red-300">Groups</Link>
            </div>
        </div>
    );
};

export default Header;