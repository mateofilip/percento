import React, { useState } from "react";

const CalculatorCard = ({ title, mode }) => {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [result, setResult] = useState(null);
  const [operator, setOperator] = useState("increase");

  const calculate = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);

    if (isNaN(v1) || isNaN(v2)) {
      setResult({ error: "Please enter valid numbers" });
      return;
    }

    let res;
    switch (mode) {
      case "percentOf":
        // What is X% of Y?
        res = (v1 / 100) * v2;
        const formattedRes = Number.isInteger(res) ? res : res.toFixed(2);
        setResult({
          value: formattedRes,
          explanation: `${v1}% of ${v2} is ${formattedRes}`,
        });
        break;
      case "whatPercent":
        // X is what percent of Y?
        if (v2 === 0) {
          setResult({ error: "Cannot divide by zero" });
          return;
        }
        res = (v1 / v2) * 100;
        setResult({
          value: res.toFixed(2) + "%",
          explanation: `${v1} is ${res.toFixed(2)}% of ${v2}`,
        });
        break;
      case "increaseDecrease":
        // Percentage increase/decrease from X to Y
        if (v1 === 0) {
          setResult({
            error: "Initial value cannot be zero for percentage change",
          });
          return;
        }
        res = ((v2 - v1) / v1) * 100;
        const direction = res > 0 ? "increase" : "decrease";
        setResult({
          value: `${Math.abs(res).toFixed(2)}%`,
          explanation: `${Math.abs(res).toFixed(
            2
          )}% ${direction} from ${v1} to ${v2}`,
        });
        break;
      case "findTotal":
        // X is Y% of what? (Find Total)
        // Formula: X / (Y / 100)
        if (v2 === 0) {
          setResult({ error: "Percentage cannot be zero" });
          return;
        }
        res = v1 / (v2 / 100);
        const formattedTotal = Number.isInteger(res) ? res : res.toFixed(2);
        setResult({
          value: formattedTotal,
          explanation: `${v1} is ${v2}% of ${formattedTotal}`,
        });
        break;
      case "percentageDifference":
        // Difference between X and Y
        // Formula: |v1 - v2| / ((v1 + v2)/2) * 100
        if (v1 === 0 && v2 === 0) {
          setResult({ error: "Both values cannot be zero" });
          return;
        }
        const average = (v1 + v2) / 2;
        if (average === 0) {
          setResult({ error: "Average of values cannot be zero" });
          return;
        }
        res = (Math.abs(v1 - v2) / average) * 100;
        setResult({
          value: res.toFixed(2) + "%",
          explanation: `Difference between ${v1} and ${v2} is ${res.toFixed(
            2
          )}%`,
        });
        break;
      case "valueChange":
        // Increase/Decrease X by Y%
        if (operator === "increase") {
          res = v1 * (1 + v2 / 100);
          const formattedRes = Number.isInteger(res) ? res : res.toFixed(2);
          setResult({
            value: formattedRes,
            explanation: `${v1} increased by ${v2}% is ${formattedRes}`,
          });
        } else {
          res = v1 * (1 - v2 / 100);
          const formattedRes = Number.isInteger(res) ? res : res.toFixed(2);
          setResult({
            value: formattedRes,
            explanation: `${v1} decreased by ${v2}% is ${formattedRes}`,
          });
        }
        break;
      default:
        setResult(null);
    }
  };

  const renderInputs = () => {
    switch (mode) {
      case "percentOf":
        return (
          <div className="flex items-center space-x-2 flex-wrap justify-center">
            <span className="text-gray-700">What is</span>
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-20 text-center text-lg py-1 transition-colors"
              placeholder="0"
            />
            <span className="text-gray-700">% of</span>
            <input
              type="number"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-20 text-center text-lg py-1 transition-colors"
              placeholder="0"
            />
            <span className="text-gray-700">?</span>
          </div>
        );
      case "whatPercent":
        return (
          <div className="flex items-center space-x-2 flex-wrap justify-center">
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-20 text-center text-lg py-1 transition-colors"
              placeholder="0"
            />
            <span className="text-gray-700">is what % of</span>
            <input
              type="number"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-20 text-center text-lg py-1 transition-colors"
              placeholder="0"
            />
            <span className="text-gray-700">?</span>
          </div>
        );
      case "increaseDecrease":
        return (
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">From</span>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-24 text-center text-lg py-1 transition-colors"
                placeholder="Start"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">to</span>
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-24 text-center text-lg py-1 transition-colors"
                placeholder="End"
              />
            </div>
          </div>
        );
      case "findTotal":
        return (
          <div className="flex items-center space-x-2 flex-wrap justify-center">
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-20 text-center text-lg py-1 transition-colors"
              placeholder="0"
            />
            <span className="text-gray-700">is</span>
            <input
              type="number"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-20 text-center text-lg py-1 transition-colors"
              placeholder="0"
            />
            <span className="text-gray-700">% of what?</span>
          </div>
        );
      case "percentageDifference":
        return (
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Value A</span>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-24 text-center text-lg py-1 transition-colors"
                placeholder="0"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Value B</span>
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-24 text-center text-lg py-1 transition-colors"
                placeholder="0"
              />
            </div>
          </div>
        );
      case "valueChange":
        return (
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-24 text-center text-lg py-1 transition-colors"
                placeholder="Start"
              />
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              >
                <option value="increase">Increase by</option>
                <option value="decrease">Decrease by</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none w-20 text-center text-lg py-1 transition-colors"
                placeholder="0"
              />
              <span className="text-gray-700">%</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadowlg overflow-hidden p-6 flex flex-col h-full hover:shadow-xl transition-shadow duration-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        {title}
      </h3>

      <div className="flex-grow flex flex-col justify-center">
        {renderInputs()}

        <div className="flex justify-center mt-6">
          <button
            onClick={calculate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Calculate
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center animate-fade-in-up">
          {result.error ? (
            <p className="text-sm font-medium text-red-600">{result.error}</p>
          ) : (
            <>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Result
              </p>
              <p className="text-3xl font-extrabold text-blue-600 my-2">
                {result.value}
              </p>
              <p className="text-sm text-gray-700">{result.explanation}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const PercentageCalculator = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Percentage Calculator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CalculatorCard title="Percentage Of" mode="percentOf" />
        <CalculatorCard title="What Percentage?" mode="whatPercent" />
        <CalculatorCard title="Percentage Change" mode="increaseDecrease" />
        <CalculatorCard title="Find Total" mode="findTotal" />
        <CalculatorCard
          title="Percentage Difference"
          mode="percentageDifference"
        />
        <CalculatorCard title="Increase/Decrease Value" mode="valueChange" />
      </div>
    </div>
  );
};

export default PercentageCalculator;
