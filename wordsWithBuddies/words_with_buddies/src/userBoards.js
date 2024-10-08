import  { useEffect, useState,useRef } from 'react';


export function UserBoards( { setVals, emptyBoard, curr_board, setWords }){
    const [boardNames, setBoardNames] = useState([]);


    async function set_board(board){
        setWords(null);
        const result = await fetch("https://ahidas.pythonanywhere.com/api/get_board",{method: 'POST', credentials: 'include' , body: board});
        const js = await result.json();
        console.log(js);
        setVals(js);
        curr_board.current = board;
        getBoardNames();
    }

    async function getBoardNames(){
        const result = await fetch("https://ahidas.pythonanywhere.com/api/get_board_names",{method: 'GET', credentials: 'include'});
        const js = await result.json();
        console.log(js);
        setBoardNames(js);   
    }
    useEffect(() => {
        getBoardNames();
    }, []); 
    return (<div className='user_boards'> 
     <h2>User Boards</h2>
            <ul>
                {boardNames.map((board, index) => (
                    <li key={index}> <button onClick={() => set_board(board[0])}> {board} </button></li>
                ))}
                <li key={-1}> <button onClick={() => { curr_board.current = ""; setWords(null); setVals(emptyBoard.map(function(arr) { return arr.slice();})); getBoardNames();}}> New Board </button></li>
            </ul>

    </div>)
}