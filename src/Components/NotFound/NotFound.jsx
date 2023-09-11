import notFound from "../../assets/error.png";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <img src={notFound} alt="" />
                <Link to="/" className="px-5 bg-slate-400 text-white py-2 font-semibold rounded-xl mt-5">Go to Home</Link>
            </div>
            
        </div>
    );
};

export default NotFound;