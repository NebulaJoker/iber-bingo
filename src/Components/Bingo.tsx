import { useEffect, useState } from "react";
import "./Bingo.css";
import { textList, squareCount, freeSpot, freeSpotText } from "./Filler";
import banner from "../assets/bg.png";
import Square from "./Square";

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

        bingoArray[freeSpot][0] = freeSpotText;

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
    const [importExportToggle, setImportExportToggle] =
        useState<boolean>(false);

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

    useEffect(
        () => localStorage.setItem("bingoV2", JSON.stringify(bingoArrayV2)),
        [bingoArrayV2]
    );

    const importExportPrompt = (
        <div className="import-export">
            <div>
                <input
                    type="text"
                    name=""
                    id=""
                    value={exportBingo}
                    onChange={(event) => setBingo(event.target.value)}
                ></input>
                <div style={{ marginTop: "30px" }}>
                    <button
                        type="button"
                        onClick={() => setBingo(copyBingoPrompts())}
                    >
                        Exportar Bingo
                    </button>
                    <button type="button" onClick={() => importBingoPrompts()}>
                        Importar Bingo
                    </button>
                </div>
            </div>
            <div style={{ marginTop: "25px", fontSize: "10px" }}>
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
        </div>
    );

    function updateBingoArray(index: number, newStatus: boolean) {
        const ret = bingoArrayV2.slice(0);
        ret[index][1] = newStatus;
        setBingoArrayV2(ret);
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

    function importBingoPrompts() {
        try {
            const arr: number[] = JSON.parse(exportBingo);

            const unique: Set<number> = new Set(arr);

            if (unique.size !== squareCount || arr[freeSpot] !== -1)
                throw "Under 25";

            for (const num of unique) {
                if (num < -1 || num >= textList.length) {
                    throw "Out of bounds";
                }
            }

            const arr2: [string, boolean][] = bingoArrayV2.slice(0);

            for (let i = 0; i < squareCount; ++i) {
                if (arr[i] === -1) {
                    arr2[i][0] = freeSpotText;
                    arr2[i][1] = false;
                } else {
                    arr2[i][0] = textList[arr[i]];
                    arr2[i][1] = false;
                }
            }

            setBingoArrayV2(arr2);
        } catch {
            alert("O bingo é inválido.");
        }
    }

    return (
        <>
            <a href="https://www.iberanime.com/">
                <img src={banner} className="image-boundary" alt="" />
            </a>
            {importExportToggle ? (
                importExportPrompt
            ) : (
                <div className="parent">{bingoArrayMapped}</div>
            )}

            <div style={{ marginTop: "10px" }}>
                <button
                    type="button"
                    onClick={() => {
                        setBingoArrayV2(() => {
                            const arr = bingoArrayV2.slice(0);
                            for (let i = 0; i < arr.length; ++i)
                                arr[i][1] = false;
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
                <button
                    type="button"
                    onClick={() => setImportExportToggle(!importExportToggle)}
                >
                    Definições
                </button>
            </div>
        </>
    );
}

export default Bingo;
