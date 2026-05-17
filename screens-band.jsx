/* eslint-disable */
// =================================================================
// Band screens — AI auto-refine (3 steps), venue match, one-click promo
// =================================================================

// === Screen: aiRefine ===========================================
const Screen_aiRefine = () => {
  const { nav, back, aiStep, setAiStep, aiUrl, setAiUrl } = useDinga();

  // auto-transition step 2 -> 3
  React.useEffect(() => {
    if (aiStep === 2) {
      const t = setTimeout(() => setAiStep(3), 2800);
      return () => clearTimeout(t);
    }
  }, [aiStep]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--dinga-bg)", overflow: "hidden" }}>
      <StatusBar />

      <div style={{ position: "absolute", top: 64, left: 18, right: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <svg className="tappable" onClick={() => aiStep > 1 ? setAiStep(aiStep - 1) : back()}
          width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A2B23" strokeWidth="1.8" strokeLinecap="round">
          <path d="M15 6l-6 6 6 6"/>
        </svg>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{
              width: aiStep === n ? 24 : 18, height: 4, borderRadius: 999,
              background: aiStep >= n ? "var(--dinga-green)" : "var(--dinga-line)",
              transition: "all 0.3s ease",
            }}></div>
          ))}
        </div>
        <div style={{ fontFamily: "var(--font-en)", fontSize: 12, color: "var(--dinga-sub)" }}>{aiStep}/3</div>
      </div>

      <div key={`step-${aiStep}`} style={{ position: "absolute", top: 100, left: 0, right: 0, bottom: 0, animation: "screenIn 280ms ease-out both" }}>
        {aiStep === 1 && <AiStep1 url={aiUrl} setUrl={setAiUrl} onNext={() => setAiStep(2)} />}
        {aiStep === 2 && <AiStep2 />}
        {aiStep === 3 && <AiStep3 onSubmit={() => nav("venueMatch")} />}
      </div>
    </div>
  );
};

// step 1 — URL input
const AiStep1 = ({ url, setUrl, onNext }) => (
  <>
    <div style={{ padding: "12px 24px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <AIPill />
        <div style={{ fontSize: 11, color: "var(--dinga-sub)" }}>Dinga AI · 자동 프로필 정제</div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
        당신의 <span className="scribble">인스타 한 줄</span>만<br/>
        알려주세요
      </div>
      <div style={{ fontSize: 13, color: "var(--dinga-sub)", marginTop: 8, lineHeight: 1.55 }}>
        AI가 인스타·블로그·유튜브를 분석해서<br/>
        밴드 프로필을 자동으로 채워드려요.
      </div>
    </div>

    <div style={{ padding: "32px 20px 0" }}>
      <div style={{ fontSize: 11, color: "var(--dinga-sub)", marginBottom: 6, letterSpacing: "0.04em" }}>인스타그램 핸들 또는 URL</div>
      <div className="ai-border" style={{ borderRadius: 16 }}>
        <div className="inner" style={{
          padding: "14px 14px",
          display: "flex", alignItems: "center", gap: 10, borderRadius: 14.5,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--dinga-green)" strokeWidth="1.7">
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
          </svg>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="@your_band"
            style={{
              flex: 1, border: "none", outline: "none",
              fontSize: 16, fontWeight: 500, background: "transparent",
              fontFamily: "var(--font-en)", color: "var(--dinga-ink)",
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 12, color: "var(--dinga-sub)", display: "flex", alignItems: "flex-start", gap: 6, lineHeight: 1.55 }}>
        <Sparkle size={11} color="#D4A24C" style={{ marginTop: 3, flexShrink: 0 }}/>
        <div>
          인스타가 없다면 유튜브 채널이나 블로그도 괜찮아요.<br/>
          분석 결과는 다음 단계에서 확인하고 수정할 수 있어요.
        </div>
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 28, left: 20, right: 20 }}>
      <button onClick={onNext} className="cta-dark tappable">
        <Sparkle size={14} color="#F5F1E8"/>
        AI가 알아서 채울게요
      </button>
    </div>
  </>
);

// step 2 — loading with channel scan
const AiStep2 = () => {
  const [scanIdx, setScanIdx] = React.useState(0);
  const channels = [
    { name: "Instagram", color: "#C66B5A", icon: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></> },
    { name: "Naver Blog", color: "#D4A24C", icon: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 8v8M9 8l6 8V8"/></> },
    { name: "YouTube",   color: "#3F6B5A", icon: <><rect x="2" y="6" width="20" height="12" rx="3"/><path d="M10 9l6 3-6 3z" fill="currentColor"/></> },
  ];
  React.useEffect(() => {
    const t = setInterval(() => setScanIdx(i => Math.min(i + 1, channels.length)), 800);
    return () => clearInterval(t);
  }, []);

  const messages = ["인스타 포스트 분석 중", "블로그 글 정리 중", "유튜브 영상 추출 중"];

  return (
    <>
      <div style={{ padding: "12px 24px 0", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 24, color: "var(--dinga-mustard)" }}>analyzing</div>
        <div style={{ fontSize: 24, fontWeight: 600, marginTop: 6, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          Dinga AI가<br/>분석 중이에요
        </div>
      </div>

      {/* spinner */}
      <div style={{ position: "absolute", top: 200, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 120, height: 120 }}>
          <div className="ai-spinner" style={{ width: 120, height: 120 }}></div>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Sparkle size={42} color="#D4A24C"/>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 350, left: 0, right: 0, textAlign: "center", fontSize: 14, color: "var(--dinga-sub)" }}>
        {scanIdx < channels.length ? messages[scanIdx] : "거의 다 됐어요…"}
      </div>

      <div style={{ position: "absolute", top: 410, left: 24, right: 24, display: "flex", flexDirection: "column", gap: 10 }}>
        {channels.map((c, i) => {
          const done = i < scanIdx;
          const scanning = i === scanIdx;
          return (
            <div key={c.name} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px",
              background: done ? "rgba(45,74,62,0.05)" : "#fff",
              border: `1px solid ${done ? "var(--dinga-green)" : "var(--dinga-line)"}`,
              borderRadius: 14,
              transition: "all 0.3s ease",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: c.color, color: "#F5F1E8",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: done || scanning ? 1 : 0.55,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
              </div>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: done ? "var(--dinga-ink)" : "var(--dinga-sub)" }}>
                {c.name}
              </div>
              {done ? (
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--dinga-green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F5F1E8" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12l5 5 9-10"/></svg>
                </div>
              ) : scanning ? (
                <div style={{ display: "flex", gap: 3 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--dinga-mustard)", animation: "fadeIn 0.6s ease-in-out infinite alternate" }}></div>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--dinga-mustard)", animation: "fadeIn 0.6s ease-in-out 0.2s infinite alternate" }}></div>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--dinga-mustard)", animation: "fadeIn 0.6s ease-in-out 0.4s infinite alternate" }}></div>
                </div>
              ) : (
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: "1.5px solid var(--dinga-line)" }}></div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

// step 3 — review
const AiStep3 = ({ onSubmit }) => (
  <>
    <div style={{ padding: "12px 24px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <AIPill />
        <div style={{ fontSize: 11, color: "var(--dinga-sub)" }}>자동 정제 완료</div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
        이대로 <span className="scribble">맞을까요</span>?
      </div>
      <div style={{ fontSize: 13, color: "var(--dinga-sub)", marginTop: 6, lineHeight: 1.5 }}>
        연필 아이콘으로 수정할 수 있어요.
      </div>
    </div>

    <div style={{ position: "absolute", top: 130, left: 20, right: 20, bottom: 100, overflow: "hidden" }}>
      <div className="ai-border" style={{ borderRadius: 20 }}>
        <div className="inner" style={{ padding: 14, borderRadius: 18.5 }}>
          <Field label="밴드명" value="새벽두시"/>
          <Field label="장르" valueNode={
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span className="chip lavender" style={{ fontSize: 11, padding: "3px 9px" }}>인디록</span>
              <span className="chip lavender" style={{ fontSize: 11, padding: "3px 9px" }}>드림팝</span>
              <span className="chip lavender" style={{ fontSize: 11, padding: "3px 9px" }}>슈게이즈</span>
            </div>
          }/>
          <Field label="대표 영상" valueNode={
            <div style={{ display: "flex", gap: 8 }}>
              {["#2D4A3E", "#A89BC4", "#C66B5A"].map((c, i) => (
                <div key={i} style={{ width: 78, height: 50, background: c, borderRadius: 8, position: "relative", overflow: "hidden" }}>
                  <div className="noise" style={{ position: "absolute", inset: 0, opacity: 0.4 }}></div>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#F5F1E8" }}>
                    <PlayIcon size={16}/>
                  </div>
                </div>
              ))}
            </div>
          }/>
          <Field label="멤버" valueNode={
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { n: "유진", r: "보컬",   c: "#2D4A3E" },
                { n: "하늘", r: "기타",   c: "#A89BC4" },
                { n: "도윤", r: "베이스", c: "#D4A24C" },
                { n: "수민", r: "드럼",   c: "#C66B5A" },
              ].map(m => (
                <div key={m.n} style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: m.c, color: "#F5F1E8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-hand)", fontSize: 16, margin: "0 auto" }}>{m.n[0]}</div>
                  <div style={{ fontSize: 10, marginTop: 4 }}>{m.n}</div>
                  <div style={{ fontSize: 9, color: "var(--dinga-sub)" }}>{m.r}</div>
                </div>
              ))}
            </div>
          }/>
          <Field label="활동 이력" last valueNode={
            <div style={{ position: "relative", paddingLeft: 14 }}>
              <div style={{ position: "absolute", left: 4, top: 6, bottom: 6, width: 1, background: "var(--dinga-line)" }}></div>
              {[
                { y: "2025", t: "EP <한남동 12-3> 발매" },
                { y: "2024", t: "갤러리 후암 단독 공연" },
                { y: "2023", t: "한남대 축제 메인 스테이지" },
              ].map((e, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 2 ? 8 : 0 }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: i === 0 ? "#D4A24C" : "#fff", border: "2px solid var(--dinga-green)", marginLeft: -14, marginTop: 4, flexShrink: 0 }}></div>
                  <div>
                    <div style={{ fontFamily: "var(--font-en)", fontSize: 10, color: "var(--dinga-sub)", letterSpacing: "0.08em" }}>{e.y}</div>
                    <div style={{ fontSize: 12, marginTop: 1 }}>{e.t}</div>
                  </div>
                </div>
              ))}
            </div>
          }/>
        </div>
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 28, left: 20, right: 20, display: "flex", gap: 8 }}>
      <button className="tappable" style={{
        width: 100, background: "#fff", color: "var(--dinga-ink)",
        border: "1px solid var(--dinga-line)", borderRadius: 14,
        padding: "14px 0", fontSize: 14, fontWeight: 500,
      }}>다시 분석</button>
      <button onClick={onSubmit} className="cta-dark tappable" style={{ flex: 1 }}>이대로 등록 →</button>
    </div>
  </>
);

const Field = ({ label, value, valueNode, last }) => (
  <div style={{
    padding: "10px 0",
    borderBottom: last ? "none" : "1px solid var(--dinga-line-soft)",
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontSize: 11, color: "var(--dinga-sub)", letterSpacing: "0.04em" }}>{label}</div>
      <svg className="tappable" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dinga-sub)" strokeWidth="1.6" strokeLinecap="round"><path d="M14 4l6 6L10 20H4v-6z"/></svg>
    </div>
    {value ? (
      <div style={{ fontSize: 15, fontWeight: 500, marginTop: 4 }}>{value}</div>
    ) : (
      <div style={{ marginTop: 6 }}>{valueNode}</div>
    )}
  </div>
);

// === Screen: venueMatch =========================================
const VENUES = [
  { name: "카페 산책",    dist: "1.2km", match: 96, photo: "#3F6B5A", reasons: ["플러그 4개 일치", "수용 30명", "잔잔한 무드"] },
  { name: "펍 모노톤",    dist: "0.8km", match: 88, photo: "#C66B5A", reasons: ["음향 시설", "주말 비어있음"] },
  { name: "갤러리 후암",  dist: "2.4km", match: 82, photo: "#D4A24C", reasons: ["분위기 매칭", "수용 40명"] },
  { name: "한남책방",     dist: "0.5km", match: 74, photo: "#A89BC4", reasons: ["잔잔한 무드"] },
];

const Screen_venueMatch = () => {
  const { nav, back, setModal, likedShows, toggleLike } = useDinga();

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--dinga-bg)", overflow: "hidden" }}>
      <StatusBar />

      <div style={{ position: "absolute", top: 64, left: 18, right: 18, display: "flex", justifyContent: "space-between" }}>
        <svg className="tappable" onClick={back} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A2B23" strokeWidth="1.8" strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
        <div style={{
          background: "#fff", border: "1px solid var(--dinga-line)",
          borderRadius: 999, padding: 3, display: "flex", gap: 2,
        }}>
          <div className="tappable" style={{ padding: "5px 14px", borderRadius: 999, fontSize: 11, fontWeight: 500, background: "var(--dinga-green)", color: "var(--dinga-cream)" }}>리스트</div>
          <div className="tappable" style={{ padding: "5px 14px", borderRadius: 999, fontSize: 11, color: "var(--dinga-sub)" }}>지도</div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 108, left: 24, right: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <AIPill />
          <span style={{ fontSize: 11, color: "var(--dinga-sub)" }}>Smart matching</span>
        </div>
        <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          이런 공간이 잘 맞아요
        </div>
        <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
          <span className="chip lavender" style={{ fontSize: 11, padding: "3px 9px" }}>어쿠스틱</span>
          <span className="chip lavender" style={{ fontSize: 11, padding: "3px 9px" }}>5인</span>
          <span className="chip lavender" style={{ fontSize: 11, padding: "3px 9px" }}>30명 수용</span>
          <span className="chip lavender" style={{ fontSize: 11, padding: "3px 9px" }}>잔잔한 무드</span>
        </div>
      </div>

      <div style={{ position: "absolute", top: 230, left: 20, right: 20, bottom: 92, overflow: "hidden", display: "flex", flexDirection: "column", gap: 12 }}>
        {VENUES.map((v, i) => {
          const venueId = `venue-${v.name}`;
          const liked = likedShows.includes(venueId);
          return (
            <div key={v.name} style={{
              background: "#fff", border: i === 0 ? "1.5px solid var(--dinga-green)" : "1px solid var(--dinga-line)",
              borderRadius: 16, padding: 12,
              display: "flex", gap: 12,
              position: "relative",
            }}>
              {i === 0 && (
                <div style={{ position: "absolute", top: -8, left: 14, background: "var(--dinga-green)", color: "var(--dinga-cream)", padding: "2px 8px", borderRadius: 999, fontSize: 9, fontWeight: 600, letterSpacing: "0.08em" }}>
                  BEST MATCH
                </div>
              )}
              <div style={{ width: 74, height: 74, borderRadius: 12, background: v.photo, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                <div className="noise" style={{ position: "absolute", inset: 0 }}></div>
                <svg viewBox="0 0 60 60" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
                  <path d="M5 50 L 20 25 L 30 38 L 45 18 L 55 50 Z" fill="#F5F1E8" opacity=".4"/>
                  <circle cx="48" cy="14" r="5" fill="#F5F1E8" opacity=".5"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>{v.name}</div>
                    <div style={{ fontSize: 11, color: "var(--dinga-sub)", marginTop: 2 }}>{v.dist} · 한남동</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-en)", fontSize: 22, fontWeight: 600, color: "var(--dinga-green)", lineHeight: 1 }}>{v.match}<span style={{ fontSize: 12 }}>%</span></div>
                    <div style={{ fontSize: 9, color: "var(--dinga-sub)", letterSpacing: "0.06em" }}>매칭률</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
                  {v.reasons.map(r => (
                    <span key={r} style={{
                      fontSize: 10, padding: "3px 7px", borderRadius: 999,
                      background: "rgba(212,162,76,0.14)", color: "#8C6722",
                      display: "inline-flex", alignItems: "center", gap: 3,
                    }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4"/></svg>
                      {r}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
                  <span className="tappable" onClick={() => toggleLike(venueId)}>
                    <Heart filled={liked} size={18}/>
                  </span>
                  <button onClick={() => setModal({ type: "venue-request", venue: v.name })} className="tappable" style={{
                    flex: 1,
                    background: i === 0 ? "var(--dinga-green)" : "var(--dinga-cream)",
                    color: i === 0 ? "var(--dinga-cream)" : "var(--dinga-green)",
                    border: "none", borderRadius: 10,
                    padding: "8px 12px", fontSize: 12, fontWeight: 600,
                  }}>
                    예약 요청
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", left: 20, right: 20, bottom: 24 }}>
        <button onClick={() => nav("promo")} className="cta-dark tappable">
          <Sparkle size={14} color="#F5F1E8"/>
          공연 홍보 작성하기
        </button>
      </div>
    </div>
  );
};

// === Screen: promo ==============================================
const TONE_TEXTS = {
  "캐주얼": {
    body: "한남동 골목길 작은 카페에서 한 잔!\n새벽두시가 11월 21일에 라이브 하러 가요 🎸\n드림팝 좋아하면 와요 ~~",
    tags: ["#대전인디", "#한남대공연", "#금요일밤", "#한남동", "#카페라이브", "#dinga"],
  },
  "감성": {
    body: "한남동 골목길에서 만나는 잔잔한 인디 라이브 ✨\n새벽두시의 드림팝 사운드가 카페 산책을 채웁니다.\n11.21 (목) 20:00 · ₩8,000 · 음료 한 잔 포함",
    tags: ["#대전인디", "#한남대공연", "#새벽두시", "#카페산책", "#드림팝", "#dinga"],
  },
  "정중함": {
    body: "안녕하세요, 새벽두시입니다.\n11월 21일 목요일 저녁 8시, 카페 산책에서 단독 라이브를 진행합니다.\n많은 관심 부탁드립니다.",
    tags: ["#새벽두시", "#대전공연", "#카페산책", "#11월공연", "#인디밴드", "#dinga"],
  },
  "위트있게": {
    body: "야 밴드 한다며? 응 카페에서 한다.\n11.21 (목) 밤 8시, 새벽두시가 한남동 골목을 흔들어 봅니다.\n안 오면 좀 서운할 것 같음 :)",
    tags: ["#대전인디", "#놓치면후회", "#카페라이브", "#새벽두시", "#한남대근처", "#dinga"],
  },
};

const Screen_promo = () => {
  const { back, selectedChannels, toggleChannel, selectedTone, setSelectedTone, setModal, showToast } = useDinga();
  const [fading, setFading] = React.useState(false);

  const channels = [
    { name: "인스타", icon: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></>, color: "#C66B5A" },
    { name: "블로그", icon: <><path d="M4 4h12l4 4v12H4z"/><path d="M8 11h8M8 15h6"/></>, color: "#2D4A3E" },
    { name: "뮬",     icon: <><circle cx="8" cy="17" r="3"/><circle cx="18" cy="14" r="3"/><path d="M11 17V5l10-2v11"/></>, color: "#D4A24C" },
    { name: "DINGA",  icon: <><path d="M12 2v13"/><circle cx="9" cy="17" r="3"/><path d="M20 6 12 9"/></>, color: "#3F6B5A" },
  ];

  const regen = () => {
    setFading(true);
    setTimeout(() => setFading(false), 700);
  };

  const tones = Object.keys(TONE_TEXTS);
  const current = TONE_TEXTS[selectedTone] || TONE_TEXTS["감성"];

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--dinga-bg)", overflow: "hidden" }}>
      <StatusBar />

      <div style={{ position: "absolute", top: 64, left: 18, right: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <svg className="tappable" onClick={back} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A2B23" strokeWidth="1.8" strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
        <div style={{ fontSize: 13, fontWeight: 500 }}>원클릭 홍보</div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--dinga-sub)" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 1.5-2 2-3 3.5M12 17v.5"/></svg>
      </div>

      <div style={{ position: "absolute", top: 110, left: 24, right: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <AIPill />
          <span style={{ fontSize: 11, color: "var(--dinga-sub)" }}>AI 카피라이터</span>
        </div>
        <div style={{ fontSize: 23, fontWeight: 600, marginTop: 8, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          이번 공연 홍보,<br/>
          <span className="scribble">한 번에 끝내요</span>
        </div>
      </div>

      <div style={{ position: "absolute", top: 230, left: 20, right: 20, bottom: 110, overflow: "hidden" }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--dinga-sub)", marginBottom: 8 }}>발행할 채널</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {channels.map(c => {
            const active = selectedChannels.includes(c.name);
            return (
              <div key={c.name}
                onClick={() => toggleChannel(c.name)}
                className="tappable"
                style={{
                  flex: 1,
                  background: active ? c.color : "#fff",
                  color: active ? "#F5F1E8" : "var(--dinga-sub)",
                  border: active ? `1px solid ${c.color}` : "1px solid var(--dinga-line)",
                  borderRadius: 12,
                  padding: "10px 6px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  transition: "all 0.2s ease",
                }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                <div style={{ fontSize: 10, fontWeight: 500 }}>{c.name}</div>
              </div>
            );
          })}
        </div>

        <div className="ai-border" style={{ borderRadius: 16 }}>
          <div className="inner" style={{ padding: 12, borderRadius: 14.5, opacity: fading ? 0.25 : 1, transition: "opacity 0.3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkle size={11} color="#2D4A3E"/>
                <div style={{ fontSize: 11, fontWeight: 500, color: "var(--dinga-green)" }}>AI 작성 미리보기</div>
              </div>
              <div style={{ fontSize: 10, color: "var(--dinga-sub)" }}>인스타 기준</div>
            </div>
            <div style={{
              marginTop: 8,
              fontSize: 13, lineHeight: 1.55, color: "var(--dinga-ink)",
              whiteSpace: "pre-line",
              fontFamily: "var(--font-kr)",
            }}>
              {current.body}
            </div>
            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
              {current.tags.map(h => (
                <span key={h} style={{ fontSize: 11, color: "#2D4A3E", background: "rgba(45,74,62,0.07)", padding: "2px 7px", borderRadius: 999 }}>{h}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--dinga-sub)", marginTop: 14, marginBottom: 8 }}>톤 선택</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tones.map(t => (
            <span key={t} onClick={() => setSelectedTone(t)} className={`chip ${selectedTone === t ? "active" : ""}`}>
              {t}
            </span>
          ))}
        </div>

        <div onClick={regen} className="tappable" style={{ marginTop: 14, fontSize: 12, color: "var(--dinga-green)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/></svg>
          다시 생성
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 28, left: 20, right: 20 }}>
        <button onClick={() => {
          if (selectedChannels.length === 0) { showToast("발행할 채널을 1개 이상 골라주세요"); return; }
          setModal({ type: "publish-success", count: selectedChannels.length });
        }} className="cta-dark tappable">
          <Sparkle size={14} color="#F5F1E8"/>
          지금 발행하기 · {selectedChannels.length}개 채널
        </button>
      </div>
    </div>
  );
};

Object.assign(window, { Screen_aiRefine, Screen_venueMatch, Screen_promo });
