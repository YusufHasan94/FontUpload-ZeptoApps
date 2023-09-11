import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const Modal = ({ handleModal }) => {
    const [fonts, setFonts] = useState([]);
    const [groupName, setGroupName] = useState(null);

    useEffect(() => {
        fetch("http://localhost/fontUploadServer/index.php")
            .then(res => res.json())
            .then(data => setFonts(data));
    }, [])

    const handleGroupName = e => {
        const name = e.target.value;
        setGroupName(name);
    }
    const handleSelect = (id) => {
        const selectedData = fonts.find(i => i.id == id);
        console.log(selectedData.font_name);
        const group = {
            name: groupName,
            groupMember: selectedData?.font_name,
        }
        console.log(group);
        fetch('http://localhost/fontUploadServer/group.php', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(group),
        })
        .then(res => {
            if(res.status == 200){
                console.log("data inserted");
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'successfully create group',
                    showConfirmButton: false,
                    timer: 1500
                })

            }
            else {
                console.log("failed to inserted");
            }
        })
        .catch(err => console.log(err))
        }


    return (
        <div className="absolute top-28 left-60 bg-white w-3/4 border-2 p-4 rounded-xl">
            <div>
                <button onClick={handleModal} className="absolute top-5 left-5">
                    <FaXmark />
                </button>
                <div className="flex flex-col items-center justify-center">
                    <label htmlFor="groupName" className="text-start text-xl font-semibold">Group Name</label>
                    <input type="text" name="groupName" id="" className="border-2 rounded-lg w-1/2 mt-2 p-1" onChange={handleGroupName} />
                </div>
                <div className="flex flex-col justify-center items-center my-5">
                    <h1 className="my-4 text-2xl">Existing Fonts</h1>
                    <table className="border-2 w-3/4 text-center">
                        <thead>
                            <tr className="border-2">
                                <th className="border-2">Font Name</th>
                                <th className="border-2">Font Type</th>
                                <th className="border-2">Preview</th>
                                <th className="border-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fonts.map((i, index) => (
                                    <tr className="border-2" key={index}>
                                        <td className="border-2">{i.font_name}</td>
                                        <td className="border-2">{i.file_type}</td>
                                        <td className="border-2"></td>
                                        <td className="border-2"><button className='text-gray-600' onClick={() => handleSelect(i.id)}>Select</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Modal;