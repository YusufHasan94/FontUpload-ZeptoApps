
const Preview = () => {
    return (
        <div className="my-10">
            <h1 className="font-semibold text-2xl text-center">Preview of All Fonts</h1>
            <div className="flex justify-center items-center my-10">
                <table className="border-2 w-full text-center">
                    <tr className="border-2">
                        <th className="border-2">Font Name</th>
                        <th className="border-2">Preview</th>
                        <th className="border-2">Action</th>
                    </tr>
                    <tr className="border-2">
                        <td className="border-2">dummy1</td>
                        <td className="border-2">dummy1</td>
                        <td className="border-2">dummy1</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Preview;