import { useState, useEffect } from "react";
import utils from "./utlis";

//Custom  Hook
const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [avilableNums, setAvilableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);
    
    useEffect(() => {
      if(secondsLeft > 0) {
        const timerId = setTimeout(() => {
          setSecondsLeft(secondsLeft -1);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    })
  
    const setGameState = (newCandidateNums) => {
      if(utils.sum(newCandidateNums) !== stars) {
        setCandidateNums(newCandidateNums);
      }
      else {
        const newAvilableNums = avilableNums.filter(
          n => !newCandidateNums.includes(n)
        );
        setStars(utils.randomSumIn(newAvilableNums, 9));
        setAvilableNums(newAvilableNums);
        setCandidateNums([]);
      }
    }
    return { stars, avilableNums, candidateNums, secondsLeft, setGameState }; 
  }

  export default useGameState;