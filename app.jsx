/* eslint-disable */
// =================================================================
// DINGA — Interactive Prototype Shell
// =================================================================

// ---------- Shared atoms ----------
const Sparkle = ({ size = 14, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M12 2.5c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"
      fill={color} />
  </svg>
);

const AIPill = ({ dark = false, label = "AI" }) => (
  <span className={`ai-pill ${dark ? "dark" : ""}`}>
    <Sparkle size={10} color={dark ? "#F5F1E8" : "#2D4A3E"} />
    {label}
  </span>
);

const StatusBar = ({ light }) => (
  <div className={`statusbar ${light ? "light" : ""}`}>
    <span>10:30</span>
    <span className="right">
      <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="6" width="3" height="5" rx="0.5"/><rect x="5" y="4" width="3" height="7" rx="0.5"/><rect x="10" y="2" width="3" height="9" rx="0.5"/><rect x="15" y="0" width="2" height="11" rx="0.5" opacity=".5"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 4.5C3 2.5 6 1.5 7.5 1.5s4.5 1 6.5 3"/><path d="M3 6.5C4.3 5.3 6.2 4.5 7.5 4.5s3.2.8 4.5 2"/><path d="M5 8.5c.8-.7 1.7-1 2.5-1s1.7.3 2.5 1"/><circle cx="7.5" cy="10" r="0.7" fill="currentColor"/></svg>
      <svg width="26" height="11" viewBox="0 0 26 11" fill="none"><rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width="17" height="7" rx="1" fill="currentColor"/><rect x="23.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" opacity=".5"/></svg>
    </span>
  </div>
);

// ---------- Phone frame ----------
const PhoneFrame = ({ dark, children, captureClick }) => {
  return (
    <div className={`phone ${dark ? "dark" : ""}`}>
      <div className="screen">{children}</div>
      <div className="dynamic-island"></div>
      <div className="home-indicator"></div>
      {captureClick && <div className="capture" onClick={captureClick}></div>}
    </div>
  );
};

// ---------- Screen switcher ----------
const ScreenRenderer = () => {
  const { screen } = useDinga();
  const Comp = window[`Screen_${screen}`] || (() => null);
  return (
    <div key={screen} style={{ position: "absolute", inset: 0 }}>
      <Comp />
    </div>
  );
};

// ---------- Top bar ----------
const TopBar = () => {
  const { mode, setMode, screen } = useDinga();
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="brand-row">
          <span className="wordmark">Dinga</span>
          <span className="tag">interactive prototype</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="kbd-hint">
            <span className="k"><span className="kbd">←</span><span className="kbd">→</span> 이동</span>
            <span className="k"><span className="kbd">space</span> 모드</span>
            <span className="k"><span className="kbd">R</span> 리셋</span>
          </div>
          <div className="mode-switch">
            <span className={`opt ${mode === "demo" ? "active" : ""}`} onClick={() => setMode("demo")}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M11 18h2"/></svg>
              시연
            </span>
            <span className={`opt ${mode === "overview" ? "active" : ""}`} onClick={() => setMode("overview")}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
              전체
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Flow indicator ----------
const FlowIndicator = () => {
  const { screen } = useDinga();
  const cur = getScreen(screen);
  const sameFlow = SCREEN_LIST.filter(s => s.flow === cur.flow);
  const flowIdx = sameFlow.findIndex(s => s.id === screen);
  const FL = FLOW_LABELS[cur.flow];
  return (
    <div className="flow-indicator">
      <div className="pip">
        <span style={{ width: 10, height: 10, borderRadius: 999, background: FL.color, display: "inline-block" }}></span>
        {FL.ko} 플로우
      </div>
      <div className="dot-track">
        {sameFlow.map((s, i) => (
          <div key={s.id} className={`dot ${i === flowIdx ? "active" : i < flowIdx ? "passed" : ""}`}></div>
        ))}
      </div>
      <div style={{ fontFamily: "var(--font-en)", fontSize: 12 }}>
        {flowIdx + 1} / {sameFlow.length}
      </div>
      <div style={{ opacity: 0.5 }}>·</div>
      <div style={{ fontSize: 13 }}>
        <span style={{ fontFamily: "var(--font-en)", fontWeight: 600, color: "var(--dinga-green)" }}>[{cur.num}]</span>
        {" "}
        <b style={{ color: "var(--dinga-ink)" }}>{cur.name}</b>
      </div>
    </div>
  );
};

// ---------- Control bar ----------
const ControlBar = () => {
  const { screen, stepBy, reset, setPresenting, nav } = useDinga();
  const idx = indexOf(screen);
  const [jumpOpen, setJumpOpen] = React.useState(false);
  const jumpRef = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => {
      if (jumpRef.current && !jumpRef.current.contains(e.target)) setJumpOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const cur = getScreen(screen);
  const FL = FLOW_LABELS[cur.flow];

  return (
    <div className="control-bar">
      <button className="icon-btn" onClick={reset} title="처음으로 (R)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/>
        </svg>
      </button>
      <button className="icon-btn" onClick={() => stepBy(-1)} disabled={idx === 0} title="이전 (←)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
      </button>
      <div className="title">
        <span style={{ fontFamily: "var(--font-en)", fontWeight: 600 }}>{cur.num}</span>
        <span style={{ color: FL.color, fontWeight: 500 }}>{FL.ko}</span>
        <span style={{ opacity: 0.4 }}>›</span>
        <b>{cur.name}</b>
      </div>
      <button className="icon-btn" onClick={() => stepBy(1)} disabled={idx === SCREEN_LIST.length - 1} title="다음 (→)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
      </button>
      <div className="flow-jump" ref={jumpRef}>
        <button className="flow-jump-btn" onClick={() => setJumpOpen(o => !o)}>
          플로우 점프
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        {jumpOpen && (
          <div className="flow-jump-menu">
            <div className="item" onClick={() => { nav("splash"); setJumpOpen(false); }}>
              <span className="swatch" style={{ background: "#2D4A3E" }}></span>
              공통 · 시작 화면
            </div>
            <div className="item" onClick={() => { nav("genrePref"); setJumpOpen(false); }}>
              <span className="swatch" style={{ background: "#3F6B5A" }}></span>
              관객 플로우로 점프
            </div>
            <div className="item" onClick={() => { nav("aiRefine"); setJumpOpen(false); }}>
              <span className="swatch" style={{ background: "#A89BC4" }}></span>
              밴드 플로우로 점프
            </div>
            <div className="item" onClick={() => { nav("venueMatch"); setJumpOpen(false); }}>
              <span className="swatch" style={{ background: "#C66B5A" }}></span>
              공간 매칭부터 보기
            </div>
          </div>
        )}
      </div>
      <button className="icon-btn" onClick={() => setPresenting(true)} title="발표 모드 (F)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9V5a1 1 0 0 1 1-1h4M20 15v4a1 1 0 0 1-1 1h-4M15 4h4a1 1 0 0 1 1 1v4M9 20H5a1 1 0 0 1-1-1v-4"/>
        </svg>
      </button>
    </div>
  );
};

// ---------- Demo mode ----------
const DemoMode = () => {
  const { presenting } = useDinga();
  return (
    <div className={`demo-stage ${presenting ? "presenting" : ""}`}>
      {!presenting && <FlowIndicator />}
      <div className="phone-stage">
        <PhoneFrame>
          <ScreenRenderer />
        </PhoneFrame>
      </div>
      {!presenting && <ControlBar />}
    </div>
  );
};

const PresentExit = () => {
  const { presenting, setPresenting } = useDinga();
  if (!presenting) return null;
  return (
    <button className="present-exit" onClick={() => setPresenting(false)}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      발표 모드 종료 · Esc
    </button>
  );
};

// ---------- Overview mode ----------
const FlowDivider = ({ flow }) => {
  const FL = FLOW_LABELS[flow];
  const screens = SCREEN_LIST.filter(s => s.flow === flow);
  return (
    <div className="flow-divider" style={{ scrollMarginTop: 80 }}>
      <div className="ribbon" style={{ background: FL.color }}></div>
      <div className="label">
        <div className="ko">{FL.ko} 플로우</div>
        <div className="en">{FL.en} · {screens.length} screens</div>
      </div>
      <div className="rule"></div>
      <div className="count">{flow === "band" ? "⭐ 차별화" : `${screens.length} screens`}</div>
    </div>
  );
};

const OverviewMode = () => {
  const { setMode, nav } = useDinga();
  const goTo = (id) => { nav(id); setMode("demo"); };
  return (
    <div className="page overview-stage">
      {["common", "audience", "band"].map(flow => (
        <React.Fragment key={flow}>
          <FlowDivider flow={flow} />
          <div className="screen-grid">
            {SCREEN_LIST.filter(s => s.flow === flow).map(s => {
              const Comp = window[`Screen_${s.id}`] || (() => null);
              const FL = FLOW_LABELS[s.flow];
              return (
                <div key={s.id} className="phone-card clickable">
                  <div className="label-row">
                    <span className="label-num">[{s.num}]</span>
                    <span className="label-name">{s.name}</span>
                    <span className="label-flow" style={{ background: FL.tint, color: FL.color }}>{FL.ko}</span>
                  </div>
                  <PhoneFrame
                    dark={s.id === "splash" || s.id === "booked"}
                    captureClick={() => goTo(s.id)}
                  >
                    <Comp />
                  </PhoneFrame>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ))}
      <footer style={{
        marginTop: 80, paddingTop: 28,
        borderTop: "1px solid rgba(45,74,62,0.18)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 13, color: "var(--dinga-sub)",
      }}>
        <div>
          <span style={{ fontFamily: "var(--font-hand)", fontSize: 28, color: "var(--dinga-green)", marginRight: 12 }}>Dinga</span>
          화면을 클릭하면 시연 모드로 바로 이동해요
        </div>
        <div>팀 일단사자 · 한남대 멋쟁이사자처럼 14기</div>
      </footer>
    </div>
  );
};

// ---------- Toasts + modals ----------
const ToastLayer = () => {
  const { toast } = useDinga();
  if (!toast) return null;
  return (
    <div className="toast-layer">
      <div className="toast" key={toast.key}>
        <Sparkle size={12} color="#D4A24C"/>
        {toast.msg}
      </div>
    </div>
  );
};

const ModalLayer = () => {
  const { modal, setModal } = useDinga();
  if (!modal) return null;

  if (modal.type === "venue-request") {
    return (
      <div className="modal-backdrop" onClick={() => setModal(null)}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "var(--dinga-cream)", margin: "0 auto 16px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2D4A3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5 9-10"/>
            </svg>
          </div>
          <div style={{ fontFamily: "var(--font-hand)", fontSize: 30, color: "var(--dinga-mustard)" }}>nice!</div>
          <div style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>요청을 보냈어요</div>
          <div style={{ fontSize: 13, color: "var(--dinga-sub)", marginTop: 6, lineHeight: 1.5 }}>
            <b style={{ color: "var(--dinga-ink)" }}>{modal.venue}</b> 운영자에게 알림이 전달됐어요.<br/>
            보통 24시간 안에 응답이 와요.
          </div>
          <button onClick={() => setModal(null)} style={{
            marginTop: 16, width: "100%",
            background: "var(--dinga-green)", color: "var(--dinga-cream)",
            border: "none", borderRadius: 12, padding: "12px 18px",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>확인</button>
        </div>
      </div>
    );
  }

  if (modal.type === "publish-success") {
    return (
      <div className="success-screen" onClick={() => { setModal(null); }}>
        <div style={{
          width: 110, height: 110, borderRadius: "50%",
          background: "rgba(245,241,232,0.12)",
          border: "2px solid #D4A24C",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 24, animation: "modalIn 320ms ease-out both",
        }}>
          <Sparkle size={42} color="#D4A24C"/>
        </div>
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 56, color: "#D4A24C", letterSpacing: "-0.01em" }}>published!</div>
        <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6, color: "var(--dinga-cream)" }}>
          {modal.count}개 채널에 발행됐어요
        </div>
        <div style={{ fontSize: 13, marginTop: 8, color: "rgba(245,241,232,0.7)" }}>
          홍보 결과는 마이페이지에서 확인할 수 있어요
        </div>
        <button onClick={() => { setModal(null); }} style={{
          marginTop: 36, background: "var(--dinga-cream)", color: "var(--dinga-green)",
          border: "none", borderRadius: 14, padding: "14px 28px",
          fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}>처음으로</button>
      </div>
    );
  }

  return null;
};

// ---------- Keyboard ----------
const KeyboardLayer = () => {
  const { stepBy, reset, mode, setMode, presenting, setPresenting, nav } = useDinga();
  React.useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowLeft") { e.preventDefault(); stepBy(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); stepBy(1); }
      else if (e.key === " ") { e.preventDefault(); setMode(m => m === "demo" ? "overview" : "demo"); }
      else if (e.key === "r" || e.key === "R") { reset(); }
      else if (e.key === "Escape") { setPresenting(false); }
      else if (e.key === "f" || e.key === "F") { setPresenting(p => !p); }
      else if (e.key === "1") { nav("genrePref"); setMode("demo"); }
      else if (e.key === "2") { nav("aiRefine"); setMode("demo"); }
      else if (e.key === "3") { nav("venueMatch"); setMode("demo"); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stepBy, reset, setMode, setPresenting, nav]);
  return null;
};

// ---------- Shell ----------
const Shell = () => {
  const { mode, presenting } = useDinga();
  return (
    <div>
      {!presenting && <TopBar />}
      {mode === "demo" ? <DemoMode /> : <OverviewMode />}
      <ToastLayer />
      <ModalLayer />
      <PresentExit />
      <KeyboardLayer />
    </div>
  );
};

const App = () => (
  <DingaProvider>
    <Shell />
  </DingaProvider>
);

Object.assign(window, { App, PhoneFrame, StatusBar, Sparkle, AIPill });
