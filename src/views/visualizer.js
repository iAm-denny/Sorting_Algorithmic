import React, { useState, useEffect } from "react";

function Visualizer() {
  const [array, setArray] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(40); // normal speed
  const [timeComplexity, setTimeComplexity] = useState("");

  const randomValue = (min, max) => {
    var randomVal = Math.floor(Math.random() * (max - min + 1) + min);
    return randomVal;
  };

  const randomizeArray = () => {
    setTimeComplexity("");
    let arr = [];
    for (var i = 0; i < 20; i++) {
      arr.push(randomValue(20, 400));
    }

    setArray(arr);
  };

  useEffect(() => {
    randomizeArray();
  }, []);

  const sleep = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  const bubbleSort = async () => {
    setTimeComplexity("O(n^2)");

    const length = array.length;
    let cloneArray = array;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (cloneArray[j] > cloneArray[j + 1]) {
          let temp = cloneArray[j];
          cloneArray[j] = cloneArray[j + 1];
          cloneArray[j + 1] = temp;
          setArray([...array, cloneArray]);
          let bar1 = document.getElementById(i).style;
          let bar2 = document.getElementById(i + 1).style;
          bar1.backgroundColor = "#DC143C";
          bar2.backgroundColor = "#6A5ACD";
          await sleep(animationSpeed);
          bar1.backgroundColor = "rgb(250, 168, 16)";
          bar2.backgroundColor = "rgb(250, 168, 16)";
        }
      }
    }
  };

  const heapify = (arr, length, parentIndex) => {
    let largest = parentIndex; // to be able change dynamic largest value in condition
    let left = parentIndex * 2 + 1;
    let right = left + 1;
    if (left < length && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < length && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== parentIndex) {
      [arr[parentIndex], arr[largest]] = [arr[largest], arr[parentIndex]];
      heapify(arr, length, largest);
    }

    return arr;
  };

  const heapSort = async () => {
    setTimeComplexity("O(nlog(n)");
    const cloneArray = array;
    let length = array.length;
    let parentNode = Math.floor(length / 2 - 1); // parent of child / First 3 binary tree
    let lastChild = length - 1;

    // from largest to smallest
    while (parentNode >= 0) {
      heapify(cloneArray, length, parentNode);
      let bar1 = document.getElementById(parentNode).style;
      let bar2 = document.getElementById(parentNode + 1).style;
      bar1.backgroundColor = "#DC143C";
      bar2.backgroundColor = "#6A5ACD";
      await sleep(animationSpeed);

      parentNode--;
    }
    // from smallest to largest
    while (lastChild >= 0) {
      [cloneArray[0], cloneArray[lastChild]] = [
        cloneArray[lastChild],
        cloneArray[0],
      ];
      heapify(cloneArray, lastChild, 0);
      let bar1 = document.getElementById(lastChild).style;
      let bar2 = document.getElementById(0).style;
      bar1.backgroundColor = "#DC143C";
      bar2.backgroundColor = "#6A5ACD";
      await sleep(animationSpeed);
      bar1.backgroundColor = "rgb(250, 168, 16)";
      bar2.backgroundColor = "rgb(250, 168, 16)";
      lastChild--;
    }
    setArray([...cloneArray]);
  };

  const quickStart = (array) => {
    if (array.length <= 1) {
      return array;
    }

    let length = array.length;
    let pivot = array[0];

    let left = [];
    let right = [];

    for (let i = 1; i < length; i++) {
      if (array[i] < pivot) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }
    return quickStart(left).concat(pivot, quickStart(right));
  };

  const mainQuickSort = () => {
    setTimeComplexity("O(nlog(n))");
    let cloneArray = array;
    const sorted = quickStart(cloneArray);

    setArray(sorted);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "70%",
      }}
    >
      <div className="buttons">
        <button onClick={randomizeArray}>Restart</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={heapSort}>Heap Sort</button>
        <button onClick={mainQuickSort}>Quick Sort</button>
      </div>

      <div className="speed_buttons">
        <button onClick={() => setAnimationSpeed(80)}>Slow</button>
        <button onClick={() => setAnimationSpeed(40)}>Normal</button>
        <button onClick={() => setAnimationSpeed(20)}>Fast</button>
      </div>

      {timeComplexity && (
        <div
          style={{
            textDecoration: "underline",
            color: "white",
            fontSize: 23,
            textAlign: "center",
          }}
        >
          Time Complexity {"\u00A0"}- {"\u00A0"}{" "}
          <span style={{ fontStyle: "italic" }}>{timeComplexity} </span>
        </div>
      )}

      {/* Graph bar */}

      <div className="container">
        {array &&
          array.map((_, index) => {
            return (
              <div
                className="graph_bar"
                key={index}
                id={index}
                style={{
                  height: _,
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Visualizer;
