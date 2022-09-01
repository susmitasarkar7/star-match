import useGameState from './CustomHook';
import utils from "./utlis";
import PlayNumber from './PlayNumber';
import StarsDisplay from "./StarsDisplay";
import PlayAgain from "./PlayAgain";

const StarMatch = (props) => {
    const {
      stars,
      avilableNums,
      candidateNums,
      secondsLeft,
      setGameState
    } = useGameState();

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = avilableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active'

    // const resetGame = () => {
    //   setStars(utils.random(1, 9));
    //   setAvilableNums(utils.range(1,9));
    //   setCandidateNums([]);
    // }

    const numberStatus = (number) => {
        if(!avilableNums.includes(number)) {
            return 'used';
        }
        if(candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate'; 
        }
        return 'avilable';
    }

    const onNumberClick = (number, currentStatus) => {
      if(gameStatus !== 'active' || currentStatus === 'used') {
        return;
      }
      //candidateNums
      const newCandidateNums = currentStatus === 'avilable'? candidateNums.concat(number) 
      : candidateNums.filter(cn => cn !== number);

      setGameState(newCandidateNums);
    }

    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {
              gameStatus !== 'active' ? (
                <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
              ) : (
                <StarsDisplay count={stars} />
              )
            }
          </div>
          <div className="right">
            {utils.range(1, 9).map(number => 
              <PlayNumber 
              key={number} 
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick} />  
            )}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
  };
  
  
//   ReactDOM.render(<StarMatch />, mountNode);
  export default StarMatch;