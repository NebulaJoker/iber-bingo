import { useState } from "react";
import "./Bingo.css";
import { textList, squareCount, stamp } from "./Filler";
import banner from "../assets/bg.png";

function Bingo() {
    function shuffle(array: string[]): string[] {
        let currentIndex = array.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    }

    function generateArray(): [string, boolean][] {
        const bingoArray: [string, boolean][] = new Array(squareCount);

        const shuffled: string[] = shuffle(textList.slice(0));

        for (let i = 0; i < squareCount; ++i) {
            bingoArray[i] = [shuffled[i], false];
        }

        bingoArray[12][0] = "Cosplay que gostem (Free Spot)";

        localStorage.setItem("bingoV2", JSON.stringify(bingoArray));

        return bingoArray;
    }

    function loadLogicFromStorage(): [string, boolean][] {
        try {
            const bingoArray: [string, boolean][] = JSON.parse(
                localStorage.getItem("bingoV2")!
            );

            if (
                bingoArray.filter(
                    (val) => textList.includes(val[0]) && val[1] === !!val[1]
                ).length !== 24
            )
                throw "Invalid backup array - resetting";

            return bingoArray;
        } catch {
            return generateArray();
        }
    }

    const [bingoArrayV2, setBingoArrayV2] = useState<[string, boolean][]>(
        loadLogicFromStorage()
    );

    const [exportBingo, setBingo] = useState<string>("");

    // useEffect(() => {localStorage.setItem("bingoV2", JSON.stringify(bingoArrayV2))}, [bingoArrayV2])

    const bingoArrayMapped = bingoArrayV2.map((element, index) => (
        <div key={index} className={"div" + index + " inGrid"}>
            <Square
                text={element[0]}
                completed={element[1]}
                index={index}
                cbFunc={(index: number, newStatus: boolean) =>
                    updateBingoArray(index, newStatus)
                }
            ></Square>
        </div>
    ));

    function updateBingoArray(index: number, newStatus: boolean) {
        const ret = bingoArrayV2.slice(0);
        ret[index][1] = newStatus;
        setBingoArrayV2(ret);
        localStorage.setItem("bingoV2", JSON.stringify(ret));
    }

    function copyBingoPrompts(): string {
        let string: string = "[";

        // https://devsarticles.com/react-copy-to-clipboard
        bingoArrayV2.forEach(
            (val) => (string += textList.indexOf(val[0]) + ",")
        );
        string = string.slice(0, -1).concat("]");

        return string;
    }

    return (
        <>
            <a href="https://www.iberanime.com/">
                <img src={banner} className="image-boundary" alt="" />
            </a>
            <div className="parent">{bingoArrayMapped}</div>
            <div style={{ marginTop: "10px" }}>
                <button
                    type="button"
                    onClick={() => {
                        setBingoArrayV2(() => {
                            const arr = bingoArrayV2.slice(0);
                            for (let i = 0; i < arr.length; ++i)
                                arr[i][1] = false;
                            localStorage.setItem("bingoV2", JSON.stringify(arr))
                            return arr;
                        });
                    }}
                >
                    Limpar Bingo
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setBingoArrayV2(generateArray());
                    }}
                >
                    Novo Bingo
                </button>
                <input
                    type="text"
                    name=""
                    id=""
                    value={exportBingo}
                    onChange={() => {}}
                ></input>
                <button
                    type="button"
                    onClick={() => setBingo(copyBingoPrompts())}
                >
                    Exportar Bingo
                </button>
                <button type="button" onClick={() => {}}>
                    Importar Bingo
                </button>
            </div>
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
