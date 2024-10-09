import { useState } from "react";
import "./Bingo.css";

function Bingo() {
    const squares = 25;

    let bingoArray: Array<boolean> = [];

    try {
        bingoArray = JSON.parse(localStorage.getItem("bingo")!).filter(
            (val: boolean) => val == !!val
        );
        if (bingoArray.length !== 25) throw "Invalid backup array - resetting";
    } catch {
        bingoArray = new Array(squares).fill(false);
        localStorage.setItem("bingo", JSON.stringify(bingoArray));
    }

    const textList = [
        "Cosplay de Zenless Zone Zero",
        "Alguém de trela a ser passeado",
        "Fotografias sem consentimento",
        "Arte traced ou Dropshipping do AliExpress",
        "Problemas audiovisuais num dos palcos",
        "Cosplay de Família",
        "Casal a comer-se sem querer saber dos outros",
        "Cosplayer de tronco nú",
        "Posters NSFW",
        'Grupo de moços solteiros com cartaz "Free Hugs"',
        "Cosplay de Miku País (qualquer país)",
        "Pessoas a gravar TikToks num canto qualquer",
        "Cosplay que gostem (Free Spot)",
        "Música de Pokémon ou Dragon Ball GT",
        "Meet de Cosplayers no Círculo grande da Exponor",
        '"O Cheiro" tradicional',
        "Pedaço de cosplay perdido no chão",
        "Fursuit",
        "Pessoa que foi chulada (sacos mistério)",
        "Peça de roupa ahegao",
        "Voluntariado que quer ir para casa",
        "Alguém sentado no chão a comer noodles",
        'André Manz a dizer "Sucesso!"',
        "Selfie com a Mascote do IA",
        "Ouvir o Para Para Dance fora do Para Para Dance",
    ];

    const emojiList = [
        "💤",
        "⛓",
        "📸",
        "🕵️‍♀️",
        "😅",
        "👪",
        "💏",
        "🧜‍♂️",
        "🔞",
        "🫂",
        "🇧🇷",
        "🤳",
        "🧝‍♀️",
        "🇵🇹",
        "🏟",
        "🦠",
        "🧐",
        "🐺",
        "💸",
        "😩",
        "🧍",
        "🍜",
        "👍",
        "🤖",
        "🕺",
    ];

    const bingoArrayMapped = bingoArray.map((element, index) => (
        <div key={index} className={"div" + index + " inGrid"}>
            <Square
                text={textList[index]}
                emoji={emojiList[index]}
                backupStatus={element}
                index={index}
                cbFunc={(index: number, newStatus: boolean) =>
                    updateBingoArray(index, newStatus)
                }
            ></Square>
        </div>
    ));

    function updateBingoArray(index: number, newStatus: boolean) {
        bingoArray[index] = newStatus;
        localStorage.setItem("bingo", JSON.stringify(bingoArray));
    }

    return (
        <div style={{width: "587.5px"}}>
            <div style={{ margin: "auto" }}>Bingo do Iber</div>
            <div className="parent">{bingoArrayMapped}</div>
        </div>
    );
}

function Square({
    text,
    emoji,
    backupStatus,
    index,
    cbFunc,
}: {
    text: string;
    emoji: string;
    backupStatus: boolean;
    index: number;
    cbFunc: (index: number, newStatus: boolean) => void;
}) {
    const [completed, setComplete] = useState(backupStatus);

    function completeSquare(newStatus: boolean) {
        setComplete(newStatus);
        cbFunc(index, newStatus);
    }

    if (completed) {
        return (
            <div
                className="square ticked"
                onClick={() => completeSquare(false)}
            >
                {emoji}
            </div>
        );
    } else {
        return (
            <div className="square" onClick={() => completeSquare(true)}>
                {text}
            </div>
        );
    }
}

export default Bingo;
