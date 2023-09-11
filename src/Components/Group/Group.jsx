import { useEffect, useState } from "react";
import Title from "../Title/Title";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";
import EditModal from "../EditModal/EditModal";
import { FallingLines } from "react-loader-spinner";

const Group = () => {
  const [modalCondition, setModalCondition] = useState(false);
  const [editModalCondition, setEditModalCondition] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/fontUploadServer/fetchgroup.php")
      .then(res => res.json())
      .then(data => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err) => console.log(err))
  }, [])

  const handleModal = () => {
    setModalCondition(!modalCondition);
  }
  const handleEdit = () => {
    setEditModalCondition(!editModalCondition);
  }


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-green-500 text-white p-2 rounded-xl font-semibold ',
      cancelButton: 'bg-red-500 text-white p-2 rounded-xl font-semibold mr-4'
    },
    buttonsStyling: false
  })
  const deleteFontGroup = (id) => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        fetch(`http://localhost/fontUploadServer/groupDelete.php?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(res => {
            if (res.status == 200) {
              const extra = groups.filter(i => i.id != id);
              setGroups(extra);
              // console.log(availableData);
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
          .catch(err => console.log(err));
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
      <Title title="Create Fonts Group using existing fonts" />
      <div className="flex justify-start my-5 mx-10">
        <button className="bg-gray-600 font-semibold text-white px-4 py-2 rounded-xl" onClick={handleModal}>Add New Group</button>
        {
          modalCondition ? <Modal handleModal={handleModal}></Modal> : ""
        }
      </div>
      <div>
        <div className="flex flex-col justify-center items-center my-10">
          <h1 className="my-4 text-2xl">List of All Groups</h1>
          {
            loading ? <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              ariaLabel='falling-lines-loading'
            /> :
              <table className="border-2 w-3/4 text-center">
                <thead>
                  <tr className="border-2">
                    <th className="border-2">Group Name</th>
                    <th className="border-2">Fonts</th>
                    <th className="border-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    groups.map(i => (
                      <tr className="border-2" key={i.id}>
                        <td className="border-2">{i.group_name}</td>
                        <td className="border-2">{i.all_fonts}</td>
                        <td className="border-2">
                          <button className="text-blue-600" onClick={handleEdit}>Edit</button> |
                          <button className="text-red-600" onClick={() => deleteFontGroup(i.id)}>Delete</button>
                          {
                            editModalCondition ? <EditModal handleEdit={handleEdit}></EditModal> : ""
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          }
        </div>
      </div>
    </div>
  );
};

export default Group;