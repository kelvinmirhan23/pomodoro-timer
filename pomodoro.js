// Set the default time to 25 minutes in seconds
let time = 25 * 60;
let timerInterval;
let isRunning = false;

// Get references to HTML elements
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const quoteEl = document.getElementById("quote");

// Mode tabs (Pomodoro, Short Break, Long Break)
const pomodoroTab = document.getElementById("pomodoro-tab");
const shortTab = document.getElementById("short-tab");
const longTab = document.getElementById("long-tab");

// Define durations for each mode (in seconds)
const durations = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60
};

// Some of my favorite motivational/existential quotes to show randomly when resetting timer
const quotes = [
  "Droplets of yes and no, in an ocean of maybe.",
  "Life is not a problem to be solved, but a reality to be experienced.",
  "You have your way. I have my way. As for the right way, the correct way, and the only way, it does not exist.",
  "You can do anything, you lucky bastard, you're alive! What's a little pain compared to that?",
  "There is one path in the world that none can walk but you. Where does it lead? Don’t ask, walk!",
  "Man is nothing else but what he makes of himself.",
  "It is often said that before you die your life passes before your eyes. It is, in fact, true. It's called living.",
  "Give me 6 hours to chop a tree, I will spend the first 4 sharpening my axe.",
  "It is the mark of an educated mind to entertain a thought without accepting it.",
  "The test of a first rate intelligence is the ability to hold two opposed ideas in the mind at the same time, and still retain the ability to function.",
  "If you do not see humour in the serious, and the serious in humour, you have understood neither.",
  "There are 1,000 lessons in defeat, but only one in victory.",
  "In any moment of decision, the best thing you can do is the right thing. The worst thing you can do is nothing.",
  "Don't try to be a great man. Just be a man, and let history make its own judgments.",
  "Nothing of me is original. I am the combined efforts of everyone I've ever known.",
  "A man's work is nothing but this slow trek to rediscover, through the detours of art, those two or three great and simple images in whose presence his heart first opened.",
  "There is nothing noble in being superior to your fellow man. True nobility is in being superior to your former self.",
  "The only thing necessary for the triumph of evil is for good men to do nothing.",
  "Believe those who are seeking the truth. Doubt those who find it.",
  "Two possibilities exist: either we are alone in the Universe or we are not. Both are equally terrifying.",
  "Sucking at something is the first step towards being sorta good at something.",
  "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid.",
  "The hottest places in hell are reserved for those who, in times of great moral crisis, maintain their neutrality.",
  "Not everything that counts can be counted, and not everything that can be counted counts.",
  "You are the universe experiencing itself.",
  "Given enough time, hydrogen starts to think about itself.",
  "Every person you meet is fighting a battle you know nothing about. Be kind. Always.",
  "And those who were seen dancing were thought to be insane by those who could not hear the music.",
  "A witty saying proves nothing.",
  "Maybe we should stop quoting other people and start thinking for ourselves.",
  "If something can be destroyed by truth, it should be.",
  "Success is directly correlated with the amount of awkward conversations you are willing to have.",
  "Truth is, everyone is going to hurt you. You just have to find the ones worth suffering for.",
  "If the human mind were so simple that we could understand it, we would be so simple that we couldn't.",
  "Don't worry what other people think about you. They are more concerned with what you think about them.",
  "When you become comfortable with uncertainty, infinite possibilities open up in your life.",
  "You may never be 'good' at something, but you can always get better at it.",
  "Whether you think you can, or you think you can’t — you’re right.",
  "If you have a difficult task, give it to a lazy person — they will find an easier way to do it.",
  "Life is not a matter of holding good cards, but of playing a poor hand well.",
  "Freedom without any purpose feels a whole lot like boredom.",
  "Time you enjoy wasting was not wasted.",
  "The people who are crazy enough to think they can change the world are the ones who do.",
  "If everything seems under control, you're just not going fast enough.",
  "When you're going through hell, keep going."
];

// Formats a number like 7 as "07" for timer display
function formatTime(unit) {
  if (unit < 10) {
    return "0" + unit;
  } else {
    return unit.toString();
  }
}

// Updates the timer display on the page
function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedMinutes = formatTime(minutes);
  const formattedSeconds = formatTime(seconds);

  timerEl.textContent = formattedMinutes + ":" + formattedSeconds;
}

// Chooses a random quote and shows it on the page
function showRandomQuote() {
  const numberOfQuotes = quotes.length;
  const randomIndex = Math.floor(Math.random() * numberOfQuotes);
  const quoteToShow = quotes[randomIndex];

  quoteEl.textContent = '"' + quoteToShow + '"';
}

// Starts the countdown timer
function startTimer() {
  if (isRunning) {
    return;
  }

  isRunning = true;

  timerInterval = setInterval(function () {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      alert("Time's up!");
      showRandomQuote();
    }
  }, 1000);
}

// Pauses the countdown without resetting the time
function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

// Resets the timer based on the current active tab
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;

  if (pomodoroTab.classList.contains("active")) {
    time = durations.pomodoro;
  } else if (shortTab.classList.contains("active")) {
    time = durations.short;
  } else if (longTab.classList.contains("active")) {
    time = durations.long;
  }

  updateDisplay();
  showRandomQuote();
}

// Switches between timer modes (Pomodoro, Short, Long)
function setMode(mode) {
  clearInterval(timerInterval);
  isRunning = false;

  time = durations[mode];
  updateDisplay();
  showRandomQuote();
  updateActiveTab(mode);
}

// Updates tab button styling to show the selected one
function updateActiveTab(activeId) {
  const tabs = document.querySelectorAll(".tab");

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  if (activeId === "pomodoro") {
    pomodoroTab.classList.add("active");
  } else if (activeId === "short") {
    shortTab.classList.add("active");
  } else if (activeId === "long") {
    longTab.classList.add("active");
  }
}

// Add event listeners to timer control buttons
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Add event listeners to mode tabs
pomodoroTab.addEventListener("click", function () {
  setMode("pomodoro");
});
shortTab.addEventListener("click", function () {
  setMode("short");
});
longTab.addEventListener("click", function () {
  setMode("long");
});

// Initialize the timer display when the page loads
updateDisplay();





