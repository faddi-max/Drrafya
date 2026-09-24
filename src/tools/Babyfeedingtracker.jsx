import React, { useState, useEffect, useRef, useMemo } from 'react';
import './BabyFeedingTracker.css';

const STORAGE_KEY = 'bft_entries_v3';
const TIMER_KEY = 'bft_active_timer_v3';
const PROFILE_KEY = 'bft_profile_v3';

function safeGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function safeSet(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    /* storage unavailable — tracker still works for this session */
  }
}

function formatClock(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
function formatTimeOfDay(ts) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
function timeAgo(ts) {
  const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (diffSec < 60) return 'just now';
  const min = Math.floor(diffSec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  const remMin = min % 60;
  if (hr < 24) return remMin ? `${hr}h ${remMin}m ago` : `${hr}h ago`;
  return `${Math.floor(hr / 24)}d ago`;
}
function isSameDay(ts, ref) {
  const a = new Date(ts), b = new Date(ref);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function dayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/* ---- Icons ---- */
const DropletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C12 3 18 11 18 15.2C18 18.4 15.3 21 12 21C8.7 21 6 18.4 6 15.2C6 11 12 3 12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);
const BottleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="7.5" width="8" height="13" rx="2.4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9.6 7.5V4.8C9.6 3.9 10.3 3.2 11.2 3.2H12.8C13.7 3.2 14.4 3.9 14.4 4.8V7.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const DiaperIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 7H20.5V12.5C20.5 16.6 16.7 20 12 20C7.3 20 3.5 16.6 3.5 12.5V7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M3.5 7C3.5 5.3 5.6 4 8.2 4H15.8C18.4 4 20.5 5.3 20.5 7" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 13.5A8.2 8.2 0 1 1 10.4 4A6.7 6.7 0 0 0 20 13.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);
const NoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4H18V20L15 17.8L12 20L9 17.8L6 20V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M9 9H15M9 12.2H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 5H12.5M6.5 5V3.5H9.5V5M6.8 7.5V11.5M9.2 7.5V11.5M4.3 5L4.8 12.5C4.85 13.1 5.35 13.5 5.95 13.5H10.05C10.65 13.5 11.15 13.1 11.2 12.5L11.7 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BabyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="9.5" r="5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 20C8 17 9.8 15.2 12 15.2C14.2 15.2 16 17 16 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DIAPER_LABEL = { wet: 'Wet', dirty: 'Dirty', both: 'Wet & dirty' };
const COLORS = ['Yellow', 'Green', 'Brown', 'Black', 'Red'];
const CONSISTENCIES = ['Seedy', 'Soft', 'Pasty', 'Watery', 'Hard'];

/* ---- Age guide content ---- */
const AGE_GUIDE = [
  { key: 'w1', nav: 'Week 1', unit: 'Week', num: '0-1', title: '1-Week-Old Baby', blurb: 'Newborns feed often and unevenly around the clock as you and your baby find a rhythm together. Short, frequent feeds are completely normal while your milk supply and your baby\u2019s tiny stomach adjust to one another.' },
  { key: 'w2', nav: 'Week 2', unit: 'Week', num: '2', title: '2-Week-Old Baby', blurb: 'Feeding is likely becoming a little more efficient, though frequent sessions are still the norm at this age. A sudden hungrier stretch for a day or two is a common early growth spurt, not a sign anything is wrong.' },
  { key: 'w3', nav: 'Week 3', unit: 'Week', num: '3', title: '3-Week-Old Baby', blurb: 'As your baby\u2019s stomach grows, feeds may start to space out slightly during the day. Cluster feeding in the evening \u2014 wanting to eat frequently over a few hours \u2014 is common and usually settles with time.' },
  { key: 'w4', nav: 'Week 4', unit: 'Week', num: '4', title: '4-Week-Old Baby', blurb: 'One month in, many babies settle into a somewhat more familiar, if still unpredictable, feeding pattern. You may also be getting better at reading your baby\u2019s own hunger and fullness cues.' },
  { key: 'w5', nav: 'Week 5', unit: 'Week', num: '5', title: '5-Week-Old Baby', blurb: 'Another common growth spurt often lands around now, bringing a few extra-hungry days before feeding settles back into its usual rhythm. Expect more frequent, not necessarily longer, feeds during this stretch.' },
  { key: 'w6', nav: 'Week 6', unit: 'Week', num: '6', title: '6-Week-Old Baby', blurb: 'Feeds often become quicker and more efficient around now, and some babies begin to stretch one nighttime interval a little longer. Daytime feeding needs, though, typically stay just as frequent.' },
  { key: 'w7', nav: 'Week 7', unit: 'Week', num: '7', title: '7-Week-Old Baby', blurb: 'Your baby is likely more alert between feeds now, taking a growing interest in faces, sounds, and surroundings. Feeding sessions may come with a bit more eye contact and fewer of the newborn dozing-off feeds.' },
  { key: 'm2', nav: 'Month 2', unit: 'Month', num: '2', title: '2-Month-Old Baby', blurb: 'Feeding sessions often become more predictable, and many babies begin settling into a loose day-and-night pattern. It\u2019s still early days, though \u2014 expect variation from one day to the next.' },
  { key: 'm3', nav: 'Month 3', unit: 'Month', num: '3', title: '3-Month-Old Baby', blurb: 'Growth continues quickly and feeding volumes often increase to match. Some babies also become easily distracted mid-feed as their curiosity about the world around them grows.' },
  { key: 'm4', nav: 'Month 4', unit: 'Month', num: '4', title: '4-Month-Old Baby', blurb: 'A well-known growth spurt tends to show up around this age. Some babies start showing early signs of interest in food, though most still rely on breast milk or formula alone for now \u2014 talk to your pediatrician about timing for solids.' },
  { key: 'm5', nav: 'Month 5', unit: 'Month', num: '5', title: '5-Month-Old Baby', blurb: 'Feeding routines are often well established by now, and daytime feeds may space out a little as your baby takes in more per sitting.' },
  { key: 'm6', nav: 'Month 6', unit: 'Month', num: '6', title: '6-Month-Old Baby', blurb: 'Many families begin introducing solid foods around this age, alongside continued breast milk or formula. It\u2019s the start of a whole new, messier kind of mealtime.' },
  { key: 'm7', nav: 'Month 7', unit: 'Month', num: '7', title: '7-Month-Old Baby', blurb: 'Mealtimes may start looking more social as your baby experiments with new tastes and textures alongside regular milk feeds.' },
  { key: 'm8', nav: 'Month 8', unit: 'Month', num: '8', title: '8-Month-Old Baby', blurb: 'Early self-feeding attempts often begin here \u2014 however messy \u2014 as fine motor skills develop and curiosity about food grows.' },
  { key: 'm9', nav: 'Month 9', unit: 'Month', num: '9', title: '9-Month-Old Baby', blurb: 'Milk remains an important part of the diet, but solid foods are typically playing a bigger role in daily meals by now.' },
  { key: 'm10', nav: 'Month 10', unit: 'Month', num: '10', title: '10-Month-Old Baby', blurb: 'Many babies are eating a wider variety of textures now and starting to show clear likes and dislikes at the table.' },
  { key: 'm11', nav: 'Month 11', unit: 'Month', num: '11', title: '11-Month-Old Baby', blurb: 'Mealtime independence keeps growing, with more self-feeding and real interest in whatever is on everyone else\u2019s plate.' },
  { key: 'm12', nav: 'Month 12', unit: 'Month', num: '12', title: '12-Month-Old Baby', blurb: 'Around the first birthday, many toddlers move toward cow\u2019s milk (or continued breastfeeding) alongside a more varied table-food diet \u2014 your pediatrician can help guide the transition.' },
  { key: 'm13', nav: 'Month 13', unit: 'Month', num: '13', title: '13-Month-Old Toddler', blurb: 'Feeding is increasingly about exploration and independence, with plenty of trial, error, and the occasional thrown spoon along the way.' },
  { key: 'm14', nav: 'Month 14', unit: 'Month', num: '14', title: '14-Month-Old Toddler', blurb: 'Appetite can vary noticeably from day to day as growth slows slightly from the rapid pace of the first year.' },
  { key: 'm15', nav: 'Month 15', unit: 'Month', num: '15', title: '15-Month-Old Toddler', blurb: 'Picky phases are common at this age. Offering a variety of foods repeatedly, without pressure, tends to help more than it feels like it will in the moment.' },
  { key: 'm16', nav: 'Month 16', unit: 'Month', num: '16', title: '16-Month-Old Toddler', blurb: 'Table foods are typically the main event now, with milk playing a supporting role rather than the center of the meal.' },
  { key: 'm17', nav: 'Month 17', unit: 'Month', num: '17', title: '17-Month-Old Toddler', blurb: 'Toddlers this age often insist on feeding themselves with utensils, even when it slows things down considerably.' },
  { key: 'm18', nav: 'Month 18', unit: 'Month', num: '18', title: '18-Month-Old Toddler', blurb: 'Familiar foods and a steady mealtime routine can offer helpful structure during this stage of growing independence.' },
  { key: 'm19', nav: 'Month 19', unit: 'Month', num: '19', title: '19-Month-Old Toddler', blurb: 'Food jags \u2014 wanting the same meal on repeat \u2014 are common and usually pass with time and gentle, low-pressure variety.' },
  { key: 'm20', nav: 'Month 20', unit: 'Month', num: '20', title: '20-Month-Old Toddler', blurb: 'Your toddler is likely eating a version of the family meal now, with an appetite that shifts along with activity and growth.' },
  { key: 'm21', nav: 'Month 21', unit: 'Month', num: '21', title: '21-Month-Old Toddler', blurb: 'Snacks between meals often help fuel active toddlers, whose stomachs are still small relative to their energy needs.' },
  { key: 'm22', nav: 'Month 22', unit: 'Month', num: '22', title: '22-Month-Old Toddler', blurb: 'Involving your toddler in simple food choices \u2014 this fruit or that one \u2014 can make mealtimes smoother as independence keeps growing.' },
  { key: 'm23', nav: 'Month 23', unit: 'Month', num: '23', title: '23-Month-Old Toddler', blurb: 'Appetite and food preferences are becoming more clearly their own as your toddler nears the two-year mark.' },
  { key: 'm24', nav: 'Month 24', unit: 'Month', num: '24', title: '24-Month-Old Toddler', blurb: 'At two, most toddlers are fully on family foods and milk, with mealtimes now as much about routine and connection as they are about nutrition.' },
];

export default function BabyFeedingTracker() {
  const [babyName, setBabyName] = useState(() => safeGet(PROFILE_KEY)?.name || '');
  const [entries, setEntries] = useState(() => safeGet(STORAGE_KEY) || []);
  const [activeTimer, setActiveTimer] = useState(() => safeGet(TIMER_KEY));
  const [now, setNow] = useState(Date.now());
  const [filter, setFilter] = useState('all');

  const [bottlePanel, setBottlePanel] = useState(false);
  const [bottleAmount, setBottleAmount] = useState('');
  const [bottleUnit, setBottleUnit] = useState('oz');
  const [bottleKind, setBottleKind] = useState('formula');

  const [diaperPanel, setDiaperPanel] = useState(false);
  const [diaperKind, setDiaperKind] = useState(null);
  const [diaperColor, setDiaperColor] = useState(null);
  const [diaperConsistency, setDiaperConsistency] = useState(null);

  const [notePanel, setNotePanel] = useState(false);
  const [noteText, setNoteText] = useState('');

  const [ageIdx, setAgeIdx] = useState(0);

  const tickRef = useRef(null);

  useEffect(() => {
    tickRef.current = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tickRef.current);
  }, []);
  useEffect(() => safeSet(STORAGE_KEY, entries), [entries]);
  useEffect(() => safeSet(TIMER_KEY, activeTimer), [activeTimer]);
  useEffect(() => safeSet(PROFILE_KEY, { name: babyName }), [babyName]);

  const addEntry = (entry) => setEntries((prev) => [{ id: Date.now() + Math.random(), ...entry }, ...prev]);

  const startTimer = (type) => {
    if (activeTimer) return;
    setActiveTimer({ type, startedAt: Date.now() });
  };
  const stopTimer = () => {
    if (!activeTimer) return;
    const durationSec = Math.max(1, Math.round((Date.now() - activeTimer.startedAt) / 1000));
    if (activeTimer.type === 'left' || activeTimer.type === 'right') {
      addEntry({ type: 'nurse', side: activeTimer.type, durationSec, startedAt: activeTimer.startedAt });
    } else if (activeTimer.type === 'sleep') {
      addEntry({ type: 'sleep', durationSec, startedAt: activeTimer.startedAt });
    }
    setActiveTimer(null);
  };

  const openDiaper = () => {
    setDiaperPanel(true);
    setDiaperKind(null);
    setDiaperColor(null);
    setDiaperConsistency(null);
  };
  const saveDiaperDetails = () => {
    if (!diaperKind) return;
    addEntry({ type: 'diaper', kind: diaperKind, color: diaperColor, consistency: diaperConsistency, startedAt: Date.now() });
    setDiaperPanel(false);
  };

  const logBottle = () => {
    const amt = parseFloat(bottleAmount);
    if (Number.isNaN(amt) || amt <= 0) return;
    addEntry({ type: 'bottle', amount: amt, unit: bottleUnit, kind: bottleKind, startedAt: Date.now() });
    setBottleAmount('');
    setBottlePanel(false);
  };
  const logNote = () => {
    if (!noteText.trim()) return;
    addEntry({ type: 'note', text: noteText.trim(), startedAt: Date.now() });
    setNoteText('');
    setNotePanel(false);
  };
  const deleteEntry = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));

  const todayEntries = useMemo(() => entries.filter((e) => isSameDay(e.startedAt, now)), [entries, now]);
  const visibleEntries = useMemo(
    () => (filter === 'all' ? todayEntries : todayEntries.filter((e) => e.type === filter)),
    [todayEntries, filter]
  );

  const summary = useMemo(() => {
    let leftSec = 0, rightSec = 0, bottleOz = 0, bottleMl = 0, wet = 0, dirty = 0, sleepSec = 0, feeds = 0;
    todayEntries.forEach((e) => {
      if (e.type === 'nurse') {
        feeds += 1;
        if (e.side === 'left') leftSec += e.durationSec;
        else rightSec += e.durationSec;
      } else if (e.type === 'bottle') {
        feeds += 1;
        if (e.unit === 'oz') bottleOz += e.amount;
        else bottleMl += e.amount;
      } else if (e.type === 'diaper') {
        if (e.kind === 'wet' || e.kind === 'both') wet += 1;
        if (e.kind === 'dirty' || e.kind === 'both') dirty += 1;
      } else if (e.type === 'sleep') {
        sleepSec += e.durationSec;
      }
    });
    return { leftSec, rightSec, bottleOz, bottleMl, wet, dirty, sleepSec, feeds };
  }, [todayEntries]);

  const lastFeed = useMemo(() => entries.find((e) => e.type === 'nurse' || e.type === 'bottle') || null, [entries]);

  const weekBars = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = dayKey(d.getTime());
      const count = entries.filter((e) => (e.type === 'nurse' || e.type === 'bottle') && dayKey(e.startedAt) === key).length;
      days.push({ label: d.toLocaleDateString('en-US', { weekday: 'short' }), count });
    }
    return { days, max: Math.max(1, ...days.map((d) => d.count)) };
  }, [entries, now]);

  const elapsedActive = activeTimer ? Math.floor((now - activeTimer.startedAt) / 1000) : 0;
  const ringOffset = 264 - 264 * ((elapsedActive % 60) / 60);

  const entryLine = (e) => {
    if (e.type === 'nurse') return `Nursed \u2014 ${e.side === 'left' ? 'left' : 'right'} side, ${formatClock(e.durationSec)}`;
    if (e.type === 'bottle') return `Bottle \u2014 ${e.amount} ${e.unit} (${e.kind})`;
    if (e.type === 'diaper') {
      let line = DIAPER_LABEL[e.kind];
      if (e.color || e.consistency) line += ` \u2014 ${[e.color, e.consistency].filter(Boolean).join(', ')}`;
      return `Diaper \u2014 ${line}`;
    }
    if (e.type === 'sleep') return `Sleep \u2014 ${formatClock(e.durationSec)}`;
    if (e.type === 'note') return e.text;
    return '';
  };
  const entryIcon = (e) => {
    if (e.type === 'nurse') return <DropletIcon />;
    if (e.type === 'bottle') return <BottleIcon />;
    if (e.type === 'diaper') return <DiaperIcon />;
    if (e.type === 'sleep') return <MoonIcon />;
    return <NoteIcon />;
  };

  const age = AGE_GUIDE[ageIdx];

  return (
    <div className="bft-page">
      <div className="bft-shell">
        {/* ---------------- Tracker ---------------- */}
        <section className="bft-tracker">
          
          {/* REFERENCE HEADER */}
          <div className="bft-header-wrap">
            <div className="bft-badge"><span>❤️</span> Feeding Insights</div>
            <h1 className="bft-title">Baby <span className="highlight">Feeding</span> Tracker</h1>
            <p className="bft-subtitle">Log feeds, diapers, and sleep with our simple tracking solution.</p>
          </div>

          {/* PROFILE BAR */}
          <div className="bft-profile-bar">
            <div className="bft-avatar"><BabyIcon /></div>
            <div className="bft-head-text">
              <input
                className="bft-name-input"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
                placeholder="Baby's name"
              />
              <span className="bft-head-sub">Feeding, diaper, and sleep tracker</span>
            </div>
            {lastFeed && (
              <div className="bft-lastfeed">
                <span className="k">Last feed</span>
                <span className="v">{timeAgo(lastFeed.startedAt)}</span>
                <span className="n">{entryLine(lastFeed)}</span>
              </div>
            )}
          </div>

          <div className="bft-main-grid">
            <div className="bft-col-left">
              {activeTimer && (
                <div className={'bft-timer-card ' + activeTimer.type}>
                  <div className="ring-wrap">
                    <svg viewBox="0 0 100 100" className="ring-svg">
                      <circle cx="50" cy="50" r="42" className="ring-bg" />
                      <circle cx="50" cy="50" r="42" className="ring-fg" strokeDasharray="264" strokeDashoffset={ringOffset} />
                    </svg>
                    <div className="ring-center">
                      <span className="ring-clock">{formatClock(elapsedActive)}</span>
                      <span className="ring-label">
                        {activeTimer.type === 'left' && 'Left side'}
                        {activeTimer.type === 'right' && 'Right side'}
                        {activeTimer.type === 'sleep' && 'Sleeping'}
                      </span>
                    </div>
                  </div>
                  <button className="bft-stop" onClick={stopTimer} type="button">Stop &amp; save</button>
                </div>
              )}

              <div className="bft-grid">
                <button className="tile nurse-l" onClick={() => startTimer('left')} disabled={!!activeTimer} type="button">
                  <span className="tile-icon"><DropletIcon /></span><span className="tile-label">Nurse left</span>
                </button>
                <button className="tile nurse-r" onClick={() => startTimer('right')} disabled={!!activeTimer} type="button">
                  <span className="tile-icon"><DropletIcon /></span><span className="tile-label">Nurse right</span>
                </button>
                <button className="tile bottle" onClick={() => setBottlePanel((v) => !v)} type="button">
                  <span className="tile-icon"><BottleIcon /></span><span className="tile-label">Bottle</span>
                </button>
                <button className="tile diaper" onClick={openDiaper} type="button">
                  <span className="tile-icon"><DiaperIcon /></span><span className="tile-label">Diaper</span>
                </button>
                <button className="tile sleep" onClick={() => startTimer('sleep')} disabled={!!activeTimer} type="button">
                  <span className="tile-icon"><MoonIcon /></span><span className="tile-label">Sleep</span>
                </button>
                <button className="tile note" onClick={() => setNotePanel((v) => !v)} type="button">
                  <span className="tile-icon"><NoteIcon /></span><span className="tile-label">Note</span>
                </button>
              </div>

              {bottlePanel && (
                <div className="bft-sheet">
                  <div className="sheet-head"><span>Log a bottle</span><button onClick={() => setBottlePanel(false)} type="button"><CloseIcon /></button></div>
                  <div className="sheet-row">
                    <input type="number" className="bft-input" placeholder="Amount" value={bottleAmount} onChange={(e) => setBottleAmount(e.target.value)} min="0" step="0.5" autoFocus />
                    <div className="chip-row">
                      {['oz', 'ml'].map((u) => (
                        <button key={u} className={'chip' + (bottleUnit === u ? ' active' : '')} onClick={() => setBottleUnit(u)} type="button">{u}</button>
                      ))}
                    </div>
                    <div className="chip-row">
                      {['formula', 'breast milk'].map((k) => (
                        <button key={k} className={'chip' + (bottleKind === k ? ' active' : '')} onClick={() => setBottleKind(k)} type="button">{k}</button>
                      ))}
                    </div>
                    <button className="sheet-save" onClick={logBottle} type="button">Save bottle</button>
                  </div>
                </div>
              )}

              {diaperPanel && (
                <div className="bft-sheet">
                  <div className="sheet-head"><span>Log a diaper</span><button onClick={() => setDiaperPanel(false)} type="button"><CloseIcon /></button></div>
                  <div className="chip-row">
                    {Object.keys(DIAPER_LABEL).map((k) => (
                      <button key={k} className={'chip' + (diaperKind === k ? ' active' : '')} onClick={() => setDiaperKind(k)} type="button">{DIAPER_LABEL[k]}</button>
                    ))}
                  </div>
                  {diaperKind && (
                    <>
                      <span className="sheet-sublabel">Color (optional)</span>
                      <div className="chip-row wrap">
                        {COLORS.map((c) => (
                          <button key={c} className={'chip small' + (diaperColor === c ? ' active' : '')} onClick={() => setDiaperColor(diaperColor === c ? null : c)} type="button">{c}</button>
                        ))}
                      </div>
                      <span className="sheet-sublabel">Consistency (optional)</span>
                      <div className="chip-row wrap">
                        {CONSISTENCIES.map((c) => (
                          <button key={c} className={'chip small' + (diaperConsistency === c ? ' active' : '')} onClick={() => setDiaperConsistency(diaperConsistency === c ? null : c)} type="button">{c}</button>
                        ))}
                      </div>
                      <button className="sheet-save" onClick={saveDiaperDetails} type="button">Save diaper</button>
                    </>
                  )}
                </div>
              )}

              {notePanel && (
                <div className="bft-sheet">
                  <div className="sheet-head"><span>Add a note</span><button onClick={() => setNotePanel(false)} type="button"><CloseIcon /></button></div>
                  <div className="sheet-row">
                    <input type="text" className="bft-input bft-input-wide" placeholder="e.g. fussy after feeding, started teething" value={noteText} onChange={(e) => setNoteText(e.target.value)} autoFocus />
                    <button className="sheet-save" onClick={logNote} type="button">Save note</button>
                  </div>
                </div>
              )}

              <div className="bft-card no-pad">
                <div className="card-head-row">
                  <span className="card-label">Today's log</span>
                  <div className="filter-row">
                    {[['all', 'All'], ['nurse', 'Feeds'], ['bottle', 'Bottles'], ['diaper', 'Diapers'], ['sleep', 'Sleep'], ['note', 'Notes']].map(([k, l]) => (
                      <button key={k} className={'filter-chip' + (filter === k ? ' active' : '')} onClick={() => setFilter(k)} type="button">{l}</button>
                    ))}
                  </div>
                </div>
                {visibleEntries.length === 0 ? (
                  <div className="bft-empty">Nothing logged yet for this filter.</div>
                ) : (
                  <div className="bft-feed">
                    {visibleEntries.map((e) => (
                      <div className={'feed-item ' + e.type} key={e.id}>
                        <div className="feed-icon">{entryIcon(e)}</div>
                        <div className="feed-body">
                          <div className="feed-line">{entryLine(e)}</div>
                          <div className="feed-time">{formatTimeOfDay(e.startedAt)}</div>
                        </div>
                        <button className="feed-delete" onClick={() => deleteEntry(e.id)} type="button" aria-label="Delete entry"><TrashIcon /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bft-col-right">
              <div className="bft-summary-grid">
                <div className="stat">
                  <span className="stat-icon feeds"><DropletIcon /></span>
                  <span className="stat-v">{summary.feeds}</span>
                  <span className="stat-k">Feeds today</span>
                </div>
                <div className="stat">
                  <span className="stat-icon nurse"><DropletIcon /></span>
                  <span className="stat-v">{formatClock(summary.leftSec + summary.rightSec)}</span>
                  <span className="stat-k">L {formatClock(summary.leftSec)} \u00b7 R {formatClock(summary.rightSec)}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon bottle"><BottleIcon /></span>
                  <span className="stat-v">
                    {summary.bottleOz > 0 ? `${summary.bottleOz}oz` : ''}
                    {summary.bottleOz > 0 && summary.bottleMl > 0 ? ' + ' : ''}
                    {summary.bottleMl > 0 ? `${summary.bottleMl}ml` : ''}
                    {summary.bottleOz === 0 && summary.bottleMl === 0 ? '\u2014' : ''}
                  </span>
                  <span className="stat-k">Bottle total</span>
                </div>
                <div className="stat">
                  <span className="stat-icon diaper"><DiaperIcon /></span>
                  <span className="stat-v">{summary.wet + summary.dirty}</span>
                  <span className="stat-k">{summary.wet} wet \u00b7 {summary.dirty} dirty</span>
                </div>
                <div className="stat wide">
                  <span className="stat-icon sleep"><MoonIcon /></span>
                  <span className="stat-v">{formatClock(summary.sleepSec)}</span>
                  <span className="stat-k">Sleep today</span>
                </div>
              </div>
            </div>
          </div>

          
        </section>

        {/* ---------------- Age guide ---------------- */}
        <section className="bft-age-section">
          <span className="section-eyebrow">Go to your baby's age</span>
          <h2 className="section-h2">A quick feeding snapshot for every stage</h2>
          <div className="age-strip">
            {AGE_GUIDE.map((a, i) => (
              <button key={a.key} className={'age-chip' + (i === ageIdx ? ' active' : '')} onClick={() => setAgeIdx(i)} type="button">
                <span className="age-chip-unit">{a.unit}</span>
                <span className="age-chip-num">{a.num}</span>
              </button>
            ))}
          </div>
          <div className="age-card">
            <span className="age-card-eyebrow">{age.title}</span>
            <p className="age-card-blurb">{age.blurb}</p>
            <span className="age-card-note">General pattern only \u2014 every baby grows at their own pace. Check with your pediatrician for guidance specific to your child.</span>
          </div>
        </section>

        {/* ---------------- Article ---------------- */}
        <article className="bft-article">
          <h2>What is a baby feeding tracker, and why bother with one?</h2>
          <p>
            A feeding tracker is simply a running record of when and how your baby ate, slept,
            and needed a diaper change \u2014 kept somewhere more reliable than memory alone. In
            the middle of the night, on three hours of sleep, "was that twenty minutes or two
            hours ago?" is a genuinely hard question to answer without help. A tracker like this
            one answers it for you.
          </p>

          <h2>How to get the most out of this tracker</h2>
          <p>
            Log in the moment, not from memory. Tap "Nurse left" or "Nurse right" as the feed
            begins and let the timer run \u2014 it keeps counting even if you switch tabs or step
            away, and picks up correctly if you close and reopen the page. Bottles and diapers
            take a single tap to record, with optional detail (amount, color, consistency) for
            anyone who wants a fuller picture to bring to a pediatrician visit.
          </p>

          <h2>Reading the patterns, not just the numbers</h2>
          <p>
            A single day's log tells you what happened. A week's worth starts to tell you
            something more useful: whether feeds are trending longer or more frequent, whether
            diaper counts look typical for your baby's age, whether sleep is stretching out. The
            7-day chart on this page exists for exactly that \u2014 a pattern is easier to see than
            to remember.
          </p>

          <h2>Sharing the load with a partner or caregiver</h2>
          <p>
            One of the quiet benefits of any tracker is that it removes the burden of being the
            only person who knows what's going on. "When did she last eat?" stops being a
            question only one exhausted parent can answer. If more than one caregiver needs to
            see the same log, this version stores entries on a single device \u2014 syncing across
            devices would need a shared backend behind it.
          </p>

          <h2>It's a tool, not a test</h2>
          <p>
            Tracking is meant to ease your mind, not add another source of pressure. It's
            completely fine to log every feed for the first few weeks and then log less often \u2014
            or stop altogether \u2014 once your baby settles into a routine that feels familiar to
            you. The goal is confidence, not data for its own sake.
          </p>
        </article>
      </div>
    </div>
  );
}