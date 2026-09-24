import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mail,
  ArrowRight,
  FolderHeart,
  Loader2
} from "lucide-react";

// API function ko import karein apne file path ke mutabiq
import { getallcategories } from "../controllers/categories/getallcategories.jsx"; 

const ease = [0.22, 1, 0.36, 1];
const categoryIcons = ["🌸", "🌷", "🌺", "🌼", "🌻"];

const POSTS = [
  {
    id: 1,
    featured: true,
    category: "Gynecology Tip",
    read: "6 min read",
    title: "Understanding PCOS: Beyond the Symptoms",
    excerpt:
      "PCOS is more than just irregular cycles. Learn about the metabolic and hormonal impact it has on your body.",
    author: "Dr. Rafiya Zahir",
    date: "Oct 24, 2026",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Pregnancy Care",
    read: "5 min read",
    title: "Nutrition Secrets for a Healthy Pregnancy",
    excerpt:
      "What you eat matters now more than ever. Discover essential micronutrients every expecting mother needs.",
    author: "Dr. Rafiya Zahir",
    date: "Nov 12, 2026",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Fertility & Conception",
    read: "4 min read",
    title: "Mastering the Art of Stress Management",
    excerpt:
      "Hormonal balance and stress are deeply linked. Explore practical techniques to maintain balance.",
    author: "Dr. Rafiya Zahir",
    date: "Dec 05, 2026",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
  },
];

const pageWrap = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function Blogs() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [page, setPage] = useState(1);
  const [hoverCatId, setHoverCatId] = useState(null);

  // API Call Execution
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const res = await getallcategories();
        if (res && res.success && Array.isArray(res.data)) {
          setCategories(res.data);
        } else if (Array.isArray(res)) {
          setCategories(res);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const filteredCats = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.filter((c) => {
      const matchesCat = activeCat === "All" || c.title === activeCat;
      const matchesQuery =
        !q ||
        c.title?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, activeCat, categories]);

  const PER = 4;
  const totalPages = Math.max(1, Math.ceil(filteredCats.length / PER));
  const pageCats = filteredCats.slice((page - 1) * PER, (page - 1) * PER + PER);

  return (
    <main className="bg-[#fbfbfd]">
      <div className="pt-8 md:pt-10" />

      <motion.section
        variants={pageWrap}
        initial="hidden"
        animate="show"
        className="containerX pb-14"
      >
        {/* HERO HEADING */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="text-[34px] md:text-[46px] font-black tracking-tight text-[#0b1020]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Explore Wellness{" "}
            <span className="text-[var(--rich-pink)]">Categories</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="mt-3 text-[13px] md:text-[14px] text-black/55 max-w-2xl mx-auto"
          >
            Browse through specialized domains designed to provide tailored medical insights and guidance.
          </motion.p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8">
          {/* LEFT: MODERN CATEGORIES GRID */}
          <div>
            {loading ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 bg-white rounded-[22px] border border-black/10">
                <Loader2 className="animate-spin text-[var(--rich-pink)]" size={32} />
                <p className="text-[13px] font-semibold text-black/50">Loading categories...</p>
              </div>
            ) : error ? (
              <div className="min-h-[400px] flex items-center justify-center bg-white rounded-[22px] border border-black/10 p-6">
                <p className="text-[14px] font-extrabold text-red-500">{error}</p>
              </div>
            ) : pageCats.length === 0 ? (
              <div className="min-h-[400px] flex items-center justify-center bg-white rounded-[22px] border border-black/10 p-6">
                <p className="text-[14px] font-semibold text-black/50">No categories found matching your criteria.</p>
              </div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {pageCats.map((cat) => {
                  const isHovered = hoverCatId === cat.id;

                  return (
                    <motion.article
                      key={cat.id}
                      variants={item}
                      onMouseEnter={() => setHoverCatId(cat.id)}
                      onMouseLeave={() => setHoverCatId(null)}
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="group relative rounded-[22px] bg-white border border-black/10 overflow-hidden cursor-pointer flex flex-col justify-between"
                      style={{
                        borderColor: isHovered
                          ? "rgba(236,72,153,0.30)"
                          : "rgba(0,0,0,0.10)",
                        boxShadow: isHovered
                          ? "0 22px 60px rgba(0,0,0,0.10)"
                          : "0 14px 45px rgba(0,0,0,0.06)",
                      }}
                    >
                      {/* Visual Banner */}
                      <div className="relative h-[190px] overflow-hidden bg-black/5">
                        <motion.img
                          src={cat.image_url}
                          alt={cat.title}
                          className="h-full w-full object-cover"
                          animate={{ scale: isHovered ? 1.08 : 1 }}
                          transition={{ duration: 0.5, ease }}
                        />
                        
                        {/* Gradient Backdrop */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                        {/* Top Badge */}
                       
                        {/* Bottom Banner Title */}
                        <div className="absolute bottom-4 left-5 right-5">
                          <h2 className="text-white text-[20px] font-black leading-tight drop-shadow-sm">
                            {cat.title}
                          </h2>
                        </div>
                      </div>

                      {/* Card Content Footer */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <p className="text-[13px] text-black/60 leading-relaxed line-clamp-3">
                          {cat.description}
                        </p>

                        <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between">
                          <Link
  to={`/blogs/${cat.slug}`}
  className="text-[12px] font-extrabold text-[#0b1020] inline-flex items-center gap-1.5 hover:text-[var(--rich-pink)] transition"
>
  <FolderHeart size={15} className="text-[var(--rich-pink)]" />
  Explore Topic
</Link>

                          <motion.div
                            className="h-8 w-8 rounded-full bg-[var(--rich-pink)]/10 text-[var(--rich-pink)] grid place-items-center"
                            animate={{
                              x: isHovered ? 4 : 0,
                              backgroundColor: isHovered ? "var(--rich-pink)" : "rgba(236,72,153,0.10)",
                              color: isHovered ? "#ffffff" : "var(--rich-pink)"
                            }}
                            transition={{ duration: 0.2, ease }}
                          >
                            <ArrowRight size={15} />
                          </motion.div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage((v) => Math.max(1, v - 1))}
                  className="h-10 w-10 rounded-xl border border-black/10 bg-white grid place-items-center hover:bg-black/5 transition"
                >
                  <ChevronLeft size={18} />
                </motion.button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const n = idx + 1;
                  const isActive = n === page;
                  return (
                    <motion.button
                      key={n}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPage(n)}
                      className={`h-10 w-10 rounded-xl border transition font-extrabold text-[13px] ${
                        isActive
                          ? "bg-[var(--rich-pink)] text-white border-[var(--rich-pink)]"
                          : "bg-white border-black/10 hover:bg-black/5"
                      }`}
                    >
                      {n}
                    </motion.button>
                  );
                })}

                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
                  className="h-10 w-10 rounded-xl border border-black/10 bg-white grid place-items-center hover:bg-black/5 transition"
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (UNTOUCHED) */}
          <aside className="space-y-6">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease }}
              className="rounded-[18px] bg-white border border-black/10 shadow-[0_14px_45px_rgba(0,0,0,0.06)] p-6"
            >
              <p className="font-extrabold text-[13px] text-[#0b1020] flex items-center gap-2">
                <Search size={16} className="text-[var(--rich-pink)]" /> Search Categories
              </p>

              <div className="mt-4">
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search keywords..."
                  className="w-full rounded-2xl bg-black/5 border border-black/10 px-4 py-3 text-[13px] outline-none focus:ring-2 focus:ring-[var(--rich-pink)]/25 transition"
                />
              </div>
            </motion.div>

            {/* Dynamic Sidebar Categories List */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.04, ease }}
              className="rounded-[18px] bg-white border border-black/10 shadow-[0_14px_45px_rgba(0,0,0,0.06)] p-6"
            >
              <p className="font-extrabold text-[13px] text-[#0b1020] flex items-center gap-2">
                <Sparkles size={16} className="text-[var(--rich-pink)]" /> Filter Category
              </p>

              <div className="mt-4 space-y-2">
                <motion.button
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.18, ease }}
                  onClick={() => {
                    setActiveCat("All");
                    setPage(1);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 transition ${
                    activeCat === "All"
                      ? "bg-[var(--rich-pink)]/12 text-[var(--rich-pink)]"
                      : "hover:bg-black/5"
                  }`}
                >
                  <span className="flex items-center gap-2 font-semibold text-[13px]">
                    <span className="w-6 grid place-items-center text-[14px]">🧾</span>
                    All
                  </span>
                  <span className="text-[11px] font-extrabold text-black/40">
                    {categories.length}
                  </span>
                </motion.button>

                {categories.map((c, index) => (
  <motion.button
    key={c.id}
    whileHover={{ x: 3 }}
    transition={{ duration: 0.18, ease }}
    onClick={() => {
      setActiveCat(c.title);
      setPage(1);
    }}
    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 transition ${
      activeCat === c.title
        ? "bg-[var(--rich-pink)]/12 text-[var(--rich-pink)]"
        : "hover:bg-black/5"
    }`}
  >
    <span className="flex items-center gap-2 font-semibold text-[13px]">
      <span className="w-6 grid place-items-center text-[14px]">
        {categoryIcons[index % categoryIcons.length]}
      </span>

      <span className="truncate max-w-[170px] text-left">
        {c.title}
      </span>
    </span>
  </motion.button>
))}
              </div>
            </motion.div>

            {/* Popular Reading */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.08, ease }}
              className="rounded-[18px] bg-white border border-black/10 shadow-[0_14px_45px_rgba(0,0,0,0.06)] p-6"
            >
              <p className="font-extrabold text-[13px] text-[#0b1020]">
                Popular Reading
              </p>

              <div className="mt-4 space-y-3">
                {POSTS.map((p) => (
                  <motion.button
                    key={p.id}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.18, ease }}
                    className="w-full flex items-center gap-3 rounded-xl hover:bg-black/5 p-2 text-left transition"
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-11 w-11 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[12px] font-extrabold text-[#0b1020] truncate">
                        {p.title}
                      </p>
                      <p className="text-[10px] font-semibold text-black/45">
                        {p.date}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-[18px] bg-gradient-to-b from-[var(--rich-pink)] to-[#f06aa6] shadow-[0_24px_80px_rgba(242,139,182,0.35)] p-7 text-white"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/18 grid place-items-center">
                  <Mail size={18} />
                </div>
                <p className="text-[14px] font-extrabold">Weekly Wellness</p>
              </div>

              <p className="mt-2 text-[12px] text-white/85 leading-relaxed">
                Get expert health advice and holistic tips delivered to your inbox every Sunday.
              </p>

              <div className="mt-4 space-y-3">
                <input
                  placeholder="Your email address"
                  className="w-full rounded-2xl bg-white/20 border border-white/25 px-4 py-3 text-[12.5px] outline-none placeholder:text-white/70 focus:ring-2 focus:ring-white/30 transition"
                />
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18, ease }}
                  className="w-full rounded-2xl bg-white text-[var(--rich-pink)] font-extrabold py-3 text-[13px] hover:brightness-95 transition"
                >
                  Subscribe Now
                </motion.button>
              </div>
            </motion.div>
          </aside>
        </div>
      </motion.section>

      <div className="pb-10" />
    </main>
  );
}