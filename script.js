const homeScreen = document.querySelector("#homeScreen");
const questionScreen = document.querySelector("#questionScreen");
const guidanceScreen = document.querySelector("#guidanceScreen");
const startButton = document.querySelector("#startButton");
const backButton = document.querySelector("#backButton");
const guidanceBackButton = document.querySelector("#guidanceBackButton");
const homeReturnButton = document.querySelector("#homeReturnButton");
const nextButton = document.querySelector("#nextButton");
const umbrellaWheel = document.querySelector("#umbrellaWheel");
const umbrellaResultImage = document.querySelector("#umbrellaResultImage");
const readingPanel = document.querySelector("#readingPanel");
const readingTitle = document.querySelector("#readingTitle");
const readingSummary = document.querySelector("#readingSummary");
const readingReminder = document.querySelector("#readingReminder");
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
  {
    name: "\u7559\u767d",
    src: "%E5%9C%96%E7%89%87/result-liubai.png",
    summary: "\u73fe\u5728\u4e0d\u5fc5\u6025\u8457\u6c7a\u5b9a\uff0c\u8b93\u7b54\u6848\u5728\u6642\u9593\u88e1\u6162\u6162\u6d6e\u73fe\u3002",
    reminder: "\u4e0d\u5fc5\u6025\u8457\u586b\u6eff\u6240\u6709\u7a7a\u767d\uff0c\u7559\u4e00\u9ede\u4f4d\u7f6e\u7d66\u6642\u9593\u3002",
  },
  {
    name: "\u56de\u98a8",
    src: "%E5%9C%96%E7%89%87/result-huifeng.png",
    summary: "\u904e\u53bb\u53ef\u80fd\u518d\u6b21\u51fa\u73fe\uff0c\u4f46\u4f60\u5df2\u7d93\u64c1\u6709\u4e0d\u540c\u7684\u9078\u64c7\u3002",
    reminder: "\u98a8\u5439\u56de\u820a\u65e5\u7684\u75d5\u8de1\uff0c\u662f\u70ba\u4e86\u8b93\u4f60\u770b\u6e05\u73fe\u5728\u7684\u81ea\u5df1\u3002",
  },
  {
    name: "\u5171\u5098",
    src: "%E5%9C%96%E7%89%87/result-gongsan.png",
    summary: "\u6709\u4eba\u9858\u610f\u9760\u8fd1\u4f60\uff0c\u4e5f\u53ef\u80fd\u662f\u4f60\u8a72\u4e3b\u52d5\u5411\u524d\u4e00\u6b65\u3002",
    reminder: "\u7de3\u5206\u9700\u8981\u56de\u61c9\uff0c\u4e5f\u9700\u8981\u6709\u4eba\u5148\u6490\u958b\u90a3\u628a\u5098\u3002",
  },
  {
    name: "\u5fae\u88c2",
    src: "%E5%9C%96%E7%89%87/result-weilie.png",
    summary: "\u7d30\u5c0f\u88c2\u75d5\u4ecd\u53ef\u4fee\u88dc\uff0c\u9858\u610f\u7406\u89e3\u5c31\u662f\u91cd\u65b0\u9760\u8fd1\u7684\u958b\u59cb\u3002",
    reminder: "\u6709\u4e9b\u88c2\u7d0b\u4e0d\u662f\u7f3a\u9677\uff0c\u800c\u662f\u63d0\u9192\u4f60\u91cd\u65b0\u7406\u89e3\u5f7c\u6b64\u3002",
  },
  {
    name: "\u96e8\u505c",
    src: "%E5%9C%96%E7%89%87/result-yuting.png",
    summary: "\u4f4e\u6f6e\u5373\u5c07\u904e\u53bb\uff0c\u5148\u6574\u7406\u5fc3\u60c5\uff0c\u518d\u6162\u6162\u5411\u524d\u3002",
    reminder: "\u96e8\u505c\u4e4b\u5f8c\uff0c\u4e0d\u5fc5\u6025\u8457\u8d95\u8def\uff0c\u5148\u62ac\u982d\u770b\u770b\u5929\u8272\u3002",
  },
  {
    name: "\u4e26\u884c",
    src: "%E5%9C%96%E7%89%87/result-bingxing.png",
    summary: "\u95dc\u4fc2\u6b63\u5728\u9760\u8fd1\uff0c\u4e0d\u9700\u8981\u50ac\u4fc3\uff0c\u53ea\u8981\u4fdd\u6301\u771f\u8aa0\u7684\u6b65\u4f10\u3002",
    reminder: "\u771f\u6b63\u9069\u5408\u7684\u6b65\u4f10\uff0c\u4e0d\u9700\u8981\u8ffd\u8d95\uff0c\u4e5f\u4e0d\u5fc5\u523b\u610f\u505c\u7559\u3002",
  },
];
let umbrellaRotation = 0;
let dragStartX = 0;
let dragStartRotation = 0;
let isDraggingUmbrella = false;
let revealTimer = 0;
let settleTimer = 0;
let readingTimer = 0;
let lastSpinDirection = 1;
let currentUmbrellaResult = null;

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

homeReturnButton.addEventListener("click", () => {
  resetUmbrellaResult();
  setUmbrellaRotation(0);
  showScreen("home");
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
  window.clearTimeout(readingTimer);
  umbrellaWheel.classList.remove("spinning", "revealing", "result-visible", "settling");
  guidanceScreen.classList.remove("reading-open");
  umbrellaResultImage.removeAttribute("src");
  umbrellaResultImage.removeAttribute("alt");
  readingTitle.textContent = "";
  readingSummary.textContent = "";
  readingReminder.textContent = "";
  currentUmbrellaResult = null;
}

function pickUmbrellaResult() {
  return umbrellaResults[Math.floor(Math.random() * umbrellaResults.length)];
}

function openReadingPanel(result) {
  readingTitle.textContent = result.name;
  readingSummary.textContent = result.summary;
  readingReminder.textContent = result.reminder;
  guidanceScreen.classList.add("reading-open");
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

  currentUmbrellaResult = selectedResult;
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
    readingTimer = window.setTimeout(() => {
      if (currentUmbrellaResult) {
        openReadingPanel(currentUmbrellaResult);
      }
    }, 520);
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
