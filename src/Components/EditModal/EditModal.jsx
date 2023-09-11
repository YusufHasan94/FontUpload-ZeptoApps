import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";


const EditModal = ({handleEdit, requestedEdit}) => {
    const [allFonts, setAllFonts] = useState([]);
    const [groupFonts, setGroupFonts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost/fontUploadServer/editgroup.php?group=${requestedEdit}`)
          .then(res => res.json())
          .then(data => {
            setGroupFonts(data);
            console.log(data);
            // setLoading(false);
          })
          .catch((err) => console.log(err))
      }, [])

    useEffect(()=>{
        fetch('http://localhost/fontUploadServer/index.php')
        .then(res=> res.json())
        .then(data=> setAllFonts(data))
    },[])

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'bg-green-500 text-white p-2 rounded-xl font-semibold ',
          cancelButton: 'bg-red-500 text-white p-2 rounded-xl font-semibold mr-4'
        },
        buttonsStyling: false
      })

    const removeFont = (id)=>{
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
                fetch(`http://localhost/fontUploadServer/groupDelete.php?id=${id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                })
                .then(res => {
                  if (res.status == 200) {
                    const available = groupFonts.filter(i=> i.id !=id);
                    setGroupFonts(available);
                    swalWithBootstrapButtons.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                  }
                })
                .catch(err => console.log(err));          
              }
            else if (
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
    const handleSelected = (id)=>{
        const selectedData = allFonts.find(i => i.id == id);
        const group = {
            name: requestedEdit,
            groupMember: selectedData?.font_name,
        }
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
        <div className="absolute top-1/2 left-0 md:top-28 md:left-60 bg-white w-full md:w-3/4 border-2 p-4 rounded-xl">
            <div>
                <button onClick={handleEdit} className="absolute top-5 left-5">
                    <FaXmark/>
                </button>

                <div className="flex flex-col items-center justify-center">
                    <label htmlFor="groupName" className="text-start text-xl font-semibold">Group Name</label>
                    <input type="text" name="groupName" id="" className="border-2 rounded-lg w-1/2 mt-2 p-1 font-semibold" value={requestedEdit} />
                </div>
                <div className="flex flex-col justify-center items-center mb-5">
                    <h1 className="my-4 text-2xl">Existing Fonts</h1>
                    <table className="border-2 w-full md:w-3/4 text-center">
                        <thead>
                            <tr className="border-2">
                                <th className="border-2 px-1">Font Name</th>
                                <th className="border-2 px-1">Preview</th>
                                <th className="border-2 px-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                groupFonts.map(i => (
                                    <tr className="border-2" key={i.id}>
                                        <td className="border-2 px-1">{i.all_fonts}</td>
                                        <td className="border-2 px-1"></td>
                                        <td className="border-2 px-1"><button className="text-red-600" onClick={()=> removeFont(i.id)}>Remove</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col justify-center items-center mb-5">
                    <h1 className="my-4 text-2xl">Remaining Fonts</h1>
                    <table className="border-2 w-full md:w-3/4 text-center">
                        <thead>
                            <tr className="border-2">
                                <th className="border-2 px-1">Font Name</th>
                                <th className="border-2 px-1">Preview</th>
                                <th className="border-2 px-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allFonts.map(i=>(
                                <tr className="border-2" key={i.id}>
                                    <td className="border-2 px-1">{i.font_name}</td>
                                    <td className="border-2 px-1"></td>
                                    <td className="border-2 px-1"><button className="text-gray-600" onClick={()=> handleSelected(i.id)}>Select</button></td>
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

export default EditModal;