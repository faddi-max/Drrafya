import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import DOMPurify from "dompurify";
import {imageurl} from '../constant/Basurl.jsx'
import {
  CalendarDays,
  Clock3,
  Search,
  Share2,
  Bookmark,
  Heart,
  MessageSquare,
  ArrowLeft,
  Mail,
  User,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Frown,
  Compass,
  Quote,
  Stethoscope,
} from "lucide-react";
import { getsingleblogpostbyslug } from "../controllers/Blogs/getsingleblogbyslug.jsx"; // <-- update path to wherever you saved that function
import { getallcategories } from "../controllers/categories/getallcategories.jsx";

const ease = [0.22, 1, 0.36, 1];

// Rotating trail markers for the category rail — used only when the API
// doesn't send its own icon/emoji for a category.
const TRAIL_MARKS = ["🌸", "🥑", "🧠", "🤰", "✨", "🩺", "🌿", "💧"];

// Static fallback for the category rail, only used if the categories
// endpoint fails or returns nothing.
const FALLBACK_CATEGORIES = [
  { slug: "reproductive-health", title: "Reproductive Health", count: 12 },
  { slug: "nutrition-wellness", title: "Nutrition & Wellness", count: 8 },
  { slug: "mental-wellbeing", title: "Mental Wellbeing", count: 5 },
  { slug: "pregnancy-journey", title: "Pregnancy Journey", count: 15 },
  { slug: "healthy-lifestyle", title: "Healthy Lifestyle", count: 7 },
];

// ---------- helpers ----------

// Detect whether the API sent back real HTML (Elementor export etc.)
// or just a plain text block.
function isHtmlContent(str = "") {
  return /<\/?[a-z][\s\S]*>/i.test(str);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function readTimeLabel(minutes) {
  if (!minutes) return null;
  return `${minutes} min read`;
}

function FillIconButton({ title, children, onClick }) {
  return (
    <motion.button
      type="button"
      title={title}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease }}
      className="group h-10 w-10 rounded-xl border border-black/10 bg-black/5 grid place-items-center
                 hover:bg-[var(--rich-pink)] hover:border-[var(--rich-pink)] transition"
    >
      <span className="text-black/55 group-hover:text-white transition">{children}</span>
    </motion.button>
  );
}

function HeroSkeleton() {
  return (
    <div className="rounded-[28px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] overflow-hidden animate-pulse">
      <div className="h-[320px] sm:h-[380px] bg-black/5" />
      <div className="px-6 sm:px-10 py-8 space-y-4">
        <div className="h-4 w-32 rounded-full bg-black/10" />
        <div className="h-8 w-3/4 rounded-full bg-black/10" />
        <div className="h-4 w-full rounded-full bg-black/5" />
        <div className="h-4 w-full rounded-full bg-black/5" />
        <div className="h-4 w-2/3 rounded-full bg-black/5" />
      </div>
    </div>
  );
}

// Horizontal "care journey" rail — the categories widget, now living just
// under the breadcrumb instead of buried in the sidebar. Marker dots sit on
// a dotted trail line, echoing a journey/wayfinding idea that fits a
// wellness-journey brand better than a plain list ever could.
function CategoryTrail({ categories, status, activeSlug }) {
  const items = status === "success" && categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  
}

function titleFallback(slug = "") {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function BlogPost() {
  const { slug } = useParams();
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 26 });

  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus("loading");
      setPost(null);
      try {
        const res = await getsingleblogpostbyslug(slug);
        const data = res?.data || res; // API wraps it as { success, message, data }

        if (!ignore) {
          setPost(data);
          setStatus("success");
        }
      } catch (err) {
        console.error(err);
        if (!ignore) setStatus("error");
      }
    }

    load();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      ignore = true;
    };
  }, [slug, location.pathname]);

  // CATEGORY RAIL — real data now, fetched once (categories are global nav,
  // not tied to a single post).
  const [categories, setCategories] = useState([]);
  const [categoriesStatus, setCategoriesStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let ignore = false;

    async function loadCategories() {
      setCategoriesStatus("loading");
      try {
        const res = await getallcategories();
        const list = res?.categories || res?.data || (Array.isArray(res) ? res : []);
        if (!ignore) {
          setCategories(list);
          setCategoriesStatus("success");
        }
      } catch (err) {
        console.error(err);
        if (!ignore) setCategoriesStatus("error");
      }
    }

    loadCategories();
    return () => {
      ignore = true;
    };
  }, []);

  // COMMENTS — no comments endpoint yet, so these live locally for now.
  const [allComments, setAllComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 3;

  useEffect(() => {
    setAllComments([]);
    setCommentText("");
    setPage(1);
  }, [slug]);

  const totalPages = Math.max(1, Math.ceil(allComments.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paged = allComments.slice((safePage - 1) * perPage, safePage * perPage);

  const postComment = () => {
    const t = commentText.trim();
    if (!t) return;
    const item = { id: `new-${Date.now()}`, name: "You", time: "Just now", text: t, helpful: 0 };
    setAllComments((prev) => [item, ...prev]);
    setCommentText("");
    setPage(1);
  };

  const helpful = (id) => {
    setAllComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, helpful: (c.helpful || 0) + 1 } : c))
    );
  };

  // SIDEBAR search (placeholder until a search endpoint exists)
  const [q, setQ] = useState("");

  // Sanitize + prep the body content once we have a post
  const { bodyIsHtml, cleanHtml } = useMemo(() => {
    if (!post?.content) return { bodyIsHtml: false, cleanHtml: "" };
    const html = isHtmlContent(post.content);
    return {
      bodyIsHtml: html,
      cleanHtml: html
        ? DOMPurify.sanitize(post.content, {
            ADD_TAGS: ["style"],
            ADD_ATTR: ["style", "target", "rel"],
          })
        : "",
    };
  }, [post?.content]);

  const categoryName = post?.category?.title || post?.category?.name;
  const posttitle = post?.title;
  const categorySlug = post?.category?.slug;
  const dateLabel = formatDate(post?.created_at || post?.date);
  const readLabel = post?.readTime || readTimeLabel(post?.read_time);
  const coverImage = post?.image_url || post?.image || post?.cover;

  return (
    <div
      className="bg-[#FBF9F5]"
      style={{ "--care-plum": "#5B4160", "--care-ink": "#20222E" }}
    >
      <motion.div
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="fixed left-0 top-0 z-[9999] h-[3px] w-full bg-[var(--rich-pink)]"
      />

      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* TOP HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease }}
          className="text-center mb-10"
        >
          <h2
            className="text-[32px] sm:text-[46px] font-extrabold text-[var(--care-ink)] leading-[1.05]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Expert Insights on{" "}
            <span className="text-[var(--rich-pink)]">Women's Wellness</span>
          </h2>

          <p className="mt-3 text-[14px] sm:text-[16px] font-semibold text-black/45 leading-7 max-w-[860px] mx-auto">
            Empowering your journey with clinical expertise, holistic wisdom, and compassionate guidance.
          </p>
          <p className="text-[14px] sm:text-[16px] font-semibold text-black/45 leading-7 max-w-[860px] mx-auto">
            Curated by Dr. Rafiya Zahir to help you feel informed, steady, and supported.
          </p>
        </motion.div>

        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-[13px] font-extrabold text-black/70 hover:text-black transition"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>

          <div className="text-[12px] font-semibold text-black/40">
            Home / Blogs / <span className="text-black/70">{posttitle || "Article"}</span>
          </div>
        </div>

        {/* Category rail — moved out of the sidebar, lives here as a
            horizontal "care journey" instead */}
        <CategoryTrail categories={categories} status={categoriesStatus} activeSlug={categorySlug} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* LEFT */}
          {status === "loading" && <HeroSkeleton />}

          {status === "error" && (
            <div className="rounded-[28px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] p-16 flex flex-col items-center justify-center text-center">
              <span className="h-16 w-16 rounded-2xl bg-[var(--rich-pink)]/10 grid place-items-center border border-[var(--rich-pink)]/15 mb-5">
                <Frown className="text-[var(--rich-pink)]" size={26} />
              </span>
              <p className="font-extrabold text-[#14182b] text-[18px]">Couldn't load this article</p>
              <p className="mt-2 text-black/45 font-semibold max-w-[380px]">
                Something went wrong while fetching this post. Please try again in a moment.
              </p>
              <Link
                to="/blogs"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[var(--rich-pink)] px-6 py-3 text-white font-extrabold shadow-[0_16px_30px_rgba(236,72,153,0.28)] hover:brightness-95 transition"
              >
                <ArrowLeft size={16} /> Back to Blogs
              </Link>
            </div>
          )}

          {status === "success" && post && (
            <AnimatePresence mode="wait">
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease }}
                className="rounded-[28px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                {/* Hero */}
                <div className="relative h-[320px] sm:h-[400px] overflow-hidden bg-black/5">
                  {coverImage && (
                    <motion.img
                      src={`${imageurl}${coverImage}`}
                      alt={post.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.8, ease }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5" />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-60"
                    style={{
                      background:
                        "radial-gradient(120% 60% at 15% 100%, rgba(236,72,153,0.35) 0%, transparent 60%)",
                    }}
                  />

                  <div className="absolute left-6 sm:left-10 top-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[0.18em] uppercase bg-[var(--rich-pink)] text-white shadow-[0_10px_24px_rgba(236,72,153,0.25)]">
                      <Stethoscope size={13} /> Featured Article
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease, delay: 0.05 }}
                    className="absolute left-6 sm:left-10 bottom-8 sm:bottom-10 right-6"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      {categoryName && (
                        <span className="inline-flex items-center rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[0.18em] uppercase bg-white/12 text-white border border-white/15 backdrop-blur-sm">
                          {categoryName}
                        </span>
                      )}

                      {readLabel && (
                        <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] uppercase bg-white/12 text-white border border-white/15 backdrop-blur-sm">
                          <Clock3 size={14} className="text-white/80" /> {readLabel}
                        </span>
                      )}

                      {dateLabel && (
                        <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] uppercase bg-white/12 text-white border border-white/15 backdrop-blur-sm">
                          <CalendarDays size={14} className="text-white/80" /> {dateLabel}
                        </span>
                      )}
                    </div>

                    <h1
                      className="mt-4 text-white text-[34px] sm:text-[52px] leading-[1.02] font-extrabold"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {post.title}
                    </h1>
                  </motion.div>
                </div>

                {/* Meta row */}
                <div className="px-6 sm:px-10 py-6 border-b border-black/5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-black/5 grid place-items-center overflow-hidden border border-black/5">
                        <User className="text-black/50" size={18} />
                      </div>
                      <div className="leading-tight">
                        <p className="font-extrabold text-[14px] text-black/85">
                          {post.author || "Dr. Rafiya Zahir"}
                        </p>
                        <p className="text-[12px] font-semibold text-black/45">Women's Health Specialist</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FillIconButton title="Share">
                        <Share2 size={18} />
                      </FillIconButton>
                      <FillIconButton title="Save">
                        <Bookmark size={18} />
                      </FillIconButton>
                      <FillIconButton title="Like">
                        <Heart size={18} />
                      </FillIconButton>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 sm:px-10 py-8">
                  {/* Excerpt as a pull-quote — gives the reader an entry
                      point into the piece instead of diving straight into
                      dense body copy */}
                  {post.excerpt && (
                    <div className="mb-8 flex gap-4 rounded-[22px] bg-[var(--rich-pink)]/[0.05] border border-[var(--rich-pink)]/10 px-6 py-5">
                      <Quote className="shrink-0 text-[var(--rich-pink)]/50 mt-0.5" size={22} />
                      <p
                        className="text-[17px] sm:text-[19px] leading-8 text-black/70 font-medium italic"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  )}

                  {bodyIsHtml ? (
                    <div
                      className="blog-elementor-content"
                      dangerouslySetInnerHTML={{ __html: cleanHtml }}
                    />
                  ) : (
                    <div className="space-y-5">
                      {(post.content || "")
                        .split(/\n{2,}/)
                        .filter(Boolean)
                        .map((para, idx) => (
                          <motion.p
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.04, ease }}
                            className="text-[16px] leading-8 text-black/70"
                          >
                            {para}
                          </motion.p>
                        ))}
                    </div>
                  )}

                  {/* Tags + stats */}
                  <div className="mt-12 pt-8 border-t border-black/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {(post.tags || []).map((t) => (
                        <motion.span
                          whileHover={{ y: -2, scale: 1.03 }}
                          transition={{ duration: 0.18, ease }}
                          key={t}
                          className="px-4 py-2 rounded-full bg-[#f4f6fb] text-[12px] font-extrabold text-black/55 cursor-pointer
                                     hover:bg-[var(--rich-pink)] hover:text-white transition"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <motion.button
                        type="button"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-2 rounded-2xl bg-black/5 border border-black/10 px-4 py-2
                                   text-[12px] font-extrabold text-black/55 hover:bg-[var(--rich-pink)] hover:text-white hover:border-[var(--rich-pink)] transition"
                      >
                        <Heart size={16} className="text-black/45 group-hover:text-white transition" />
                        {post.likes || 0}
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-2 rounded-2xl bg-black/5 border border-black/10 px-4 py-2
                                   text-[12px] font-extrabold text-black/55 hover:bg-[var(--rich-pink)] hover:text-white hover:border-[var(--rich-pink)] transition"
                      >
                        <MessageSquare size={16} className="text-black/45 group-hover:text-white transition" />
                        {allComments.length}
                      </motion.button>
                    </div>
                  </div>

                  {/* COMMENTS */}
                  <div className="mt-12">
                    <div className="flex items-center gap-3">
                      <span className="h-11 w-11 rounded-2xl bg-[var(--rich-pink)]/10 grid place-items-center border border-[var(--rich-pink)]/15">
                        <MessageCircle className="text-[var(--rich-pink)]" size={18} />
                      </span>
                      <h3 className="text-[22px] sm:text-[26px] font-extrabold text-[#14182b]">
                        Community Comments <span className="text-black/35">({allComments.length})</span>
                      </h3>
                    </div>

                    <div className="mt-6 rounded-[28px] bg-white border border-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.06)] p-6 sm:p-8">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full min-h-[120px] rounded-2xl bg-[#fbfbfd] border border-black/10 px-5 py-4
                                   outline-none focus:ring-4 focus:ring-[var(--rich-pink)]/15 transition"
                        placeholder="Join the conversation... What are your thoughts?"
                      />

                      <div className="mt-5 flex justify-end">
                        <motion.button
                          type="button"
                          onClick={postComment}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className="rounded-2xl bg-[var(--rich-pink)] px-7 py-3 text-white font-extrabold
                                     shadow-[0_16px_30px_rgba(236,72,153,0.28)] hover:brightness-95 transition"
                        >
                          Post Comment
                        </motion.button>
                      </div>
                    </div>

                    {allComments.length > 0 && (
                      <div className="mt-6 rounded-[28px] bg-white border border-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="px-6 sm:px-8 py-5 border-b border-black/5 flex items-center justify-between">
                          <p className="font-extrabold text-[#14182b]">Latest Comments</p>

                          <div className="flex items-center gap-2">
                            <motion.button
                              type="button"
                              onClick={() => setPage((p) => Math.max(1, p - 1))}
                              disabled={safePage === 1}
                              whileHover={safePage !== 1 ? { y: -1 } : {}}
                              whileTap={safePage !== 1 ? { scale: 0.98 } : {}}
                              className={`h-10 w-10 rounded-xl border grid place-items-center transition
                                ${safePage !== 1
                                  ? "bg-black/5 border-black/10 hover:bg-[var(--rich-pink)] hover:border-[var(--rich-pink)]"
                                  : "bg-black/3 border-black/10 opacity-40 cursor-not-allowed"}`}
                            >
                              <ChevronLeft className={safePage !== 1 ? "text-black/60" : "text-black/35"} size={18} />
                            </motion.button>

                            <motion.button
                              type="button"
                              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                              disabled={safePage === totalPages}
                              whileHover={safePage !== totalPages ? { y: -1 } : {}}
                              whileTap={safePage !== totalPages ? { scale: 0.98 } : {}}
                              className={`h-10 w-10 rounded-xl border grid place-items-center transition
                                ${safePage !== totalPages
                                  ? "bg-black/5 border-black/10 hover:bg-[var(--rich-pink)] hover:border-[var(--rich-pink)]"
                                  : "bg-black/3 border-black/10 opacity-40 cursor-not-allowed"}`}
                            >
                              <ChevronRight className={safePage !== totalPages ? "text-black/60" : "text-black/35"} size={18} />
                            </motion.button>
                          </div>
                        </div>

                        <div className="px-6 sm:px-8 py-6">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`page-${safePage}`}
                              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                              transition={{ duration: 0.35, ease }}
                              className="space-y-7"
                            >
                              {paged.map((c) => (
                                <div key={c.id} className="flex gap-4">
                                  <div className="h-12 w-12 rounded-2xl bg-[#f7f8fc] grid place-items-center border border-black/5 overflow-hidden">
                                    <User size={18} className="text-black/45" />
                                  </div>

                                  <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                      <p className="font-extrabold text-[14px] text-black/80">{c.name}</p>
                                      <p className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-black/35">
                                        {c.time}
                                      </p>
                                    </div>

                                    <p className="mt-2 text-[14px] leading-7 text-black/65 font-semibold">
                                      {c.text}
                                    </p>

                                    <div className="mt-3 flex items-center gap-5">
                                      <button
                                        type="button"
                                        className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-black/35 hover:text-[var(--rich-pink)] transition"
                                      >
                                        Reply
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => helpful(c.id)}
                                        className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-black/35 hover:text-[var(--rich-pink)] transition"
                                      >
                                        Helpful ({c.helpful || 0})
                                      </button>
                                    </div>

                                    <div className="mt-5 h-[1px] bg-black/5" />
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          </AnimatePresence>

                          {totalPages > 1 && (
                            <div className="mt-6 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => {
                                  const n = i + 1;
                                  const active = n === safePage;
                                  return (
                                    <button
                                      key={n}
                                      type="button"
                                      onClick={() => setPage(n)}
                                      className={`h-10 w-10 rounded-xl border font-extrabold text-[13px] transition
                                        ${active
                                          ? "bg-[var(--rich-pink)] text-white border-[var(--rich-pink)] shadow-[0_12px_26px_rgba(236,72,153,0.25)]"
                                          : "bg-white text-black/55 border-black/10 hover:bg-[var(--rich-pink)] hover:text-white hover:border-[var(--rich-pink)]"
                                        }`}
                                    >
                                      {n}
                                    </button>
                                  );
                                })}
                              </div>

                              <button
                                type="button"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className="inline-flex items-center gap-2 rounded-2xl bg-white border border-black/10 px-5 py-2
                                           text-[12px] font-extrabold text-black/55 hover:bg-[var(--rich-pink)] hover:text-white hover:border-[var(--rich-pink)] transition"
                              >
                                Next <ChevronRight size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          )}

          {/* RIGHT SIDEBAR — categories have moved out to the trail above,
              so this now holds search, the author, and the newsletter */}
          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease }}
            className="space-y-6 lg:sticky lg:top-[92px] h-fit"
          >
            {/* Search */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-[26px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)] p-6 border border-black/5"
            >
              <div className="flex items-center gap-3">
                <Search className="text-[var(--rich-pink)]" />
                <h4 className="text-[18px] font-extrabold text-[#14182b]">Search Articles</h4>
              </div>

              <div className="mt-5 relative">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search keywords..."
                  className="w-full rounded-2xl border border-black/10 bg-[#f7f8fc] px-5 py-4 pr-12
                             font-semibold text-black/70 outline-none focus:ring-4 focus:ring-[var(--rich-pink)]/15 transition"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-black/35">
                  <Search size={18} />
                </div>
              </div>
            </motion.div>

            {/* About the author */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-[26px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)] p-6 border border-black/5"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[var(--rich-pink)]/10 border border-[var(--rich-pink)]/15 grid place-items-center">
                  <User className="text-[var(--rich-pink)]" size={22} />
                </div>
                <div>
                  <p className="font-extrabold text-[15px] text-[#14182b]">
                    {post?.author || "Dr. Rafiya Zahir"}
                  </p>
                  <p className="text-[12px] font-semibold text-black/45">Women's Health Specialist</p>
                </div>
              </div>
              <p className="mt-4 text-[13px] leading-6 text-black/55 font-semibold">
                Writing evidence-based, compassionate guidance on reproductive health,
                nutrition, and everyday wellness for women at every stage of life.
              </p>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[var(--rich-pink)] to-[var(--care-plum)] text-white p-7 shadow-[0_22px_70px_rgba(236,72,153,0.22)]"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
              />
              <div className="h-12 w-12 rounded-2xl bg-white/18 grid place-items-center">
                <Mail />
              </div>

              <h4 className="mt-5 text-[26px] font-extrabold" style={{ fontFamily: "'Fraunces', serif" }}>
                Weekly Wellness
              </h4>
              <p className="mt-3 text-white/85 font-semibold leading-7">
                Get expert health advice and holistic tips delivered to your inbox every Sunday morning.
              </p>

              <div className="mt-6">
                <input
                  placeholder="Your email address"
                  className="w-full rounded-2xl bg-white/15 border border-white/20 px-5 py-4
                             placeholder:text-white/60 outline-none focus:ring-4 focus:ring-white/20 transition"
                />
                <button
                  type="button"
                  className="mt-4 w-full rounded-2xl bg-white text-[#14182b] font-extrabold py-3 hover:brightness-95 transition"
                >
                  Subscribe Now
                </button>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>

      {/* Styling for raw HTML (Elementor) content coming from the API,
          so it inherits the site's pink theme instead of looking bare. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;1,500&display=swap');

        .blog-elementor-content {
          color: rgba(0,0,0,0.7);
          line-height: 1.9;
          font-size: 16px;
        }
        .blog-elementor-content h1,
        .blog-elementor-content h2,
        .blog-elementor-content h3 {
          font-family: 'Fraunces', serif;
          color: #14182b;
          font-weight: 700;
          margin-top: 2.2rem;
          margin-bottom: 0.9rem;
          line-height: 1.25;
        }
        .blog-elementor-content h1 { font-size: 30px; }
        .blog-elementor-content h2 { font-size: 26px; }
        .blog-elementor-content h3 { font-size: 20px; }
        .blog-elementor-content p {
          margin: 0 0 1.1rem 0;
        }
        .blog-elementor-content a {
          color: var(--rich-pink);
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .blog-elementor-content img {
          max-width: 100%;
          height: auto;
          border-radius: 22px;
          margin: 1.5rem 0;
        }
        .blog-elementor-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 14px;
          overflow-x: auto;
          display: block;
        }
        .blog-elementor-content table td,
        .blog-elementor-content table th {
          border: 1px solid rgba(0,0,0,0.08);
          padding: 10px 14px;
          text-align: left;
        }
        .blog-elementor-content table tr:first-child {
          background: #f7f8fc;
          font-weight: 800;
        }
        .blog-elementor-content ul,
        .blog-elementor-content ol {
          margin: 0 0 1.1rem 1.4rem;
        }
        .blog-elementor-content li {
          margin-bottom: 0.4rem;
        }
        .blog-elementor-content blockquote {
          border-left: 4px solid var(--rich-pink);
          background: #fbfbfd;
          padding: 1rem 1.4rem;
          border-radius: 14px;
          margin: 1.5rem 0;
          color: rgba(0,0,0,0.6);
          font-weight: 600;
        }
        .blog-elementor-content strong { color: #14182b; }
      `}</style>
    </div>
  );
}