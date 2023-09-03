import { FaXmark } from "react-icons/fa6";

const Modal = ({handleModal}) => {
    return (
        <div className="absolute top-28 left-60 bg-white w-3/4 border-2 p-4 rounded-xl">
            <div>
                <button onClick={handleModal} className="absolute top-5 left-5">
                    <FaXmark/>
                </button>
                <div className="flex flex-col items-center justify-center">
                    <label htmlFor="groupName" className="text-start text-xl font-semibold">Group Name</label>
                    <input type="text" name="groupName" id="" className="border-2 rounded-lg w-1/2 mt-2 p-1" />
                </div>
                <div className="flex flex-col justify-center items-center my-5">
                    <h1 className="my-4 text-2xl">Existing Fonts</h1>
                    <table className="border-2 w-3/4 text-center">
                        <tr className="border-2">
                            <th className="border-2">Font Name</th>
                            <th className="border-2">Preview</th>
                            <th className="border-2">Action</th>
                        </tr>
                        <tr className="border-2">
                            <td className="border-2">dummy1</td>
                            <td className="border-2">dummy1</td>
                            <td className="border-2"><button className="text-gray-600">Select</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Modal;