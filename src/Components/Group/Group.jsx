import { useState } from "react";
import Title from "../Title/Title";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";
import EditModal from "../EditModal/EditModal";

const Group = () => {
    const [modalCondition, setModalCondition] = useState(false);
    const [editModalCondition, setEditModalCondition] = useState(false);
    const handleModal = ()=>{
        setModalCondition(!modalCondition);
    }
    const handleEdit = ()=>{
        setEditModalCondition(!editModalCondition);
    }
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'bg-green-500 text-white p-2 rounded-xl font-semibold ',
          cancelButton: 'bg-red-500 text-white p-2 rounded-xl font-semibold mr-4'
        },
        buttonsStyling: false
      })
      const deleteFont =()=>{
        console.log("deleted");
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
    }
    return (
        <div>
            <Title title="Create Fonts Group using existing fonts"/>
            <div className="flex justify-start my-5 mx-10">
                <button className="bg-gray-600 font-semibold text-white px-4 py-2 rounded-xl" onClick={handleModal}>Add New Group</button>
                {
                    modalCondition?<Modal handleModal={handleModal}></Modal>:""
                }
            </div>
            <div>
                <div className="flex flex-col justify-center items-center my-10">
                    <h1 className="my-4 text-2xl">List of All Fonts</h1>
                    <table className="border-2 w-3/4 text-center">
                        <tr className="border-2">
                            <th className="border-2">Font Name</th>
                            <th className="border-2">Preview</th>
                            <th className="border-2">Action</th>
                        </tr>
                        <tr className="border-2">
                            <td className="border-2">dummy1</td>
                            <td className="border-2">dummy1</td>
                            <td className="border-2">
                                <button className="text-blue-600" onClick={handleEdit}>Edit</button> | <button className="text-red-600" onClick={deleteFont}>Delete</button>
                                {
                                    editModalCondition?<EditModal handleEdit={handleEdit}></EditModal>:""
                                }
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Group;