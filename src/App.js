import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState(null)
  const [userInput, setUserInput] = useState({
    currentBalance: 0,
    monthlyContribution: 0,
    yearsOutstanding: 0,
    periodicTenor: 0,
    interestRate: 0.08
  })

  const getInputs = (e) => {
    setUserInput({...userInput, [e.target.name]: parseFloat(e.target.value)})
  }

  const thousandSeperator = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const calculate = (e) => {
    e.preventDefault()
    const { currentBalance, monthlyContribution, yearsOutstanding, interestRate} = userInput;  

    let counter = yearsOutstanding * 11;
    if(yearsOutstanding > 1) counter = (yearsOutstanding * 12) - 1;
    let compInterest = monthlyContribution
    let initialDepositCompound = currentBalance * Math.pow(1 + interestRate/12, (counter + 1))

    let totalBalance = initialDepositCompound
    
    for(let i = 0; i < yearsOutstanding * 12; i++) {
      if(counter > 0) {
        compInterest += monthlyContribution * Math.pow(1 + interestRate/12, counter)
        counter = counter - 1
      }      
    }
    totalBalance += compInterest
    setResult(thousandSeperator(totalBalance.toFixed(2)))
    setMessage(`Your Balance in next ${userInput.yearsOutstanding * 12} Months will be:`)
  }

  const reset = (e) => {
    setUserInput({...userInput, [e.target.name]: ""})
  }
  return (    
    <div className="wrapper">
      <form action="" className="formWrapper">
      <h2 >Pension Calculator</h2>
        <div className="inputDiv">
          <label>Current Balance</label><br/>
          <input type="number" name="currentBalance" onChange={getInputs}/>
        </div>
        <div className="inputDiv">
          <label>Expected Monthly Contribution</label><br/>
          <input type="number" name="monthlyContribution" onChange={getInputs}/>
        </div>
        <div className="inputDiv">
          <label>Years Left to work</label><br/>
          <input type="number" name="yearsOutstanding" onChange={getInputs}/>
        </div>
        
        <div className="sideToSide">
          <div className="tenorDiv">
            <label>Tenure</label><br/>
            <input type="text" name="periodicTenor" value={userInput.yearsOutstanding * 12 } onChange={getInputs}/>
          </div>  
          <div className="rateDiv">
            <label>Rate</label><br/>
            <select name="interestRate" onChange={getInputs} > 
              <option value="0.08">8%</option>
              <option value="0.09">9%</option>
              <option value="0.10">10%</option>
              <option value="0.11">11%</option>
              <option value="0.12">12%</option>
              <option value="0.13">13%</option>
              <option value="0.14">14%</option>
              <option value="0.15">15%</option>
              <option value="0.16">16%</option>
            </select>
          </div>
          
        </div> 

        
        <div className="resultDiv">
            <p>{message}</p>
            <h2>{result}</h2>
        </div>   
        <button className="calculateButton" onClick={calculate}>Calculate</button>
        <button className="resetButton" onClick={reset}>Reset</button>
      </form> 

    </div>
  );
}

export default App;
