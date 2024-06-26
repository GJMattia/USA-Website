import './Game.css';
import { useState } from 'react';
import PresidentData from '../../../assets/data/PresidentData.json';
import President from '../President/President';
import { Link } from 'react-router-dom';
import Results from '../Results/Results';
import Spotlight from '../Spotlight/Spotlight';

export default function Game() {

    //State Variables
    const [time, setTime] = useState<number>(0);
    const [presidentsLeft, setPresidentsLeft] = useState<number[]>(Array.from({ length: 46 }, (_, index: number) => index));
    const [current, setCurrent] = useState<number>(Math.floor(Math.random() * presidentsLeft.length));
    const [gameStatus, setGameStatus] = useState<boolean>(true);
    const [wrong, setWrong] = useState<number>(0);


    function initGame(): void {
        setTime(0);
        setWrong(0);
        setGameStatus(true);
        setPresidentsLeft(Array.from({ length: 46 }, (_, index: number) => index));
        setCurrent(Math.floor(Math.random() * presidentsLeft.length));
        const doneElements = document.querySelectorAll("#Wrong");
        doneElements.forEach(element => {
            element.removeAttribute("id");
        });
        const unflip = document.querySelectorAll(".Flip");
        unflip.forEach(element => {
            element.classList.remove("Flip");
        });
    }

    return (
        <div className='GameBox'>

            {gameStatus ?
                <div className='Game'>
                    <Spotlight
                        img={PresidentData[current].img}
                        name={PresidentData[current].name}
                        term={PresidentData[current].termSpan}
                        time={time}
                        setTime={setTime}
                    />

                    <div className='Presidents'>
                        {PresidentData.map((_, index) => (
                            <President
                                key={index}
                                index={index}
                                name={PresidentData[index].name}
                                img={PresidentData[index].img}
                                current={current}
                                setCurrent={setCurrent}
                                presidentsLeft={presidentsLeft}
                                setPresidentsLeft={setPresidentsLeft}
                                setGameStatus={setGameStatus}
                                wrong={wrong}
                                setWrong={setWrong}
                            />
                        ))}

                    </div>
                    <div className='GameBtnBox'>
                        <Link className='GameBtn ReturnBtn' to='/presidents'>Home</Link>
                        <button onClick={initGame} className='GameBtn RestartBtn'>Restart</button>
                    </div>

                </div>
                :

                <Results time={time} wrong={wrong} />



            }
        </div>
    )
}