/* eslint-disable */
// =================================================================
// Audience screens — genres, home, map/cal, detail, booked
// =================================================================

const Heart = ({ filled, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={filled ? "#C66B5A" : "none"}
    stroke={filled ? "#C66B5A" : "currentColor"}
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const PlayIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
);

const PauseIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
);

const PosterArt = ({ tone = "green", title = "", subtitle = "", style }) => {
  const palettes = {
    green:    { bg: "#2D4A3E", fg: "#F5F1E8", accent: "#D4A24C" },
    cream:    { bg: "#F5F1E8", fg: "#2D4A3E", accent: "#C66B5A" },
    coral:    { bg: "#C66B5A", fg: "#F5F1E8", accent: "#2D4A3E" },
    lavender: { bg: "#A89BC4", fg: "#F5F1E8", accent: "#D4A24C" },
    dark:     { bg: "#1F3329", fg: "#F5F1E8", accent: "#D4A24C" },
  };
  const p = palettes[tone] || palettes.green;
  return (
    <div className="poster" style={{ background: p.bg, color: p.fg, ...style }}>
      <div className="noise"></div>
      <svg viewBox="0 0 200 240" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
        <circle cx="40" cy="60" r="50" fill={p.accent} opacity=".7"/>
        <circle cx="160" cy="180" r="64" fill="none" stroke={p.fg} strokeWidth="1.5" opacity=".4"/>
        <path d="M30 200 Q 100 120 180 200" stroke={p.fg} strokeWidth="1.5" fill="none" opacity=".35"/>
        <path d="M20 30 L 60 30" stroke={p.fg} strokeWidth="1" opacity=".5"/>
      </svg>
      <div style={{ position: "absolute", left: 12, right: 12, bottom: 12 }}>
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 24, lineHeight: 1, color: p.fg }}>{title}</div>
        <div style={{ fontSize: 10, opacity: 0.75, marginTop: 2, letterSpacing: "0.06em", textTransform: "uppercase" }}>{subtitle}</div>
      </div>
    </div>
  );
};

const TabBar = ({ active = "home" }) => {
  const { nav, showToast } = useDinga();
  const tabs = [
    { k: "home", label: "홈", icon: <path d="M3 12l9-9 9 9v9a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2v-9z"/>, action: () => nav("home") },
    { k: "map",  label: "지도", icon: <><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></>, action: () => nav("mapCal") },
    { k: "cal",  label: "캘린더", icon: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>, action: () => nav("mapCal") },
    { k: "fav",  label: "찜", icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>, action: () => showToast("찜 목록 · 곧 만나요") },
    { k: "me",   label: "마이", icon: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>, action: () => showToast("마이페이지 · 준비 중") },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => (
        <div key={t.k} className={`tab tappable ${active === t.k ? "active" : ""}`} onClick={t.action}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{t.icon}</svg>
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  );
};

// === Screen: genrePref ==========================================
const Screen_genrePref = () => {
  const { nav, back, selectedGenres, toggleGenre, selectedMoods, toggleMood, selectedRegions, toggleRegion } = useDinga();
  const genres = ["인디록", "어쿠스틱", "신스팝", "시티팝", "재즈", "포크", "일렉트로닉", "펑크"];
  const moods = ["잔잔한", "감성적", "뜨거운", "신나는"];
  const regions = ["한남대", "유성", "둔산", "구도심"];
  const totalSelected = selectedGenres.length;

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--dinga-bg)", overflow: "hidden" }}>
      <StatusBar />

      <div style={{ position: "absolute", top: 64, left: 18, right: 18, display: "flex", alignItems: "center", gap: 12 }}>
        <svg className="tappable" onClick={back} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A2B23" strokeWidth="1.8" strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
        <div style={{ flex: 1, height: 4, borderRadius: 999, background: "var(--dinga-line-soft)", overflow: "hidden" }}>
          <div style={{ width: "75%", height: "100%", background: "var(--dinga-green)", borderRadius: 999 }}></div>
        </div>
        <div style={{ fontFamily: "var(--font-en)", fontSize: 12, color: "var(--dinga-sub)" }}>3/4</div>
      </div>

      <div style={{ position: "absolute", top: 110, left: 24, right: 24 }}>
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 22, color: "var(--dinga-mustard)" }}>tell us</div>
        <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3, marginTop: 2 }}>
          어떤 음악이 좋으세요?
        </div>
        <div style={{ fontSize: 13, color: "var(--dinga-sub)", marginTop: 6 }}>
          여러 개 골라도 괜찮아요
        </div>
      </div>

      <div style={{ position: "absolute", top: 220, left: 24, right: 24, bottom: 110, overflow: "hidden" }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--dinga-ink)", marginBottom: 10 }}>
          장르 <span style={{ color: "var(--dinga-sub)", fontWeight: 400 }}>· {totalSelected} 선택</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {genres.map(g => (
            <span key={g}
              className={`chip ${selectedGenres.includes(g) ? "active" : ""}`}
              onClick={() => toggleGenre(g)}>{g}</span>
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 500, marginTop: 22, marginBottom: 10 }}>분위기</div>
        <div style={{
          background: "var(--dinga-surface)", border: "1px solid var(--dinga-line)",
          borderRadius: 14, padding: "14px 16px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--dinga-sub)", marginBottom: 8 }}>
            <span>잔잔한</span><span>뜨거운</span>
          </div>
          <div style={{ position: "relative", height: 6, borderRadius: 999, background: "var(--dinga-line-soft)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: 6, width: "32%", borderRadius: 999, background: "var(--dinga-green)" }}></div>
            <div style={{
              position: "absolute", left: "32%", top: -7,
              width: 20, height: 20, borderRadius: "50%",
              background: "#fff", border: "2px solid var(--dinga-green)",
              transform: "translateX(-50%)",
              boxShadow: "0 2px 6px rgba(45,74,62,0.18)",
            }}></div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          {moods.map(m => (
            <span key={m}
              className={`chip ${selectedMoods.includes(m) ? "active" : ""}`}
              onClick={() => toggleMood(m)}>{m}</span>
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 500, marginTop: 22, marginBottom: 10 }}>
          활동 지역 <span style={{ color: "var(--dinga-sub)", fontWeight: 400 }}>· 대전</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {regions.map(r => (
            <span key={r}
              className={`chip ${selectedRegions.includes(r) ? "active" : ""}`}
              onClick={() => toggleRegion(r)}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 22s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z"/></svg>
              {r}
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 28, left: 20, right: 20 }}>
        <button className="cta-dark tappable" onClick={() => nav("home")}>다음 →</button>
      </div>
    </div>
  );
};

// === Screen: home ===============================================
const SHOWS = {
  santokki:    { id: "show-santokki",    name: "산토끼클럽",      tone: "green",    sub: "Sundown set",       tags: ["잔잔한","포크"],  price: "₩8,000",  dist: "0.4km", venue: "카페 산책", reason: "당신이 좋아한 새벽두시와 비슷한 결" },
  deermocha:   { id: "show-deermocha",   name: "디어모카",        tone: "coral",    sub: "Live at 후암",      tags: ["어쿠스틱"],       price: "₩10,000", dist: "1.2km", venue: "갤러리 후암", reason: "주말 저녁 자주 듣던 무드" },
  veranda:     { id: "show-veranda",     name: "베란다소년단",     tone: "lavender", sub: "Demo show",         tags: ["인디록"],         price: "₩7,000",  dist: "2.1km", venue: "펍 모노톤",  reason: "신스팝 좋아하시면 강추" },
  saebyeok:    { id: "show-saebyeok",    name: "새벽두시",        tone: "dark",     sub: "한남동 12-3",       tags: ["드림팝"],         price: "₩9,000",  dist: "0.6km", venue: "카페 산책", reason: "내일 밤 라이브" },
  golmok:      { id: "show-golmok",      name: "골목라디오",       tone: "cream",    sub: "8월의 골목길",      tags: ["포크"],           price: "₩6,000",  dist: "1.5km", venue: "펍 모노톤",  reason: "오늘 9시 30분 시작" },
};

const Screen_home = () => {
  const { nav, likedShows, toggleLike } = useDinga();
  const recs = [SHOWS.santokki, SHOWS.deermocha, SHOWS.veranda];
  const tonight = [SHOWS.saebyeok, SHOWS.golmok];
  const newBands = ["산토끼클럽", "디어모카", "베란다소년단", "새벽두시", "골목라디오", "노을공원"];

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--dinga-bg)", overflow: "hidden" }}>
      <StatusBar />

      <div style={{ position: "absolute", top: 60, left: 20, right: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, color: "var(--dinga-sub)" }}>안녕하세요,</div>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 6 }}>
              리슨님 <Sparkle size={14} color="#D4A24C"/>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="tappable" style={{ width: 38, height: 38, borderRadius: 12, background: "#fff", border: "1px solid var(--dinga-line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2B23" strokeWidth="1.6"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div className="tappable" style={{ position: "relative", width: 38, height: 38, borderRadius: 12, background: "#fff", border: "1px solid var(--dinga-line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2B23" strokeWidth="1.6"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>
              <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: "#C66B5A", border: "2px solid #fff" }}></div>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 16, background: "#fff", border: "1px solid var(--dinga-line)",
          borderRadius: 14, padding: "11px 14px",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--dinga-sub)" strokeWidth="1.7"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <div style={{ fontSize: 13, color: "var(--dinga-sub)" }}>밴드, 공간, 분위기로 찾기</div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 188, left: 0, right: 0, bottom: 84, overflow: "hidden" }}>
        <div style={{ padding: "8px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>당신을 위한 추천</div>
              <AIPill />
            </div>
            <div style={{ fontSize: 12, color: "var(--dinga-sub)", marginTop: 3 }}>오늘 밤 갈만한 라이브 3</div>
          </div>
          <div style={{ fontSize: 12, color: "var(--dinga-sub)" }}>더보기 ›</div>
        </div>
        <div style={{ display: "flex", gap: 12, padding: "12px 20px", overflowX: "hidden" }}>
          {recs.map(r => (
            <div key={r.id}
              className="tappable"
              onClick={() => nav("detail")}
              style={{ width: 200, flexShrink: 0 }}>
              <PosterArt tone={r.tone} title={r.name} subtitle={r.sub} style={{ width: 200, height: 240, borderRadius: 16 }} />
              <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                {r.tags.map(t => <span key={t} className="chip mustard" style={{ fontSize: 11, padding: "3px 8px" }}>{t}</span>)}
                <span className="chip" style={{ fontSize: 11, padding: "3px 8px" }}>{r.dist}</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 13, fontWeight: 500 }}>{r.name}</div>
              <div style={{ marginTop: 2, fontSize: 11, color: "var(--dinga-sub)", display: "flex", alignItems: "center", gap: 4 }}>
                <Sparkle size={9} color="#D4A24C"/> {r.reason}
              </div>
              <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, color: "var(--dinga-green)" }}>{r.price}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "14px 20px 0" }}>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>오늘 동네 라이브</div>
        </div>
        <div style={{ padding: "10px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
          {tonight.map(l => (
            <div key={l.id}
              className="tappable"
              onClick={() => nav("detail")}
              style={{
                display: "flex", gap: 12, alignItems: "center",
                background: "#fff", border: "1px solid var(--dinga-line)",
                borderRadius: 14, padding: 10,
              }}>
              <PosterArt tone={l.tone} title={l.name} subtitle={l.venue} style={{ width: 64, height: 64, borderRadius: 10, flexShrink: 0 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{l.name}</div>
                <div style={{ fontSize: 12, color: "var(--dinga-sub)", marginTop: 2 }}>{l.venue} · {l.reason}</div>
                <div style={{ marginTop: 4, display: "flex", gap: 4 }}>
                  {l.tags.slice(0, 2).map(t => <span key={t} className="chip cream" style={{ fontSize: 10, padding: "2px 7px" }}>{t}</span>)}
                </div>
              </div>
              <span onClick={(e) => { e.stopPropagation(); toggleLike(l.id); }}>
                <Heart filled={likedShows.includes(l.id)} size={20}/>
              </span>
            </div>
          ))}
        </div>

        <div style={{ padding: "8px 20px 0" }}>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>이번주 신규 등록 밴드</div>
        </div>
        <div style={{ display: "flex", gap: 12, padding: "10px 20px" }}>
          {newBands.slice(0, 5).map((n, i) => (
            <div key={i} className="tappable" style={{ width: 60, flexShrink: 0, textAlign: "center" }}>
              <div style={{
                width: 58, height: 58, borderRadius: "50%",
                background: ["#2D4A3E", "#A89BC4", "#D4A24C", "#C66B5A", "#3F6B5A"][i],
                color: "#F5F1E8",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-hand)", fontSize: 22,
                border: "2px solid #fff",
                boxShadow: "0 0 0 2px " + ["#2D4A3E", "#A89BC4", "#D4A24C", "#C66B5A", "#3F6B5A"][i] + "33",
              }}>{n[0]}</div>
              <div style={{ fontSize: 10, marginTop: 5, color: "var(--dinga-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n}</div>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="home" />
    </div>
  );
};

// === Screen: mapCal =============================================
const Screen_mapCal = () => {
  const { nav } = useDinga();
  const [view, setView] = React.useState("map");

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--dinga-bg)", overflow: "hidden" }}>
      <StatusBar />

      <div style={{ position: "absolute", top: 64, left: 20, right: 20, display: "flex", justifyContent: "center" }}>
        <div style={{
          background: "#fff", border: "1px solid var(--dinga-line)",
          borderRadius: 999, padding: 4, display: "flex", gap: 2,
          boxShadow: "0 2px 8px rgba(45,74,62,0.08)",
        }}>
          <div onClick={() => setView("map")} className="tappable"
            style={{
              padding: "8px 22px", borderRadius: 999, fontSize: 13, fontWeight: 500,
              background: view === "map" ? "var(--dinga-green)" : "transparent",
              color: view === "map" ? "var(--dinga-cream)" : "var(--dinga-sub)",
              transition: "all 0.2s ease",
            }}>지도</div>
          <div onClick={() => setView("cal")} className="tappable"
            style={{
              padding: "8px 22px", borderRadius: 999, fontSize: 13, fontWeight: 500,
              background: view === "cal" ? "var(--dinga-green)" : "transparent",
              color: view === "cal" ? "var(--dinga-cream)" : "var(--dinga-sub)",
              transition: "all 0.2s ease",
            }}>캘린더</div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 122, left: 0, right: 0, display: "flex", gap: 8, padding: "0 20px", overflowX: "hidden" }}>
        <span className="chip active">오늘</span>
        <span className="chip">이번주</span>
        <span className="chip">이번달</span>
        <span className="chip">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M7 12h10M11 18h2"/></svg>
          장르
        </span>
      </div>

      {view === "map" ? <MapView nav={nav} /> : <CalendarView nav={nav} />}

      <TabBar active={view === "map" ? "map" : "cal"} />
    </div>
  );
};

const MapView = ({ nav }) => (
  <>
    <div style={{
      position: "absolute", top: 168, left: 0, right: 0, bottom: 290,
      background: "linear-gradient(180deg, #EFEDE3 0%, #E6E3D8 100%)",
      overflow: "hidden",
      animation: "screenIn 240ms ease-out both",
    }}>
      <svg viewBox="0 0 390 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path d="M0 120 C 100 80 200 200 390 140" stroke="#D4D0BD" strokeWidth="20" fill="none"/>
        <path d="M0 120 C 100 80 200 200 390 140" stroke="#E6E3D8" strokeWidth="18" fill="none" strokeDasharray="2 6"/>
        <path d="M80 0 L 120 400" stroke="#D4D0BD" strokeWidth="3" fill="none"/>
        <path d="M250 0 L 280 400" stroke="#D4D0BD" strokeWidth="3" fill="none"/>
        <path d="M0 260 L 390 240" stroke="#D4D0BD" strokeWidth="3" fill="none"/>
        <path d="M0 320 Q 180 280 390 340" stroke="#A89BC4" strokeWidth="14" fill="none" opacity=".35"/>
        <circle cx="310" cy="100" r="46" fill="#3F6B5A" opacity=".18"/>
        <text x="310" y="105" textAnchor="middle" fontSize="9" fill="#3F6B5A" opacity=".7" fontFamily="Pretendard">한밭수목원</text>
      </svg>

      <Pin x={70} y={70} count="3" active />
      <Pin x={180} y={130} count="2" />
      <Pin x={140} y={210} count="5" highlight />
      <Pin x={290} y={180} count="1" />
      <Pin x={240} y={70} count="1" />

      <div style={{
        position: "absolute", left: 56, top: 240,
        width: 18, height: 18, borderRadius: "50%",
        background: "#1570EF", border: "3px solid #fff",
        boxShadow: "0 0 0 6px rgba(21,112,239,0.2)",
      }}></div>

      <div className="tappable" style={{
        position: "absolute", right: 16, bottom: 18,
        width: 42, height: 42, borderRadius: 12, background: "#fff",
        border: "1px solid var(--dinga-line)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D4A3E" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>
      </div>
    </div>

    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 84,
      background: "#fff",
      borderTopLeftRadius: 24, borderTopRightRadius: 24,
      padding: "12px 20px 18px",
      boxShadow: "0 -8px 24px rgba(45,74,62,0.08)",
      animation: "modalIn 280ms cubic-bezier(0.22,0.61,0.36,1) both",
    }}>
      <div style={{ width: 40, height: 4, borderRadius: 999, background: "var(--dinga-line)", margin: "0 auto 10px" }}></div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>한남대 인근 · 5건의 라이브</div>
        <div style={{ fontSize: 11, color: "var(--dinga-sub)" }}>오늘</div>
      </div>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { name: "산토끼클럽", venue: "카페 산책", time: "20:00", price: "₩8,000", tone: "green" },
          { name: "디어모카",   venue: "갤러리 후암", time: "21:30", price: "₩10,000", tone: "coral" },
        ].map((l, i) => (
          <div key={i} className="tappable" onClick={() => nav("detail")}
            style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <PosterArt tone={l.tone} title={l.name} subtitle="" style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{l.name}</div>
              <div style={{ fontSize: 11, color: "var(--dinga-sub)", marginTop: 2 }}>{l.venue} · {l.time}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--dinga-green)" }}>{l.price}</div>
          </div>
        ))}
      </div>
    </div>
  </>
);

const CalendarView = ({ nav }) => {
  const [selectedDay, setSelectedDay] = React.useState(21);
  const days = [];
  // simplified november grid; offset 5 (starts on friday)
  for (let i = 0; i < 35; i++) {
    const d = i - 4;
    days.push(d > 0 && d <= 30 ? d : null);
  }
  const eventDays = [4, 7, 11, 14, 18, 21, 25, 28];

  return (
    <>
      <div style={{ position: "absolute", top: 168, left: 20, right: 20, animation: "screenIn 240ms ease-out both" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>2025 · 11월</div>
          <div style={{ display: "flex", gap: 6 }}>
            <div className="tappable" style={{ width: 28, height: 28, borderRadius: 8, background: "#fff", border: "1px solid var(--dinga-line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A2B23" strokeWidth="2"><path d="M15 6l-6 6 6 6"/></svg>
            </div>
            <div className="tappable" style={{ width: 28, height: 28, borderRadius: 8, background: "#fff", border: "1px solid var(--dinga-line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A2B23" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, fontSize: 11, color: "var(--dinga-sub)", marginBottom: 6 }}>
          {["일","월","화","수","목","금","토"].map(w => <div key={w} style={{ textAlign: "center" }}>{w}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {days.map((d, i) => (
            <div key={i} className={d ? "tappable" : ""} onClick={() => d && setSelectedDay(d)}
              style={{
                aspectRatio: "1", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 500,
                color: !d ? "transparent" : selectedDay === d ? "var(--dinga-cream)" : "var(--dinga-ink)",
                background: selectedDay === d ? "var(--dinga-green)" : "transparent",
                borderRadius: 10, position: "relative",
              }}>
              {d}
              {d && eventDays.includes(d) && (
                <div style={{
                  position: "absolute", bottom: 5,
                  width: 4, height: 4, borderRadius: "50%",
                  background: selectedDay === d ? "#D4A24C" : "#C66B5A",
                }}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 84, top: 480,
        background: "#fff",
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: "16px 20px 18px",
        boxShadow: "0 -8px 24px rgba(45,74,62,0.08)",
        overflow: "hidden",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>11월 {selectedDay}일 · 2건</div>
          <div style={{ fontFamily: "var(--font-hand)", fontSize: 18, color: "var(--dinga-mustard)" }}>thursday</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { name: "산토끼클럽", venue: "카페 산책", time: "20:00", tone: "green" },
            { name: "디어모카",   venue: "갤러리 후암", time: "21:30", tone: "coral" },
          ].map((l, i) => (
            <div key={i} className="tappable" onClick={() => nav("detail")}
              style={{ display: "flex", gap: 10, alignItems: "center",
                background: "var(--dinga-bg)", border: "1px solid var(--dinga-line)",
                borderRadius: 12, padding: 8 }}>
              <PosterArt tone={l.tone} title={l.name} subtitle="" style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{l.name}</div>
                <div style={{ fontSize: 11, color: "var(--dinga-sub)", marginTop: 2 }}>{l.venue}</div>
              </div>
              <div style={{ fontFamily: "var(--font-en)", fontSize: 13, fontWeight: 600, color: "var(--dinga-green)" }}>{l.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Pin = ({ x, y, count, active, highlight }) => {
  const bg = active ? "#2D4A3E" : highlight ? "#D4A24C" : "#fff";
  const fg = active || highlight ? "#F5F1E8" : "#2D4A3E";
  return (
    <div className="tappable" style={{
      position: "absolute", left: x, top: y,
      transform: "translate(-50%, -100%)",
    }}>
      <div style={{
        background: bg, color: fg,
        minWidth: 30, height: 30, borderRadius: 999, padding: "0 8px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        fontSize: 12, fontWeight: 600,
        border: "2px solid #fff",
        boxShadow: "0 3px 8px rgba(0,0,0,0.18)",
      }}>
        ♪ {count}
      </div>
      <div style={{ width: 0, height: 0, margin: "-2px auto 0", borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `8px solid ${bg}` }}></div>
    </div>
  );
};

// === Screen: detail =============================================
const Screen_detail = () => {
  const { nav, back, likedShows, toggleLike } = useDinga();
  const [playing, setPlaying] = React.useState(false);
  const showId = "show-santokki";
  const liked = likedShows.includes(showId);

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--dinga-bg)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 360 }}>
        <PosterArt tone="green" title="산토끼클럽" subtitle="Sundown set · vol. 04" style={{ width: "100%", height: "100%" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(31,51,41,0.85) 100%)" }}></div>
        <StatusBar light />

        <div style={{ position: "absolute", top: 62, left: 18, right: 18, display: "flex", justifyContent: "space-between", color: "#F5F1E8" }}>
          <div className="tappable" onClick={back} style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div className="tappable" onClick={() => toggleLike(showId)} style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart filled={liked} size={18}/>
            </div>
            <div className="tappable" style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", left: "50%", top: 200, transform: "translateX(-50%)" }}>
          <div className="ai-border tappable" onClick={() => setPlaying(p => !p)} style={{ borderRadius: 999 }}>
            <div className="inner" style={{
              background: "rgba(31,51,41,0.7)", color: "#F5F1E8",
              padding: "10px 16px 10px 14px", borderRadius: 999,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#D4A24C", color: "#1F3329", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {playing ? <PauseIcon size={14}/> : <PlayIcon size={14}/>}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{playing ? "재생 중 · 00:08" : "30초 미리듣기"}</div>
                <div style={{ fontSize: 10, opacity: 0.8, display: "flex", alignItems: "center", gap: 4 }}>
                  <Sparkle size={9} color="#D4A24C"/> AI가 대표 구간 추출
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", left: 20, right: 20, bottom: 16, color: "#F5F1E8" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span className="chip cream" style={{ fontSize: 10, padding: "2px 7px" }}>잔잔한</span>
            <span className="chip cream" style={{ fontSize: 10, padding: "2px 7px" }}>포크</span>
            <span className="chip cream" style={{ fontSize: 10, padding: "2px 7px" }}>5인</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em" }}>산토끼클럽</div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4A24C"><path d="M9 12l2 2 4-4M12 2l2.4 1.8 3 .2.2 3L20 9.6l-1.4 2.4.4 3-3 .2-1.8 3L12 17.4 9.6 19l-3-.2-.2-3L4 14.4l1.4-2.4-.4-3 3-.2 1.8-3z"/></svg>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 360, left: 0, right: 0, bottom: 96, overflow: "hidden" }}>
        <div style={{ margin: "16px 20px 0", background: "#fff", border: "1px solid var(--dinga-line)", borderRadius: 16, padding: 14 }}>
          <Row icon="cal" label="일시" value="11월 21일 (목) · 20:00"/>
          <Row icon="pin" label="장소" value="카페 산책 · 한남대 정문 4분"/>
          <Row icon="won" label="가격" value="₩8,000 · 음료 1잔 포함" last/>
        </div>

        <div style={{ margin: "14px 20px 0" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>밴드 소개</div>
          <div style={{ fontSize: 12, color: "var(--dinga-sub)", lineHeight: 1.55 }}>
            대전 인디씬 5인조 어쿠스틱 밴드. 새벽 카페에서 듣고 싶은 잔잔한 포크 사운드를 추구합니다.
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            {["산", "리", "노", "준"].map((n, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: ["#2D4A3E","#A89BC4","#D4A24C","#C66B5A"][i], color: "#F5F1E8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-hand)", fontSize: 20 }}>{n}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: "14px 20px 0" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>대표곡</div>
          {[
            { t: "여름 끝물 한 시간", d: "3:42" },
            { t: "한남동 비가 와", d: "4:08" },
            { t: "산책로의 가로등", d: "3:21" },
          ].map((s, i) => (
            <div key={i} className="tappable" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 2 ? "1px solid var(--dinga-line-soft)" : "none" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--dinga-cream)", color: "var(--dinga-green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PlayIcon size={12}/>
              </div>
              <div style={{ flex: 1, fontSize: 13 }}>{s.t}</div>
              <div style={{ fontSize: 11, color: "var(--dinga-sub)" }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "var(--dinga-green)", padding: "14px 20px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(245,241,232,0.6)" }}>총 결제</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#F5F1E8" }}>₩8,000</div>
          </div>
          <button className="cta-cream tappable" onClick={() => nav("booked")} style={{ flex: 1 }}>예매하기</button>
        </div>
      </div>
    </div>
  );
};

const Row = ({ icon, label, value, last }) => {
  const icons = {
    cal: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    pin: <><circle cx="12" cy="10" r="3"/><path d="M12 22s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z"/></>,
    won: <><path d="M5 5l3 10 4-8 4 8 3-10M3 11h18M3 14h18"/></>,
  };
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "8px 0",
      borderBottom: last ? "none" : "1px solid var(--dinga-line-soft)",
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: "var(--dinga-cream)", color: "var(--dinga-green)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icons[icon]}</svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: "var(--dinga-sub)" }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 500, marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
};

// === Screen: booked =============================================
const Screen_booked = () => {
  const { nav, showToast } = useDinga();
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--dinga-green) 0%, #1F3329 100%)", overflow: "hidden", color: "var(--dinga-cream)" }}>
      <StatusBar light />

      <div style={{ position: "absolute", top: 86, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ display: "inline-block", position: "relative" }}>
          <div style={{
            width: 84, height: 84, borderRadius: "50%",
            background: "rgba(245,241,232,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #D4A24C",
            animation: "modalIn 480ms cubic-bezier(0.22,0.61,0.36,1) both",
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5 9-10" style={{ strokeDasharray: 30, strokeDashoffset: 0, animation: "drawCheck 600ms ease-out 200ms both" }}/>
            </svg>
          </div>
          <Sparkle size={14} color="#D4A24C" style={{ position: "absolute", top: -8, right: -14 }}/>
          <Sparkle size={10} color="#D4A24C" style={{ position: "absolute", bottom: -4, left: -16 }}/>
        </div>
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 36, marginTop: 12, color: "#D4A24C" }}>see you there!</div>
        <div style={{ fontSize: 14, marginTop: 2, color: "rgba(245,241,232,0.75)" }}>예매가 완료됐어요</div>
      </div>

      <div style={{ position: "absolute", left: 24, right: 24, top: 295 }}>
        <Ticket />
      </div>

      <div style={{ position: "absolute", left: 24, right: 24, bottom: 95, display: "flex", gap: 10 }}>
        <button onClick={() => showToast("애플 캘린더에 추가됐어요")} className="tappable" style={{
          flex: 1, background: "rgba(245,241,232,0.1)", color: "#F5F1E8",
          border: "1px solid rgba(245,241,232,0.3)", borderRadius: 14,
          padding: "13px 12px", fontSize: 13, fontWeight: 500,
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M12 14v4M10 16h4"/></svg>
          캘린더 추가
        </button>
        <button onClick={() => showToast("공유 링크를 복사했어요")} className="tappable" style={{
          flex: 1, background: "rgba(245,241,232,0.1)", color: "#F5F1E8",
          border: "1px solid rgba(245,241,232,0.3)", borderRadius: 14,
          padding: "13px 12px", fontSize: 13, fontWeight: 500,
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>
          공유
        </button>
      </div>

      <div style={{ position: "absolute", left: 24, right: 24, bottom: 36 }}>
        <button onClick={() => nav("home")} className="tappable" style={{
          width: "100%", background: "#F5F1E8", color: "#2D4A3E",
          border: "none", borderRadius: 14,
          padding: "14px 16px", fontSize: 15, fontWeight: 600,
        }}>홈으로</button>
      </div>
    </div>
  );
};

const Ticket = () => (
  <div style={{ position: "relative" }}>
    <svg viewBox="0 0 342 380" width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: "block" }}>
      <defs>
        <pattern id="ticketDots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="rgba(45,74,62,0.15)"/>
        </pattern>
      </defs>
      <path d="M16 0 H 326 A 16 16 0 0 1 342 16 V 230 A 8 8 0 0 0 334 238 A 8 8 0 0 0 342 246 V 364 A 16 16 0 0 1 326 380 H 16 A 16 16 0 0 1 0 364 V 246 A 8 8 0 0 0 8 238 A 8 8 0 0 0 0 230 V 16 A 16 16 0 0 1 16 0 Z" fill="#F5F1E8"/>
      {[...Array(12)].map((_, i) => <circle key={i} cx={20 + i * 28} cy={238} r="1.5" fill="rgba(45,74,62,0.3)"/>)}
      <rect x="0" y="0" width="342" height="6" fill="#D4A24C"/>
      <rect x="0" y="0" width="342" height="380" fill="url(#ticketDots)" opacity=".4"/>
    </svg>

    <div style={{ position: "absolute", inset: 0, padding: "22px 22px 22px", color: "#2D4A3E", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "var(--font-en)", fontSize: 10, letterSpacing: "0.2em", color: "#6B7D74" }}>DINGA · LIVE TICKET</div>
          <div style={{ fontSize: 19, fontWeight: 600, marginTop: 6, letterSpacing: "-0.01em" }}>산토끼클럽</div>
          <div style={{ fontSize: 12, color: "#6B7D74", marginTop: 2 }}>Sundown set · vol. 04</div>
        </div>
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 28, color: "#C66B5A", transform: "rotate(-4deg)" }}>#A04</div>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 24 }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: "0.16em", color: "#6B7D74" }}>DATE</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>11.21 THU</div>
          <div style={{ fontSize: 11, color: "#6B7D74", marginTop: 2 }}>20:00</div>
        </div>
        <div>
          <div style={{ fontSize: 9, letterSpacing: "0.16em", color: "#6B7D74" }}>VENUE</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>카페 산책</div>
          <div style={{ fontSize: 11, color: "#6B7D74", marginTop: 2 }}>한남동 12-3</div>
        </div>
        <div>
          <div style={{ fontSize: 9, letterSpacing: "0.16em", color: "#6B7D74" }}>SEAT</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>입장권</div>
          <div style={{ fontSize: 11, color: "#6B7D74", marginTop: 2 }}>자유석</div>
        </div>
      </div>

      <div style={{ position: "absolute", left: 22, right: 22, top: 252, display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ width: 96, height: 96, background: "#fff", borderRadius: 6, padding: 6 }}>
          <svg viewBox="0 0 84 84" style={{ width: "100%", height: "100%" }}>
            {qrCells.map(([x, y], i) => <rect key={i} x={x*7} y={y*7} width="7" height="7" fill="#1A2B23"/>)}
            <rect x="0" y="0" width="21" height="21" fill="none" stroke="#1A2B23" strokeWidth="4"/>
            <rect x="6" y="6" width="9" height="9" fill="#1A2B23"/>
            <rect x="63" y="0" width="21" height="21" fill="none" stroke="#1A2B23" strokeWidth="4"/>
            <rect x="69" y="6" width="9" height="9" fill="#1A2B23"/>
            <rect x="0" y="63" width="21" height="21" fill="none" stroke="#1A2B23" strokeWidth="4"/>
            <rect x="6" y="69" width="9" height="9" fill="#1A2B23"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.16em", color: "#6B7D74" }}>ENTRY CODE</div>
          <div style={{ fontFamily: "var(--font-en)", fontSize: 17, fontWeight: 600, marginTop: 3, letterSpacing: "0.06em" }}>DG-2126-A04</div>
          <div style={{ fontSize: 11, color: "#6B7D74", marginTop: 6, lineHeight: 1.5 }}>
            공연 시작 15분 전 도착<br/>
            입구에서 코드 인증 후 입장
          </div>
        </div>
      </div>
    </div>
  </div>
);

const qrCells = (() => {
  const out = [];
  let s = 7;
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 12; x++) {
      if ((x < 3 && y < 3) || (x > 8 && y < 3) || (x < 3 && y > 8)) continue;
      s = (s * 9301 + 49297) % 233280;
      if ((s % 100) < 45) out.push([x, y]);
    }
  }
  return out;
})();

Object.assign(window, { Screen_genrePref, Screen_home, Screen_mapCal, Screen_detail, Screen_booked, TabBar, PosterArt, Heart, PlayIcon });
