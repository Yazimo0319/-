const homeScreen = document.querySelector("#homeScreen");
const questionScreen = document.querySelector("#questionScreen");
const guidanceScreen = document.querySelector("#guidanceScreen");
const startButton = document.querySelector("#startButton");
const backButton = document.querySelector("#backButton");
const guidanceBackButton = document.querySelector("#guidanceBackButton");
const nextButton = document.querySelector("#nextButton");
const umbrellaWheel = document.querySelector("#umbrellaWheel");
const umbrellaResultImage = document.querySelector("#umbrellaResultImage");
const questionInput = document.querySelector("#questionInput");
const charCount = document.querySelector("#charCount");
const journalList = document.querySelector("#journalList");
const relationshipButtons = document.querySelectorAll(".pill");
const emptyQuestionText = "\u5c1a\u672a\u8f38\u5165\u554f\u984c";
const sampleQuestions = [
  "\u6211\u5011\u6700\u8fd1\u7684\u8ddd\u96e2\u9084\u6709\u6a5f\u6703\u9760\u8fd1\u55ce\uff1f",
  "\u9019\u6bb5\u95dc\u4fc2\u4e0b\u4e00\u6b65\u9069\u5408\u4e3b\u52d5\u55ce\uff1f",
  "\u6211\u8a72\u5982\u4f55\u6574\u7406\u73fe\u5728\u7684\u5fc3\u60c5\uff1f",
];
const sampleTypes = ["\u611b\u60c5", "\u53cb\u60c5", "\u5bb6\u5ead"];
const umbrellaResults = [
  { name: "\u7559\u767d", src: "result-liubai.png" },
  { name: "\u56de\u98a8", src: "result-huifeng.png" },
  { name: "\u5171\u5098", src: "result-gongsan.png" },
  { name: "\u5fae\u88c2", src: "result-weilie.png" },
  { name: "\u96e8\u505c", src: "result-yuting.png" },
  { name: "\u4e26\u884c", src: "result-bingxing.png" },
];
let umbrellaRotation = 0;
let dragStartX = 0;
let dragStartRotation = 0;
let isDraggingUmbrella = false;
let revealTimer = 0;
let settleTimer = 0;
let lastSpinDirection = 1;

function getSelectedRelationship() {
  return document.querySelector(".pill.active")?.textContent.trim() || "\u554f";
}

function updateTodayJournal() {
  const question = questionInput.value.trim();
  const text = document.querySelector("#todayJournalText");
  const icon = document.querySelector("#todayJournalIcon");

  if (!text || !icon) {
    return;
  }

  text.textContent = question || emptyQuestionText;
  icon.textContent = question ? getSelectedRelationship() : "\u554f";
}

function showScreen(screenName) {
  homeScreen.classList.toggle("active", screenName === "home");
  questionScreen.classList.toggle("active", screenName === "question");
  guidanceScreen.classList.toggle("active", screenName === "guidance");

  if (screenName === "question") {
    questionInput.focus();
  }

  if (screenName === "guidance") {
    resetUmbrellaResult();
    setUmbrellaRotation(0);
  }
}

startButton.addEventListener("click", () => {
  showScreen("question");
});

backButton.addEventListener("click", () => {
  showScreen("home");
});

nextButton.addEventListener("click", () => {
  showScreen("guidance");
});

guidanceBackButton.addEventListener("click", () => {
  showScreen("question");
});

questionInput.addEventListener("input", () => {
  charCount.textContent = questionInput.value.length;
  updateTodayJournal();
});

relationshipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    relationshipButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    updateTodayJournal();
  });
});

function setUmbrellaRotation(degrees) {
  umbrellaRotation = degrees;
  umbrellaWheel.style.setProperty("--umbrella-rotation", `${umbrellaRotation}deg`);
}

function resetUmbrellaResult() {
  window.clearTimeout(revealTimer);
  window.clearTimeout(settleTimer);
  umbrellaWheel.classList.remove("spinning", "revealing", "result-visible", "settling");
  umbrellaResultImage.removeAttribute("src");
  umbrellaResultImage.removeAttribute("alt");
}

function pickUmbrellaResult() {
  return umbrellaResults[Math.floor(Math.random() * umbrellaResults.length)];
}

function getNextUprightRotation(fromDegrees, direction) {
  const fullCircle = 360;
  const normalized = ((fromDegrees % fullCircle) + fullCircle) % fullCircle;

  if (normalized === 0) {
    return fromDegrees;
  }

  return direction > 0
    ? fromDegrees + (fullCircle - normalized)
    : fromDegrees - normalized;
}

umbrellaWheel.addEventListener("pointerdown", (event) => {
  isDraggingUmbrella = true;
  dragStartX = event.clientX;
  dragStartRotation = umbrellaRotation;
  resetUmbrellaResult();
  umbrellaWheel.classList.add("dragging");
  umbrellaWheel.setPointerCapture(event.pointerId);
});

umbrellaWheel.addEventListener("pointermove", (event) => {
  if (!isDraggingUmbrella) {
    return;
  }

  const distance = event.clientX - dragStartX;
  setUmbrellaRotation(dragStartRotation + distance * 1.4);
});

function finishUmbrellaDrag(event) {
  if (!isDraggingUmbrella) {
    return;
  }

  isDraggingUmbrella = false;
  umbrellaWheel.classList.remove("dragging");

  const distance = event.clientX - dragStartX;
  const direction = distance >= 0 ? 1 : -1;
  const spinEnd = umbrellaRotation + direction * 900;
  const selectedResult = pickUmbrellaResult();

  lastSpinDirection = direction;
  umbrellaResultImage.src = selectedResult.src;
  umbrellaResultImage.alt = selectedResult.name;
  umbrellaWheel.style.setProperty("--umbrella-rotation-start", `${umbrellaRotation}deg`);
  umbrellaWheel.style.setProperty("--umbrella-rotation-end", `${spinEnd}deg`);
  umbrellaWheel.classList.remove("spinning");
  void umbrellaWheel.offsetWidth;
  umbrellaWheel.classList.add("spinning");
  revealTimer = window.setTimeout(() => {
    umbrellaWheel.classList.add("revealing");
  }, 520);
  umbrellaRotation = spinEnd;
  umbrellaWheel.style.setProperty("--umbrella-rotation", `${umbrellaRotation}deg`);

  if (umbrellaWheel.hasPointerCapture(event.pointerId)) {
    umbrellaWheel.releasePointerCapture(event.pointerId);
  }
}

umbrellaWheel.addEventListener("pointerup", finishUmbrellaDrag);
umbrellaWheel.addEventListener("pointercancel", finishUmbrellaDrag);
umbrellaWheel.addEventListener("animationend", () => {
  if (!umbrellaWheel.classList.contains("spinning")) {
    return;
  }

  const spinEndRotation = umbrellaRotation;
  const uprightRotation = getNextUprightRotation(spinEndRotation, lastSpinDirection);

  setUmbrellaRotation(spinEndRotation);
  umbrellaWheel.classList.remove("spinning", "revealing");
  umbrellaWheel.classList.add("result-visible");
  void umbrellaWheel.offsetWidth;
  umbrellaWheel.classList.add("settling");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setUmbrellaRotation(uprightRotation);
    });
  });

  settleTimer = window.setTimeout(() => {
    umbrellaWheel.classList.remove("settling");
  }, 1850);
});
umbrellaWheel.addEventListener("lostpointercapture", () => {
  isDraggingUmbrella = false;
  umbrellaWheel.classList.remove("dragging");
});

function renderJournalList() {
  const today = new Date();
  const dateFormatter = new Intl.DateTimeFormat("zh-TW", {
    month: "2-digit",
    day: "2-digit",
  });
  const weekdayFormatter = new Intl.DateTimeFormat("zh-TW", {
    weekday: "short",
  });

  for (let offset = 0; offset < 4; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    const isToday = offset === 0;

    const group = document.createElement("article");
    group.className = "journal-day";

    if (isToday) {
      group.classList.add("today");
    }

    const header = document.createElement("div");
    header.className = "journal-day-header";

    const dateText = document.createElement("span");
    dateText.textContent = `${dateFormatter.format(date)} ${weekdayFormatter.format(date)}`;

    const countText = document.createElement("strong");
    countText.textContent = isToday ? "\u4eca\u65e5" : "1 \u7b46";

    header.append(dateText, countText);

    const record = document.createElement("div");
    record.className = "journal-entry";

    const icon = document.createElement("span");
    icon.className = "journal-entry-icon";
    icon.textContent = isToday ? "\u554f" : sampleTypes[offset - 1];

    const text = document.createElement("p");
    text.textContent = isToday ? emptyQuestionText : sampleQuestions[offset - 1];

    if (isToday) {
      icon.id = "todayJournalIcon";
      text.id = "todayJournalText";
    }

    record.append(icon, text);
    group.append(header, record);
    journalList.append(group);
  }
}

renderJournalList();
