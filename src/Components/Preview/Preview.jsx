import Swal from "sweetalert2";
import Title from "../Title/Title";
import { useEffect, useState } from "react";

const Preview = () => {

  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    fetch("http://localhost/fontUploadServer/index.php")
      .then(res => res.json())
      .then(data => setFonts(data));
  }, [])



  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-green-500 text-white p-2 rounded-xl font-semibold ',
      cancelButton: 'bg-red-500 text-white p-2 rounded-xl font-semibold mr-4'
    },
    buttonsStyling: false
  })

  const deleteFont = () => {
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
    <div className="my-10">
      <Title title="Preview of All Fonts" />
      <div className="flex justify-center items-center my-10">
        <table className="border-2 w-3/4 text-center">
          <tr className="border-2">
            <th className="border-2">Font Name</th>
            <th className="border-2">Preview</th>
            <th className="border-2">Action</th>
          </tr>
          {
            fonts.map((i, index) => (
              <tr className="border-2" key={index}>
                <td className="border-2">{i.font_name.split(".ttf")}</td>
                <td className="border-2">{i.preview}</td>
                <td className="border-2"><button className="text-red-600" onClick={deleteFont}>Delete</button></td>
              </tr>
            ))
          }
        </table>
      </div>
    </div>
  );
};

export default Preview;