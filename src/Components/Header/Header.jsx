import { Link } from "react-router-dom";
import icon from "../../assets/text.png";

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-96 md:justify-between bg-gray-100 p-4">
            <div className="flex text-center gap-4 text-2xl">
                <img src={icon} className="w-10" alt="" />
                <Link to="/">Font Upload & Grouping</Link>
            </div>
            <div className="w-full md:w-fit flex justify-end">
                <div className="navLinks text-lg flex gap-10 pr-4 md:pr-20">
                    <Link to="/preview" className="active:text-red-300">Preview</Link>
                    <Link to="/group" className="active:text-red-300">Groups</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;