/* eslint-disable */
// =================================================================
// DINGA — global state, navigation, screen map
// =================================================================

const SCREEN_LIST = [
  { id: "splash",      num: "01", name: "스플래시",          flow: "common"   },
  { id: "onboarding",  num: "02", name: "온보딩",            flow: "common"   },
  { id: "userType",    num: "03", name: "유저 타입 선택",    flow: "common"   },
  { id: "genrePref",   num: "04", name: "취향 입력",         flow: "audience" },
  { id: "home",        num: "05", name: "홈 추천 피드",      flow: "audience" },
  { id: "mapCal",      num: "06", name: "지도 + 캘린더",      flow: "audience" },
  { id: "detail",      num: "07", name: "공연 상세",         flow: "audience" },
  { id: "booked",      num: "08", name: "예매 완료",         flow: "audience" },
  { id: "aiRefine",    num: "09", name: "AI 자동 프로필 정제", flow: "band"    },
  { id: "venueMatch",  num: "10", name: "공간 매칭 결과",     flow: "band"    },
  { id: "promo",       num: "11", name: "원클릭 홍보",        flow: "band"    },
];

const FLOW_LABELS = {
  common:   { ko: "공통",       en: "Common",   color: "#2D4A3E", tint: "rgba(45,74,62,0.08)" },
  audience: { ko: "관객",       en: "Audience", color: "#2D4A3E", tint: "rgba(63,107,90,0.18)" },
  band:     { ko: "밴드",       en: "Band",     color: "#514177", tint: "rgba(168,155,196,0.25)" },
  space:    { ko: "공간",       en: "Venue",    color: "#8E3F30", tint: "rgba(198,107,90,0.18)" },
};

const FLOW_ENTRY = {
  audience: "genrePref",
  band:     "aiRefine",
  space:    "venueMatch",
};

const getScreen = (id) => SCREEN_LIST.find(s => s.id === id);
const indexOf = (id) => SCREEN_LIST.findIndex(s => s.id === id);

const DingaContext = React.createContext(null);
const useDinga = () => React.useContext(DingaContext);

const DingaProvider = ({ children }) => {
  const [screen, setScreen] = React.useState("splash");
  const [mode, setMode] = React.useState("demo");           // demo | overview
  const [presenting, setPresenting] = React.useState(false);
  const [direction, setDirection] = React.useState("forward");

  // app state
  const [userType, setUserType] = React.useState(null);
  const [selectedGenres, setSelectedGenres] = React.useState(["인디록", "어쿠스틱", "시티팝", "포크"]);
  const [selectedMoods, setSelectedMoods] = React.useState(["잔잔한", "감성적"]);
  const [selectedRegions, setSelectedRegions] = React.useState(["한남대", "구도심"]);
  const [selectedChannels, setSelectedChannels] = React.useState(["인스타", "블로그", "DINGA"]);
  const [selectedTone, setSelectedTone] = React.useState("감성");
  const [likedShows, setLikedShows] = React.useState(["show-santokki"]);
  const [aiStep, setAiStep] = React.useState(1);
  const [aiUrl, setAiUrl] = React.useState("@saebyeok_2am");

  // overlays
  const [toast, setToastState] = React.useState(null);
  const [modal, setModal] = React.useState(null);

  // nav history
  const [history, setHistory] = React.useState([]);
  const screenRef = React.useRef(screen);
  React.useEffect(() => { screenRef.current = screen; }, [screen]);

  const navTo = React.useCallback((id, opts = {}) => {
    if (!id || id === screenRef.current) return;
    const fromIdx = indexOf(screenRef.current);
    const toIdx = indexOf(id);
    setDirection(opts.direction || (toIdx >= fromIdx ? "forward" : "back"));
    setHistory(h => [...h, screenRef.current]);
    setScreen(id);
  }, []);

  const goBack = React.useCallback(() => {
    setHistory(h => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setDirection("back");
      setScreen(prev);
      return h.slice(0, -1);
    });
  }, []);

  const reset = React.useCallback(() => {
    setDirection("back");
    setScreen("splash");
    setHistory([]);
    setAiStep(1);
  }, []);

  const stepBy = React.useCallback((delta) => {
    const idx = indexOf(screenRef.current);
    const next = Math.max(0, Math.min(SCREEN_LIST.length - 1, idx + delta));
    if (next !== idx) {
      setDirection(delta > 0 ? "forward" : "back");
      setHistory(h => [...h, screenRef.current]);
      setScreen(SCREEN_LIST[next].id);
    }
  }, []);

  const toggleIn = (setter) => (item) =>
    setter(arr => arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]);

  const toastTimerRef = React.useRef(null);
  const showToast = React.useCallback((msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastState({ msg, key: Date.now() });
    toastTimerRef.current = setTimeout(() => setToastState(null), 2200);
  }, []);

  const value = {
    screen, setScreen,
    mode, setMode,
    presenting, setPresenting,
    direction,
    userType, setUserType,
    selectedGenres, toggleGenre: toggleIn(setSelectedGenres),
    selectedMoods,  toggleMood: toggleIn(setSelectedMoods),
    selectedRegions, toggleRegion: toggleIn(setSelectedRegions),
    selectedChannels, toggleChannel: toggleIn(setSelectedChannels),
    selectedTone, setSelectedTone,
    likedShows, toggleLike: toggleIn(setLikedShows),
    aiStep, setAiStep,
    aiUrl, setAiUrl,
    toast, showToast,
    modal, setModal,
    nav: navTo, back: goBack, reset, stepBy,
    history,
  };

  return <DingaContext.Provider value={value}>{children}</DingaContext.Provider>;
};

Object.assign(window, {
  DingaProvider, useDinga, SCREEN_LIST, FLOW_LABELS, FLOW_ENTRY, getScreen, indexOf
});
