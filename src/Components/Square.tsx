// import { stampLGW as stamp } from "./Filler";
// import { stamp as stamp } from "./Filler";
import "./Bingo.css";
import stamp from "../assets/stampLGW.png";

function Square({
    text,
    completed,
    index,
    cbFunc,
}: {
    text: string;
    completed: boolean;
    index: number;
    cbFunc: (index: number, newStatus: boolean) => void;
}) {
    function completeSquare(newStatus: boolean) {
        cbFunc(index, newStatus);
    }

    if (completed) {
        return (
            <div className="square">
                <div className="ticked" onClick={() => completeSquare(false)}>
                    <img src={stamp} className={"stamp " + "lgw"} alt="" />
                </div>
                <div className="blur-text text-content">{text}</div>
            </div>
        );
    } else {
        return (
            <div className="square" onClick={() => completeSquare(true)}>
                <div className="text-content">{text}</div>
            </div>
        );
    }
}

export default Square;
