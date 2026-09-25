import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import "./TrendingBlogs.css";
import { getlatestblogs } from "../controllers/Blogs/getlatestblogs.jsx";
import { imageurl } from "../constant/Basurl.jsx";
import { useTranslation } from "react-i18next";

export default function TrendingBlogs() {
  const { t, i18n } = useTranslation();

  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await getlatestblogs();

        if (response && response.blogs) {
          setBlogsData(response.blogs);
        }
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const currentLanguage = i18n.language?.toLowerCase() || "en";

  const locale = currentLanguage.startsWith("ur")
    ? "ur-PK"
    : currentLanguage.startsWith("ar")
      ? "ar"
      : "en-US";

  const isRTL =
    currentLanguage.startsWith("ur") ||
    currentLanguage.startsWith("ar");

  if (loading) {
    return (
      <div
        className="text-center py-12 text-gray-500"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {t("Loading latest insights...")}
      </div>
    );
  }

  return (
    <section
      className="trending-blogs-section"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="blogs-container">

        {/* SECTION HEADER */}
        <div className="blogs-header">
          <div>
            <span className="section-tag">
              {t("Latest Medical Insights")}
            </span>

            <h2 className="blogs-title">
              {t("Trending Healthcare Articles")}
            </h2>

            <p className="blogs-subtitle">
              {t(
                "Expertly curated reads on women's life stages, clinical advice, and wellness tips."
              )}
            </p>
          </div>

          <a href="/blogs" className="btn-view-all">
            <span>{t("Explore All Articles")}</span>
            <ArrowRight size={18} />
          </a>
        </div>

        {/* 2 ROWS x 3 COLUMNS GRID */}
        <div className="blogs-grid">
          {blogsData.map((blog, index) => {
            // Clean excerpt safely
            const rawExcerpt = blog.excerpt || "";

            const cleanExcerpt = rawExcerpt
              .replace(/&hellip;/g, "...")
              .replace(/<\/?[^>]+(>|$)/g, "");

            // Format date according to selected language
            const formattedDate = blog.created_at
              ? new Date(blog.created_at).toLocaleDateString(locale, {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "";

            return (
              <motion.a
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                {/* IMAGE BOX */}
                <div className="card-image-box">
                  <img
                    src={
                      blog.image_url
                        ? `${imageurl}${blog.image_url}`
                        : "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80"
                    }
                    alt={blog.title}
                    className="card-img"
                  />

                  <span className="category-badge">
                    {blog.category?.title || t("Wellness")}
                  </span>
                </div>

                {/* CARD BODY */}
                <div className="card-content">
                  <div>
                    <div className="card-meta">
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>{formattedDate}</span>
                      </div>

                      <span>•</span>

                      <div className="meta-item">
                        <Clock size={14} />

                        <span>
                          {blog.read_time
                            ? `${blog.read_time} ${t("min read")}`
                            : `5 ${t("min read")}`}
                        </span>
                      </div>
                    </div>

                    <h3 className="blog-card-title">
                      {blog.title}
                    </h3>

                    <p className="blog-card-snippet">
                      {cleanExcerpt}
                    </p>
                  </div>

                  {/* FOOTER LINK */}
                  <div className="card-footer">
                    <span className="read-more-text">
                      {t("Read Article")}
                      <ArrowRight
                        size={16}
                        className="arrow-icon"
                      />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}