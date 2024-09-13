
import './style.css';
import { useEffect, useState } from "react";
import { GameBoard } from './board.js';
import { Input } from './input.js';

const emptyBoard = [
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","",""]
  ];


function App() {
  const [words, setWords] = useState(null);
  const [vals, setVals] = useState(emptyBoard);
  const [percent, setPercent] = useState(0.0);

  return (
   <div className='site'> 

    <Header/> 
    <div className='body'>
      <div className='boardAndInput'>
      <text> Enter your current GameBoard in the grid - then your letters - then click analyze!</text>
    <GameBoard vals={vals} setVals={setVals}/>
    <Input setWords ={setWords} vals={vals} setPercent = {setPercent} percent = {percent}/> 
    </div>
    <BestWords words={words} setVals={setVals} vals={vals} percent={percent}/>

   </div>
  </div>
  );
}

function Header(){
  return( <>
      <header className="head"> 
        <h1> Words with Buddies!</h1>
      </header>
   </>)
}
function TopWord({word, setVals, vals}){
  if (word.length < 3){
    return null; 
  }
  function handleClick(word){
    let word_arr = word.word.split("");
    console.log(word_arr);
    console.log(word.direction);
    for(let n = 0; n < word.word.length; n++){
      console.log(word_arr[n],n);
       if(word.direction == "horizontal"){
        vals[parseInt(word.position[1])][parseInt(word.position[0]) + n] = word_arr[n];
        console.log('h');
       }else{
        console.log('v', parseInt(word.position[0]) + n - 1, n, word.position[0]);
        vals[parseInt(word.position[1]) + n][parseInt(word.position[0])] = word_arr[n];
       }
    }
    setVals([...vals]);
  }
  return <> <button className='pot' onClick={() => {handleClick(word)}}> {word.word.toUpperCase()} for {word.points} at position ({word.position[0]},{word.position[1]}) in the {word.direction} direction using {word.new_letters} new letters</button> <br/> </>
}

function Loading({percent}){

  return(
      <>
      <text> Finding words at square {Math.floor(percent * 225)}... </text>
      <div className="bar">
          <div className="filler" style={{width: `${percent * 100}%`}}/>
      </div>
      </>
  )
}

function BestWords({ words, setVals, vals, percent }){

  return <>
    <div>
      {percent ? <Loading percent={percent}/> : null} 
         {words ? `Total: ${words.total}` : null} <br/>
         {words ? `Longest Word: ${words.words[0].word} for ${words.words[0].points} at position (${words.words[0].position[0]},${words.words[0].position[1]}) in the ${words.words[0].direction} direction using ${words.words[0].new_letters} new letters` : null}
        <br/>
        <div className='pot_words'>
        {words ? words.words.slice(1).map((w) => (<TopWord word={w} setVals={setVals} vals={vals}/>)) : null}
        </div>
    </div>
  </>
}




export default App;
