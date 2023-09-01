import Preview from "../Preview/Preview";
import Upload from "../Upload/Upload";

const Main = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div>
                <Upload></Upload>
                <Preview></Preview>
            </div>
        </div>
    );
};

export default Main;