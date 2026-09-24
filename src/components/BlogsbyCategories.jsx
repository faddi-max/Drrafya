import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {imageurl} from '../constant/Basurl.jsx';
import {
  CalendarDays,
  Clock3,
  ArrowLeft,
  Search,
  Frown,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getallcategoriesbyslug } from "../controllers/Blogs/getallblogsbycategories.jsx";

const ease = [0.22, 1, 0.36, 1];

function titleFromSlug(slug = "") {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Builds a compact page-number list with ellipses, e.g. 1 … 4 5 6 … 12
function buildPageList(current, last) {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);

  const pages = new Set([1, last, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b);

  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("...");
    out.push(p);
  });
  return out;
}

function BlogCardSkeleton() {
  return (
    <div className="rounded-[26px] bg-white border border-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.06)] overflow-hidden animate-pulse">
      <div className="h-[190px] bg-black/5" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-24 rounded-full bg-black/10" />
        <div className="h-5 w-4/5 rounded-full bg-black/10" />
        <div className="h-4 w-full rounded-full bg-black/5" />
        <div className="h-4 w-2/3 rounded-full bg-black/5" />
      </div>
    </div>
  );
}

export default function BlogsbyCategories() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState(null); // raw laravel pagination object
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [q, setQ] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await getallcategoriesbyslug(slug, page);

        // Real shape:
        // { success, message, category: {...}, blogs: { current_page, data: [...], last_page, ... } }
        const cat = res?.category || null;
        const blogsPayload = res?.blogs || {};
        const list = Array.isArray(blogsPayload)
          ? blogsPayload
          : blogsPayload?.data || [];

        if (!ignore) {
          setCategory(cat);
          setBlogs(list);
          setPagination(Array.isArray(blogsPayload) ? null : blogsPayload);
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
  }, [slug, page]);

  // Reset back to page 1 whenever the category itself changes
  useEffect(() => {
    setPage(1);
  }, [slug]);

  const categoryName = category?.title || titleFromSlug(slug);
  const categoryDesc = category?.description;

  const filtered = useMemo(() => {
    if (!q.trim()) return blogs;
    const query = q.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(query) ||
        b.subtitle?.toLowerCase().includes(query) ||
        b.excerpt?.toLowerCase().includes(query) ||
        b.description?.toLowerCase().includes(query)
    );
  }, [blogs, q]);

  const currentPage = pagination?.current_page || page;
  const lastPage = pagination?.last_page || 1;
  const total = pagination?.total ?? filtered.length;
  const hasPrev = !!pagination?.prev_page_url && currentPage > 1;
  const hasNext = !!pagination?.next_page_url && currentPage < lastPage;
  const pageList = buildPageList(currentPage, lastPage);

  const goToPage = (p) => {
    if (p < 1 || p > lastPage || p === currentPage) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#fbfbfd] min-h-screen">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
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
            Home / Blogs / <span className="text-black/70">{categoryName}</span>
          </div>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[0.18em] uppercase bg-[var(--rich-pink)]/10 text-[var(--rich-pink)] border border-[var(--rich-pink)]/20">
            Category
          </span>

          <h2 className="mt-4 text-[30px] sm:text-[44px] font-extrabold text-[#14182b] leading-[1.05]">
            {categoryName}
          </h2>

          <p className="mt-3 text-[14px] sm:text-[16px] font-semibold text-black/45 leading-7 max-w-[720px] mx-auto">
            {categoryDesc}
          </p>
        </motion.div>

        {/* Search within category */}
        <div className="max-w-[520px] mx-auto mb-12 relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search here ..."
            className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 pr-12
                       font-semibold text-black/70 outline-none focus:ring-4 focus:ring-[var(--rich-pink)]/15 transition
                       shadow-[0_12px_36px_rgba(0,0,0,0.05)]"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-black/35">
            <Search size={18} />
          </div>
        </div>

        {/* States */}
        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="h-16 w-16 rounded-2xl bg-[var(--rich-pink)]/10 grid place-items-center border border-[var(--rich-pink)]/15 mb-5">
              <Frown className="text-[var(--rich-pink)]" size={26} />
            </span>
            <p className="font-extrabold text-[#14182b] text-[18px]">
              Couldn't load this category
            </p>
            <p className="mt-2 text-black/45 font-semibold max-w-[420px]">
              Something went wrong while fetching these articles. Please try again in a moment.
            </p>
          </div>
        )}

        {status === "success" && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="h-16 w-16 rounded-2xl bg-black/5 grid place-items-center border border-black/10 mb-5">
              <Search className="text-black/40" size={22} />
            </span>
            <p className="font-extrabold text-[#14182b] text-[18px]">
              No articles found
            </p>
            <p className="mt-2 text-black/45 font-semibold max-w-[420px]">
              We couldn't find any posts matching your search in this category.
            </p>
          </div>
        )}

        {status === "success" && filtered.length > 0 && (
          <>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filtered.map((b) => (
                  <motion.div
                    key={b.id || b.slug}
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.4, ease }}
                    whileHover={{ y: -6 }}
                  >
                    {/* Single-post route is /blog/:slug (singular) — this page itself lives at
                        /blogs/:slug (plural), so these must stay different paths or the app
                        keeps re-rendering this same category page.

                        NOTE: this outer card used to be a <Link>, but it contains another
                        <Link> (the category badge below) and HTML doesn't allow <a> inside
                        <a>. That was causing the hydration error. Fixed by making the card
                        a clickable <div> (navigate() on click / Enter key) while keeping the
                        category badge as a real <Link>. */}
                    <div
                      role="link"
                      tabIndex={0}
                      onClick={() => navigate(`/blog/${b.slug}`)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") navigate(`/blog/${b.slug}`);
                      }}
                      className="group block rounded-[26px] bg-white border border-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_24px_70px_rgba(236,72,153,0.14)] transition cursor-pointer"
                    >
                      <div className="relative h-[190px] overflow-hidden">
                        <motion.img
                          src={`${imageurl}${b.image_url || b.cover || b.thumbnail}`}
                          alt={b.title}
                          className="h-full w-full object-cover"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.7, ease }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                        <Link
                          to={`/blogs/${b.category?.slug || ""}`}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-extrabold tracking-[0.14em] uppercase bg-white/90 text-[var(--rich-pink)] hover:bg-[var(--rich-pink)] hover:text-white transition"
                        >
                          {b.category?.title || categoryName}
                        </Link>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 text-[11px] font-extrabold tracking-[0.1em] uppercase text-black/35">
                          {(b.date || b.created_at) && (
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays size={13} />{" "}
                              {b.date ||
                                new Date(b.created_at).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                            </span>
                          )}
                          {b.readTime && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock3 size={13} /> {b.readTime}
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 text-[18px] font-extrabold text-[#14182b] leading-snug group-hover:text-[var(--rich-pink)] transition">
                          {b.title}
                        </h3>

                        {(b.subtitle || b.excerpt || b.description) && (
                          <p className="mt-2 text-[13px] leading-6 text-black/50 font-semibold line-clamp-2">
                            {b.subtitle || b.excerpt || b.description}
                          </p>
                        )}

                        <div className="mt-5 pt-5 border-t border-black/5 flex items-center gap-3">
                          <span className="h-9 w-9 rounded-xl bg-black/5 grid place-items-center border border-black/5">
                            <User size={14} className="text-black/45" />
                          </span>
                          <span className="text-[12px] font-extrabold text-black/60">
                            {b.author?.name || b.authorName || "Dr. Rafiya Zahir"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination — only shown when the API actually paginates and there's more than one page */}
            {lastPage > 1 && (
              <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[12px] font-extrabold tracking-[0.1em] uppercase text-black/35">
                  Page {currentPage} of {lastPage}
                </p>

                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={!hasPrev}
                    whileHover={hasPrev ? { y: -1 } : {}}
                    whileTap={hasPrev ? { scale: 0.98 } : {}}
                    className={`h-10 w-10 rounded-xl border grid place-items-center transition
                      ${hasPrev
                        ? "bg-black/5 border-black/10 hover:bg-[var(--rich-pink)] hover:border-[var(--rich-pink)]"
                        : "bg-black/3 border-black/10 opacity-40 cursor-not-allowed"}`}
                  >
                    <ChevronLeft className={hasPrev ? "text-black/60" : "text-black/35"} size={18} />
                  </motion.button>

                  {pageList.map((p, i) =>
                    p === "..." ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="h-10 w-10 grid place-items-center text-black/30 font-extrabold"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => goToPage(p)}
                        className={`h-10 w-10 rounded-xl border font-extrabold text-[13px] transition
                          ${p === currentPage
                            ? "bg-[var(--rich-pink)] text-white border-[var(--rich-pink)] shadow-[0_12px_26px_rgba(236,72,153,0.25)]"
                            : "bg-white text-black/55 border-black/10 hover:bg-[var(--rich-pink)] hover:text-white hover:border-[var(--rich-pink)]"
                          }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                  <motion.button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={!hasNext}
                    whileHover={hasNext ? { y: -1 } : {}}
                    whileTap={hasNext ? { scale: 0.98 } : {}}
                    className={`h-10 w-10 rounded-xl border grid place-items-center transition
                      ${hasNext
                        ? "bg-black/5 border-black/10 hover:bg-[var(--rich-pink)] hover:border-[var(--rich-pink)]"
                        : "bg-black/3 border-black/10 opacity-40 cursor-not-allowed"}`}
                  >
                    <ChevronRight className={hasNext ? "text-black/60" : "text-black/35"} size={18} />
                  </motion.button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}