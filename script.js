let vocab = [];
let questionPool = [];
let currentIndex = 0;
let currentQuestion = null;

fetch("data/vocab.json")
  .then(res => {
    if (!res.ok) throw new Error("Failed to load.");
    return res.json();
  })
  .then(data => {
    vocab = data;
    resetQuestionPool(); // 初始洗牌
    nextQuestion();
  })
  .catch(err => {
    document.getElementById("question").textContent = "Failed to load 🥲";
    console.error("Error:", err);
  });

/**
 * Resets the question pool by copying the vocabulary array, shuffling it, and resetting the current index.
 *
 * @return {void}
 */
function resetQuestionPool() {
  questionPool = [...vocab];
  shuffle(questionPool);
  currentIndex = 0;
}

/**
 * Proceeds to the next question in the quiz, resetting the question pool if necessary.
 * Generates answer options and updates the UI accordingly.
 *
 * @return {void}
 */
function nextQuestion() {
  document.getElementById("feedback").textContent = "";

  // 題目出完就重新洗一輪
  if (currentIndex >= questionPool.length) {
    alert("You've finished all the questions! Starting again.");
    resetQuestionPool();
  }

  currentQuestion = questionPool[currentIndex];
  currentIndex++;

  // 建立選項
  const options = [currentQuestion.translation];
  while (options.length < 4) {
    const random = vocab[Math.floor(Math.random() * vocab.length)].translation;
    if (!options.includes(random)) options.push(random);
  }

  shuffle(options);

  document.getElementById("question").textContent = `What does “${currentQuestion.word}” mean?`;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });
}

/**
 * Updates the feedback element based on the correctness of the user's answer.
 *
 * @param {string} selected - The user's selected answer.
 * @return {void}
 */
function checkAnswer(selected) {
  const feedback = document.getElementById("feedback");
  if (selected === currentQuestion.translation) {
    feedback.textContent = "Correct! 🎉";
    feedback.style.color = "lightgreen";
  } else {
    feedback.textContent = `Oops! The correct answer is: ${currentQuestion.translation}`;
    feedback.style.color = "red";
  }
}

/**
 * Randomly rearranges the elements of an array in-place.
 *
 * @param {Array} array - the array to be shuffled
 * @return {undefined}
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
