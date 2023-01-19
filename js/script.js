console.log("----the Fibonacci JS code page----");
const spinner = document.querySelector(".spinnerers");

document.getElementById("error-messege").style.display = "none";
document.getElementById("FortyTwoMessege").style.display = "none";
document.getElementById("cantBezeroOrLess").style.display = "none";
document.getElementById("server-spinner").style.display = "none";

// get the x value from the input
function getTheXVal() {
  XvalfromTheInput = document.getElementById("theXfield").value;
  document.getElementById("error-messege").style.display = "none";
  console.log("the x val from the input - " + XvalfromTheInput);

  if (XvalfromTheInput >= 51) {
    console.log("the x is more then 50");
    document.getElementById("FortyTwoMessege").style.display = "none";
    document.getElementById("error-messege").style.display = "block";
  } else document.getElementById("error-messege").style.display = "none";

  return XvalfromTheInput;
}

//function checkBoxcheck() {
// console.log("a click change checkBoxcheck ");
// if (checkBoxForCalculate.checked == true) {
// console.log("checkBoxcheck Checked");
// return (checkBoxcheck = true);
// } else console.log("checkBoxcheck unChecked");
// return (checkBoxcheck = false);
//}

///////////////////////////////////////////

//error-messege

//checkBoxcheck();
let checkBoxcheck;
const checkBoxForCalculate = document.getElementById("flexCheckChecked");
checkBoxForCalculate.addEventListener("change", checkBoxcheck);

//make the button alive() {
const theMainBlueButtonfunction = document.getElementById("theMainBlueButton");
theMainBlueButtonfunction.addEventListener("click", BlueClick);

//make the button alive(merge the x input in the makeTheFibonacci by the buttn )
function BlueClick() {
  console.log("a blue click!");
  spinner.classList.add("show-me");
  document.getElementById("cantBezeroOrLess").style.display = "none";
  document.getElementById("error-messege").style.display = "none";
  //checkBox check for server or local
  if (checkBoxForCalculate.checked == true) {
    console.log("checkBoxcheck Checked its gonna be done in the server");
    // return (checkBoxcheck = true);
  } else {
    console.log("checkBoxcheck unChecked i do it localy");
    return makeTheFibonacci(XvalfromTheInput);
  }
  // return (checkBoxcheck = false);

  function checkBeforCalculate() {
    if (XvalfromTheInput <= 51) {
      takeTheXinputToTheServer(XvalfromTheInput);
      console.log("going to make it on server");
    } else {
      // document.getElementById("id_Y_text").hidden = true;
      document.getElementById("id_Y_text").style.display = "none";
      console.log("bigger then 50 dont go to server");
    }
  }

  checkBeforCalculate();
}

console.log("after the count");

function takeTheXinputToTheServer() {
  document.getElementById("server-spinner").style.display = "block";
  document.getElementById("id_Y_text").style.display = "none";
  document.getElementById("FortyTwoMessege").style.display = "none";
  document.getElementById("error-messege").style.display = "none";
  spinner.classList.add("show-me");
  let fibonacciServer = `http://localhost:5050/fibonacci/` + XvalfromTheInput;
  console.log(fibonacciServer);

  fetch(fibonacciServer)
    .then(function (response) {
      console.log(response);
      console.log(response["ok"]);

      if (response["ok"] === false) {
        document.getElementById("id_Y_text").style.display = "none";
        console.log("its gonna be like error messege or something");
        document.getElementById("FortyTwoMessege").style.display = "block";
        fetch(fibonacciServer)
          .then((response) => response.text())

          .then((dataB) =>
            document.getElementById("FortyTwoMessege").append(" " + dataB)
          );

        return response.text();
      }
      console.log("its gonna be calculate answer");
      document.getElementById("id_Y_text").style.display = "block";
      //udate the Results
      callTheResults();
      document.getElementById("FortyTwoMessege").style.display = "none";
      return response.json();
    })
    .then(function (data) {
      console.log(data["result"]);

      document.getElementById("id_Y_text").innerHTML = data["result"];
      document.getElementById("server-spinner").style.display = "none";
      spinner.classList.remove("show-me");
    });
}

// call the Results ////////////////////////////////////////////////////////////////

const ResultsURL = "http://localhost:5050/getFibonacciResults";

async function callTheResults() {
  const response = await fetch(ResultsURL);
  const data = await response.json();

  console.log("function callTheResults is active");

  data["results"].sort((a, b) => {
    if (b.createdDate < a.createdDate) {
      return -1;
    }
  });
  console.log("end of fetch and sort");
  // console.log("aftersort");
  //console.log(data);
  //console.log(data["results"]);
  //console.log(data.results[0]);
  //console.log(data.results[0]["number"]);
  //console.log(data.results[0]["result"]);
  //console.log(data.results[0]["createdDate"]);

  let firstResult = data.results[0]["result"];
  let firstNumber = data.results[0]["number"];
  let firstcreatedDate = data.results[0]["createdDate"];

  let secondResult = data.results[1]["result"];
  let secondNumber = data.results[1]["number"];
  let secondcreatedDate = data.results[1]["createdDate"];

  let thirdResult = data.results[2]["result"];
  let thirdNumber = data.results[2]["number"];
  let thirdcreatedDate = data.results[2]["createdDate"];

  //date convertor////////////////////////////

  // function giveMeGoodDate(wierdnumber) {
  //   let date = new Date(wierdnumber);
  //convertedDate =
  //   ("0" + date.getDate()).slice(-2) +
  //   "/" +
  //   ("0" + (date.getMonth() + 1)).slice(-2) +
  //  "/" +
  //   date.getFullYear();

  // console.log(convertedDate);
  // return convertedDate;
  //}

  function giveMeGoodDate(wierdnumber) {
    let date = new Date(wierdnumber);
    convertedDate = date;
    //    ("0" + date.getDate()).slice(-2) +
    //    "/" +
    //   ("0" + (date.getMonth() + 1)).slice(-2) +
    //   "/" +
    //   date.getFullYear();

    console.log(convertedDate);
    return convertedDate;
  }

  giveMeGoodDate(firstcreatedDate);
  document.getElementById(
    "first-results"
  ).innerHTML = `The Fibonnaci Of <b>${firstNumber}</b> is <b>${firstResult}</b> Calculated at: ${convertedDate}`;

  giveMeGoodDate(secondcreatedDate);
  document.getElementById(
    "second-results"
  ).innerHTML = `The Fibonnaci Of <b>${secondNumber}</b> is <b>${secondResult}</b> Calculated at: ${convertedDate}`;

  giveMeGoodDate(thirdcreatedDate);
  document.getElementById(
    "third-results"
  ).innerHTML = `The Fibonnaci Of <b>${thirdNumber}</b> is <b>${thirdResult}</b> Calculated at: ${convertedDate}`;
}

callTheResults();

// //////the Fibonacci Is function///////

function makeTheFibonacci(insertNumber) {
  document.getElementById("id_Y_text").style.display = "block";
  console.log("start local Fibonacci function");
  let x = 1;
  let y = 0;
  let theFibonacciIs;

  if (XvalfromTheInput == 0) {
    document.getElementById("id_Y_text").style.display = "none";
    theFibonacciIs = 0;

    document.getElementById("id_Y_text").innerHTML = theFibonacciIs;
    console.log("done with zero action");
    spinner.classList.remove("show-me");
  } else if (XvalfromTheInput <= -1) {
    document.getElementById("id_Y_text").style.display = "none";
    document.getElementById("cantBezeroOrLess").style.display = "block";
    console.log("its minus");
    spinner.classList.remove("show-me");
  }

  for (let i = 1; i <= insertNumber; i++) {
    theFibonacciIs = x + y;
    x = y;
    y = theFibonacciIs;
    document.getElementById("cantBezeroOrLess").style.display = "none";
    console.log("count the Fibonacci " + theFibonacciIs);
    setTimeout(() => {
      spinner.classList.remove("show-me");
    }, 200);
    document.getElementById("id_Y_text").innerHTML = theFibonacciIs;
  }

  console.log(
    "finish the Fibonacci local function -- the number is - " + theFibonacciIs
  );
}
//////////////////////////////////////////////////

// const myTimeout = setTimeout(myGreeting, 5000);
//function myGreeting() {
//  spinner.classList.remove("show-me");
// document.getElementById("theheadline").innerHTML = "Happy Birthday!";
//}

console.log("end of js");
