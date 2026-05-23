const LOCATIONS = {
  room401: {
    id: "room401",
    label: "10-1동 401호",
    subtitle: "사범대학 교육정보관",
    image: "./10-1.jpg",
  },
  zoom: {
    id: "zoom",
    label: "ZOOM 회의실",
    subtitle: "온라인 회의 참가",
    image: "./ZOOM.png",
  },
};

const MESSAGES = [
  {
    max: 10,
    tier: "가볍게 숨을 고르자",
    text: "오늘도 꽤 잘 버텼네요.\n툭툭 털고 다시 움직이는 당신은 생각보다 더 대단한 사람일지도 몰라요.",
  },
  {
    max: 20,
    tier: "잠깐 쉬어도 괜찮아",
    text: "어쩐지 마음이 무거운 오늘 하루.\n당장 너무 멀리 보지 말아요. 지금 한 순간을 극복하는 것만으로도 충분해요.",
  },
  {
    max: 30,
    tier: "솔직한 마음을 털어놓자",
    text: "하기 싫고 지치는 마음, 누구에게나 찾아와요.\n그 감정을 억지로 참지 않고 클릭으로 마음껏 표출해 보세요.",
  },
  {
    max: 50,
    tier: "깊게 숨을 들이마시자",
    text: "많은 부정적인 순간들을 견뎌왔네요.\n아무렇지 않은 척했어도 내심 많이 지쳤을 거예요.\n오늘만은 잠깐 쉬어가도 괜찮답니다.",
  },
  {
    max: 100,
    tier: "마음의 무게를 비워야 해",
    text: "이 정도면 누구라도 버겁다고 느낄 거예요.\n당신이 부족해서 힘든 게 아니라, 그만큼 많은 걸 감당해왔다는 뜻일지도 몰라요.\n그러니 오늘은 스스로를 조금 덜 몰아붙여 주세요.",
  },
  {
    max: 200,
    tier: "오래 버틴 자신에게 휴식의 시간을 선물하자",
    text: "정말 오래 애써왔네요.\n열심히 버텨온 당신에게는 답답해 하고 화를 낼 자격이 있어요.\n다른 사람 입장은 잠시 잊고 마음껏 분노를 표현해 보세요.",
  },
  {
    max: 300,
    tier: "깊은 공감이 필요해",
    text: "여기까지 왔다는 것부터가 이미 충분히 잘해내고 있다는 증거예요.\n힘든 마음을 외면하지 않고 마주하려는 건 생각보다 큰 용기가 필요한 일이잖아요.\n당신을 열받게 만드는 것들, 저도 함께 공감할게요.",
  },
  {
    max: 500,
    tier: "큰 위로가 필요해",
    text: "마음이 이렇게까지 차오를 때까지, 정말 많이 참아왔나 봐요.\n누군가는 몰라줘도 괜찮아요.\n당신이 얼마나 애써왔는지는, 당신 마음과 이 클릭 수와 제가 다 알고 있으니까요.",
  },
  {
    max: 1000,
    tier: "가장 큰 응원이 필요해",
    text: "정말 수고 많았어요.\n무너지지 않기 위해서는 정말 많은 힘이 필요하죠. 그 힘을 당신이 가지고 오늘 하루를 나아가고 있다는 것 자체가 대단한 일이에요.\n멈춰 있는 것처럼 보이지만, 당신은 엄청난 일을 해내고 있는 거예요.",
  },
  {
    max: Infinity,
    tier: "사랑하는 당신에게!",
    text: "제게도 많은 두려움이 있답니다. 내가 어떻게 하면 이 일을 다 해낼 수 있을까, 책임질 수 있을까, 벌써부터 이렇게 힘들면 다음엔 어떻게 해야 할까...\n그래도 우리는 어떻게든 살아갈 거예요. 다른 사람들이 믿지 않는다 해도, 우리만큼은 우리 자신을 믿고 스스로의 편이 되기로 해요.",
  },
];

let selectedLocation = null;
let angerCount = 0;

const screens = {
  select: document.getElementById("screen-select"),
  interact: document.getElementById("screen-interact"),
  result: document.getElementById("screen-result"),
};

const sceneImage = document.getElementById("scene-image");
const locationBadge = document.getElementById("location-badge");
const angerCountEl = document.getElementById("anger-count");
const resultTierEl = document.getElementById("result-tier");
const resultCountEl = document.getElementById("result-count");
const resultMessageEl = document.getElementById("result-message");

document.querySelectorAll(".choice-card").forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.dataset.location;
    selectedLocation = LOCATIONS[key];
    angerCount = 0;
    showScreen("interact");
    updateInteractView();
  });
});

document.getElementById("btn-anger").addEventListener("click", () => {
  angerCount += 1;
  angerCountEl.textContent = String(angerCount);
  angerCountEl.classList.remove("bump");
  void angerCountEl.offsetWidth;
  angerCountEl.classList.add("bump");
});

document.getElementById("btn-proceed").addEventListener("click", () => {
  showResult();
  showScreen("result");
});

document.getElementById("btn-restart").addEventListener("click", () => {
  selectedLocation = null;
  angerCount = 0;
  showScreen("select");
});

document.getElementById("btn-back-select").addEventListener("click", () => {
  angerCount = 0;
  showScreen("select");
});

function showScreen(name) {
  Object.values(screens).forEach((el) => el.classList.remove("active"));
  screens[name].classList.add("active");
}

function updateInteractView() {
  if (!selectedLocation) return;
  sceneImage.src = selectedLocation.image;
  sceneImage.alt = selectedLocation.label;
  locationBadge.textContent = selectedLocation.label;
  angerCountEl.textContent = "0";
}

function getMessageForCount(count) {
  return MESSAGES.find((entry) => count <= entry.max) ?? MESSAGES[MESSAGES.length - 1];
}

function showResult() {
  const { tier, text } = getMessageForCount(angerCount);
  resultTierEl.textContent = tier;
  resultCountEl.innerHTML = `분노 카운트 <strong>${angerCount}</strong>회`;
  resultMessageEl.textContent = text;
}
