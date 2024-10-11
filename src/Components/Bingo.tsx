import { useState } from "react";
import "./Bingo.css";
import { textList, squareCount, stamp } from "./Filler";
// import stampL from "../assets/logo_iberanime.svg";
import banner from "../assets/bg.png";

function Bingo() {
    let bingoArray: Array<boolean> = [];

    try {
        bingoArray = JSON.parse(localStorage.getItem("bingo")!).filter(
            (val: boolean) => val == !!val
        );
        if (bingoArray.length !== 25) throw "Invalid backup array - resetting";
    } catch {
        bingoArray = new Array(squareCount).fill(false);
        localStorage.setItem("bingo", JSON.stringify(bingoArray));
    }

    const [bingoArrayState, setBingoArray] =
        useState<Array<boolean>>(bingoArray);

    const bingoArrayMapped = bingoArrayState.map((element, index) => (
        <div key={index} className={"div" + index + " inGrid"}>
            <Square
                text={textList[index]}
                completed={element}
                index={index}
                cbFunc={(index: number, newStatus: boolean) =>
                    updateBingoArray(index, newStatus)
                }
            ></Square>
        </div>
    ));

    function updateBingoArray(index: number, newStatus: boolean) {
        const ret = bingoArrayState.slice(0);
        ret[index] = newStatus;
        setBingoArray(ret);
        localStorage.setItem("bingo", JSON.stringify(ret));
    }

    return (
        <>
            <a href="https://www.iberanime.com/">
                <img src={banner} className="image-boundary" alt="" />
            </a>
            <div className="parent">{bingoArrayMapped}</div>
            <button
                type="button"
                onClick={() => {
                    setBingoArray(new Array(25).fill(false));
                    localStorage.setItem(
                        "bingo",
                        JSON.stringify(new Array(25).fill(false))
                    );
                }}
                style={{ marginTop: "5px", color:"white" }}
            >
                Reset
            </button>
            <div style={{ marginTop: "5px", fontSize: "6px" }}>
                Todos os direitos reservados aos autores dos logótipos.
                <br />
                Não estou associado ao{" "}
                <a href="https://www.iberanime.com/">IberAnime</a> de maneira
                alguma.
                <br />
                Este bingo serve puramente para motivos recreativos.
                <br />
                Para contacto, posso ser encontrado em{" "}
                <a href="https://www.instagram.com/nebbycos/">@nebbycos</a>.
            </div>
        </>
    );
}

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
                    <img src={stamp} className="stamp" alt="" />
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

export default Bingo;
