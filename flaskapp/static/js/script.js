//declare varibles in a higher scope for easy access to other blocks
let total;
let sum;
let size;
let mean;

// Function to fetch numbers from the server and display them
function displayNumbers() {
  fetch("/mean_calculator")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const numbersDiv = document.getElementById("numbers");
      const numbers = data.numbers;
      total = data.total;
      mean = data.mean;
      size = data.size;

      // Clear any existing content
      numbersDiv.innerHTML = "";

      // Populate the numbers list
      numbers.forEach((number) => {
        const num = document.createElement("numbers");
        num.textContent = number;
        numbersDiv.appendChild(num);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Call the function to display numbers when the page loads
displayNumbers();

//dynamic form handling
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("submit", function (event) {
    event.preventDefault();
    const formId = event.target.id;
    const answer = event.target.elements.answer.value;
    const displayAnswer = document.getElementById("displayAnswer");
    const step1 = document.getElementById("displayStep1");
    const step2 = document.getElementById("displayStep2");
    const step3 = document.getElementById("displayStep3");

    switch (formId) {
      case "answerForm":
        const roundedMean = parseFloat(mean).toFixed(2);

        if (roundedMean === answer) {
          displayAnswer.textContent = `You answered correctly!`;
          displayAnswer.style.color = "aquamarine"; 
        } else {
          displayAnswer.textContent = `Incorrect answer. Follow the steps below to arrive at the answer.`;
          displayAnswer.style.color = "orangered"; 
        }
        break;

      case "step1":
        try {
                const answerInt = parseInt(answer, 10);
                const totalInt = parseInt(total, 10)
                if (totalInt === answerInt) {
                    step1.textContent = `You answered correctly! `;
                    step1.style.color = 'aquamarine'; }
                  else{
                    step1.textContent = `Incorrect answer. Try again!`;
                    step1.style.color = 'orangered';
                }
            } catch (error) {
                console.error('Error in handling step1:', error);
                step1.textContent = 'An error occurred while processing your answer.';
                step1.style.color = 'red';
            }
            break;

      case "step2":
        try {
                const answerInt = parseInt(answer, 10);
                const sizeInt = parseInt(size, 10);

                if (sizeInt === answerInt) {
                    step2.textContent = `You answered correctly! `;
                    step2.style.color = 'aquamarine'; 
                } else {
                    step2.textContent = `Incorrect answer. Try again!`;
                    step2.style.color = 'orangered'; 
                }
            } catch (error) {
                console.error('Error in handling step2:', error);
                step2.textContent = 'An error occurred while processing your answer.';
                step2.style.color = 'red';
            }
            break;

      case "step3": 
      try {
                const meanFloat = parseFloat(mean).toFixed(2)

                if (meanFloat === answer) {
                    step3.textContent = `You answered correctly! `;
                    step3.style.color = 'aquamarine'; 
                } else {
                    step3.textContent = `Incorrect answer. Try again!`;
                    step3.style.color = 'orangered'; 
                }
            } catch (error) {
                console.error('Error in handling step3:', error);
                step3.textContent = 'An error occurred while processing your answer.';
                step3.style.color = 'red';
            }
            break;
       
      default:
        console.log("Error processing submission, Please re-load page");
    }
  });
});

// Event Listener for Keyboard
// document.addEventListener("DOMContentLoaded", function () {
//   const keyboardDiv = document.getElementById("keyboard");
//   const numbers = [
//     "1",
//     "2",
//     "3",
//     "C",
//     "4",
//     "5",
//     "6",
//     "␣",
//     "7",
//     "8",
//     "9",
//     "⌫",
//     ",",
//     "0",
//     ".",
//     "↩︎",
//   ];

//   numbers.forEach((button) => {
//     const btn = document.createElement("button");
//     btn.textContent = button;
//     btn.addEventListener("click", function () {
//       console.log(`Button ${button} clicked`);

//       // Get the active/focused input field
//       const focusedInput = document.activeElement;

//       // Check if the active element is an input field
//       if (focusedInput && focusedInput.tagName.toLowerCase() === "input") {
//         // Append the button's value to the input field's value
//         focusedInput.value += button;
//       }
//     });
//     keyboardDiv.appendChild(btn);
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  // Select all buttons within the #keyboard
  const keyboardButtons = document.querySelectorAll("#keyboardbtn");

  // Add an event listener to each button
  keyboardButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Get the currently focused input field
      const focusedInput = document.activeElement;

      // Check if the focused element is one of the specified text fields
      if (
        focusedInput &&
        (focusedInput.id === "displayAnswer" ||
          focusedInput.id === "displayStep1" ||
          focusedInput.id === "displayStep2" ||
        focusedInput.id === "displayStep3")
      ) {
        // Get the text of the clicked button
        const buttonText = this.textContent || this.innerText;

        // Append the button's text to the focused input field's value
        focusedInput.value += buttonText;
      }
    });
  });
});