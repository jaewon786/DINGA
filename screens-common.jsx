/* eslint-disable */
// =================================================================
// Common screens — splash, onboarding, user type
// =================================================================

// === Screen: splash ============================================
const Screen_splash = () => {
  const { nav } = useDinga();
  React.useEffect(() => {
    const t = setTimeout(() => nav("onboarding"), 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      onClick={() => nav("onboarding")}
      style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(165deg, #2D4A3E 0%, #1F3329 100%)",
        color: "var(--dinga-cream)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        overflow: "hidden", cursor: "pointer",
      }}>
      <StatusBar light />

      {/* Daejeon pin */}
      <div style={{ position: "absolute", top: 360, left: 178, zIndex: 2 }}>
        <div style={{
          width: 14, height: 14, borderRadius: "50%",
          background: "#D4A24C",
          boxShadow: "0 0 0 5px rgba(212,162,76,0.25), 0 0 0 12px rgba(212,162,76,0.1)",
        }}></div>
        <div style={{
          position: "absolute", top: 18, left: 18,
          fontFamily: "var(--font-hand)",
          fontSize: 18, color: "#D4A24C",
          whiteSpace: "nowrap",
        }}>Daejeon</div>
      </div>

      <div style={{
        width: 220, height: 220, borderRadius: "50%",
        border: "2px solid rgba(245,241,232,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        background: "radial-gradient(circle at 35% 30%, rgba(245,241,232,0.06), transparent 60%)",
        animation: "modalIn 600ms cubic-bezier(0.22,0.61,0.36,1) both",
      }}>
        <div style={{
          fontFamily: "var(--font-hand)",
          fontSize: 96, lineHeight: 1, color: "var(--dinga-cream)",
          letterSpacing: "-0.02em",
          transform: "rotate(-3deg)",
        }}>Dinga</div>
        <div style={{ position: "absolute", top: 24, right: 28, width: 6, height: 6, borderRadius: "50%", background: "#D4A24C" }}></div>
        <div style={{ position: "absolute", bottom: 30, left: 36, width: 4, height: 4, borderRadius: "50%", background: "rgba(245,241,232,0.6)" }}></div>
      </div>

      <div style={{
        position: "absolute", bottom: 120, textAlign: "center",
        color: "rgba(245,241,232,0.7)", fontSize: 13, letterSpacing: "0.15em",
      }}>
        동네에서 만나는 진짜 라이브
      </div>
      <div style={{
        position: "absolute", bottom: 78, textAlign: "center", width: "100%",
        fontSize: 11, color: "rgba(245,241,232,0.4)",
      }}>
        탭하거나 잠시 기다리세요
      </div>
    </div>
  );
};

// === Screen: onboarding ========================================
const Screen_onboarding = () => {
  const { nav } = useDinga();
  const [page, setPage] = React.useState(0);

  const pages = [
    {
      hand: "step 1 / 3",
      title: <>흩어진 공연 정보를,<br/><span className="scribble">한 곳에</span></>,
      body: "인스타·블로그·뮬에 흩어진\n공연 소식을 매일 자동으로 모아드려요.",
      illust: <IllustChannels />,
    },
    {
      hand: "step 2 / 3",
      title: <><span className="scribble">AI</span>가 당신의 취향을<br/>섬세하게 찾아드려요</>,
      body: "좋아한 공연 하나면 충분해요.\n비슷한 결의 라이브를 매일 큐레이션합니다.",
      illust: <IllustSparkleCards />,
    },
    {
      hand: "step 3 / 3",
      title: <>동네에서 만나는<br/><span className="scribble">진짜 라이브</span></>,
      body: "한남대 골목, 유성, 둔산까지.\n걸어갈 수 있는 거리의 라이브를 찾아보세요.",
      illust: <IllustMap />,
    },
  ];
  const p = pages[page];

  const next = () => page < 2 ? setPage(page + 1) : nav("userType");

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--dinga-bg)", color: "var(--dinga-ink)", overflow: "hidden" }}>
      <StatusBar />

      <div className="tappable" onClick={() => nav("userType")} style={{ position: "absolute", top: 66, right: 20, fontSize: 14, color: "var(--dinga-sub)", padding: "4px 8px" }}>건너뛰기</div>

      <div key={page} style={{ position: "absolute", top: 100, left: 0, right: 0, height: 380, display: "flex", justifyContent: "center", alignItems: "center", animation: "screenIn 280ms ease-out both" }}>
        {p.illust}
      </div>

      <div key={`copy-${page}`} style={{ position: "absolute", bottom: 200, left: 32, right: 32, animation: "screenIn 320ms ease-out 60ms both" }}>
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 28, color: "var(--dinga-mustard)", marginBottom: 4 }}>
          {p.hand}
        </div>
        <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.35, color: "var(--dinga-ink)", letterSpacing: "-0.02em" }}>
          {p.title}
        </div>
        <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: "var(--dinga-sub)", whiteSpace: "pre-line" }}>
          {p.body}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 110, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
        {[0, 1, 2].map(i => (
          <span key={i} onClick={() => setPage(i)}
            className="tappable"
            style={{
              width: page === i ? 22 : 6, height: 6, borderRadius: 999,
              background: page === i ? "var(--dinga-green)" : "var(--dinga-line)",
              transition: "all 0.2s ease",
            }}></span>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 38, left: 24, right: 24 }}>
        <button className="cta-dark tappable" onClick={next}>
          {page < 2 ? "다음" : "시작하기"} →
        </button>
      </div>
    </div>
  );
};

const IllustChannels = () => (
  <svg viewBox="0 0 320 360" width="320" height="360">
    {/* 4 channel bubbles converging */}
    <g>
      <circle cx="60" cy="70" r="30" fill="#C66B5A"/>
      <text x="60" y="76" textAnchor="middle" fill="#F5F1E8" fontSize="13" fontWeight="600">IG</text>
      <circle cx="250" cy="70" r="30" fill="#D4A24C"/>
      <text x="250" y="76" textAnchor="middle" fill="#F5F1E8" fontSize="13" fontWeight="600">Blog</text>
      <circle cx="60" cy="200" r="30" fill="#A89BC4"/>
      <text x="60" y="206" textAnchor="middle" fill="#F5F1E8" fontSize="13" fontWeight="600">뮬</text>
      <circle cx="250" cy="200" r="30" fill="#3F6B5A"/>
      <text x="250" y="206" textAnchor="middle" fill="#F5F1E8" fontSize="11" fontWeight="600">YT</text>
      {/* arrows in */}
      <path d="M84 88 Q 130 130 145 145" stroke="#1A2B23" strokeWidth="1.2" fill="none" strokeDasharray="3 3" opacity=".4"/>
      <path d="M226 88 Q 180 130 170 145" stroke="#1A2B23" strokeWidth="1.2" fill="none" strokeDasharray="3 3" opacity=".4"/>
      <path d="M84 200 Q 130 180 145 175" stroke="#1A2B23" strokeWidth="1.2" fill="none" strokeDasharray="3 3" opacity=".4"/>
      <path d="M226 200 Q 180 180 170 175" stroke="#1A2B23" strokeWidth="1.2" fill="none" strokeDasharray="3 3" opacity=".4"/>
      {/* center bubble */}
      <circle cx="160" cy="160" r="48" fill="#2D4A3E"/>
      <text x="160" y="158" textAnchor="middle" fill="#F5F1E8" fontFamily="Caveat" fontSize="32">Dinga</text>
      <text x="160" y="180" textAnchor="middle" fill="#D4A24C" fontSize="10" letterSpacing="2">FEED</text>
      {/* notes */}
      <path d="M155 280 q 6 -16 -2 -22 q 10 -8 14 0" stroke="#D4A24C" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="153" cy="282" r="4" fill="#D4A24C"/>
    </g>
  </svg>
);

const IllustSparkleCards = () => (
  <svg viewBox="0 0 320 360" width="320" height="360">
    <g transform="translate(36 70) rotate(-8)">
      <rect width="120" height="160" rx="14" fill="#3F6B5A"/>
      <rect x="14" y="14" width="92" height="92" rx="8" fill="#1F3329"/>
      <circle cx="60" cy="60" r="20" fill="#D4A24C" opacity=".9"/>
      <rect x="14" y="118" width="60" height="6" rx="3" fill="#F5F1E8"/>
      <rect x="14" y="130" width="40" height="5" rx="2.5" fill="#F5F1E8" opacity=".5"/>
    </g>
    <g transform="translate(170 90) rotate(7)">
      <rect width="120" height="160" rx="14" fill="#A89BC4"/>
      <rect x="14" y="14" width="92" height="92" rx="8" fill="#514177"/>
      <path d="M40 80 L60 30 L75 60 L90 40" stroke="#F5F1E8" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <rect x="14" y="118" width="70" height="6" rx="3" fill="#F5F1E8"/>
      <rect x="14" y="130" width="44" height="5" rx="2.5" fill="#F5F1E8" opacity=".5"/>
    </g>
    <g transform="translate(96 50)">
      <rect width="130" height="180" rx="16" fill="#2D4A3E"/>
      <rect width="130" height="180" rx="16" fill="none" stroke="#D4A24C" strokeWidth="2"/>
      <rect x="14" y="14" width="102" height="100" rx="10" fill="#F5F1E8"/>
      <circle cx="65" cy="64" r="22" fill="none" stroke="#2D4A3E" strokeWidth="2"/>
      <circle cx="65" cy="64" r="6" fill="#2D4A3E"/>
      <rect x="14" y="124" width="80" height="8" rx="4" fill="#F5F1E8"/>
      <rect x="14" y="138" width="58" height="6" rx="3" fill="#F5F1E8" opacity=".5"/>
      <rect x="14" y="152" width="48" height="14" rx="7" fill="#D4A24C"/>
    </g>
    <g fill="#D4A24C">
      <path d="M75 28 c.4 3 2 4.6 5 5 -3 .4-4.6 2-5 5 -.4-3-2-4.6-5-5 3-.4 4.6-2 5-5z"/>
      <path d="M230 50 c.3 2 1.4 3 3 3 -1.6.3-2.7 1-3 3 -.3-2-1.4-3-3-3 1.6-.3 2.7-1 3-3z"/>
      <path d="M210 230 c.5 4 2.4 6 6 6 -3.6.5-5.5 2-6 6 -.5-4-2.4-6-6-6 3.6-.5 5.5-2 6-6z"/>
      <path d="M60 240 c.3 2 1.4 3 3 3 -1.6.3-2.7 1-3 3 -.3-2-1.4-3-3-3 1.6-.3 2.7-1 3-3z"/>
    </g>
  </svg>
);

const IllustMap = () => (
  <svg viewBox="0 0 320 360" width="320" height="360">
    {/* abstract map */}
    <rect x="20" y="40" width="280" height="280" rx="18" fill="#EFEDE3"/>
    <path d="M30 110 Q 100 80 200 130 T 310 100" stroke="#D4D0BD" strokeWidth="14" fill="none"/>
    <path d="M60 30 L 80 330" stroke="#D4D0BD" strokeWidth="3" fill="none"/>
    <path d="M230 30 L 260 330" stroke="#D4D0BD" strokeWidth="3" fill="none"/>
    <path d="M30 240 L 310 230" stroke="#A89BC4" strokeWidth="10" fill="none" opacity=".4"/>
    {/* pins */}
    {[
      [80, 90, "#2D4A3E", "♪3"],
      [200, 160, "#D4A24C", "♪5"],
      [120, 230, "#C66B5A", "♪2"],
      [240, 280, "#3F6B5A", "♪1"],
    ].map((p, i) => (
      <g key={i} transform={`translate(${p[0]} ${p[1]})`}>
        <ellipse cx="0" cy="5" rx="14" ry="3" fill="#1A2B23" opacity=".15"/>
        <rect x="-18" y="-14" width="36" height="20" rx="10" fill={p[2]}/>
        <text x="0" y="0" textAnchor="middle" fill="#F5F1E8" fontSize="11" fontWeight="600">{p[3]}</text>
      </g>
    ))}
    {/* me */}
    <circle cx="160" cy="180" r="8" fill="#1570EF"/>
    <circle cx="160" cy="180" r="8" fill="none" stroke="#1570EF" strokeWidth="3" opacity=".3"/>
    <text x="160" y="350" textAnchor="middle" fontFamily="Caveat" fontSize="22" fill="#D4A24C">한남대 인근 11곳</text>
  </svg>
);

// === Screen: userType ==========================================
const Screen_userType = () => {
  const { nav, setUserType } = useDinga();
  const pick = (t) => {
    if (t === "space") return; // 공간 제공자는 비활성
    setUserType(t);
    if (t === "audience") nav("genrePref");
    else if (t === "band") nav("aiRefine");
  };

  const cards = [
    {
      type: "audience",
      label: "관객", en: "Listener",
      desc: "내 동네에서 열리는\n진짜 인디 라이브를 만나요",
      bg: "linear-gradient(135deg, #3F6B5A 0%, #2D4A3E 100%)",
      tone: "#D4A24C",
      icon: <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>,
      icon2: <><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4z"/><path d="M3 19a2 2 0 0 0 2 2h1v-6H3v4z"/></>,
    },
    {
      type: "band",
      label: "밴드", en: "Band",
      desc: "AI가 프로필부터 홍보까지\n한 번에 완성해드려요",
      bg: "linear-gradient(135deg, #A89BC4 0%, #7C6FA0 100%)",
      tone: "#2D4A3E",
      icon: <><path d="M12 2v13"/><circle cx="9" cy="17" r="3"/><path d="M20 6 12 9"/><circle cx="17" cy="14" r="3"/></>,
    },
    {
      type: "space",
      label: "공간 제공자", en: "Venue",
      desc: "우리 공간에 잘 어울리는\n밴드를 매칭해드려요",
      bg: "linear-gradient(135deg, #C66B5A 0%, #9C4A3B 100%)",
      tone: "#F5F1E8",
      icon: <><path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/></>,
    },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--dinga-bg)", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ position: "absolute", top: 70, left: 24, right: 24 }}>
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 24, color: "var(--dinga-mustard)" }}>welcome</div>
        <div style={{ fontSize: 26, fontWeight: 600, color: "var(--dinga-ink)", letterSpacing: "-0.02em", marginTop: 4, lineHeight: 1.3 }}>
          어떻게 DINGA를<br/>쓰실 건가요?
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: "var(--dinga-sub)" }}>
          역할별로 다른 경험을 만들어드려요
        </div>
      </div>

      <div style={{ position: "absolute", top: 220, left: 20, right: 20, display: "flex", flexDirection: "column", gap: 14 }}>
        {cards.map((c) => {
          const disabled = c.type === "space";
          return (
            <div key={c.type}
              className={disabled ? "" : "tappable"}
              onClick={() => pick(c.type)}
              style={{
                background: c.bg, color: "#F5F1E8",
                borderRadius: 20, padding: "20px 18px",
                display: "flex", alignItems: "center", gap: 14,
                position: "relative", overflow: "hidden",
              }}>
              <svg style={{ position: "absolute", right: -20, top: -20, opacity: 0.25 }} width="120" height="120">
                <circle cx="60" cy="60" r="50" fill="none" stroke={c.tone} strokeWidth="1" strokeDasharray="2 4"/>
                <circle cx="60" cy="60" r="34" fill="none" stroke={c.tone} strokeWidth="1" strokeDasharray="2 4"/>
              </svg>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: "rgba(245,241,232,0.16)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: c.tone, flexShrink: 0,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {c.icon}{c.icon2}
                </svg>
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em" }}>{c.label}</div>
                  <div style={{ fontFamily: "var(--font-en)", fontSize: 11, opacity: 0.55, letterSpacing: "0.12em", textTransform: "uppercase" }}>{c.en}</div>
                </div>
                <div style={{ marginTop: 4, fontSize: 13, opacity: 0.78, whiteSpace: "pre-line", lineHeight: 1.5 }}>{c.desc}</div>
              </div>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".75"><path d="M9 6l6 6-6 6"/></svg>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 38, left: 24, right: 24, textAlign: "center", fontSize: 12, color: "var(--dinga-sub)" }}>
        나중에 마이페이지에서 바꿀 수 있어요
      </div>
    </div>
  );
};

Object.assign(window, { Screen_splash, Screen_onboarding, Screen_userType });
