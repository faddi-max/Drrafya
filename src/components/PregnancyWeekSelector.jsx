import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./PregnancyWeekSelector.css";
import { useTranslation } from "react-i18next";

// Comprehensive weeks data with fruit/size metaphors
const weeksData = [
  { week: 1, size: "Cell Stage", emoji: "🔬" },
  { week: 2, size: "Fertilization", emoji: "🧬" },
  { week: 3, size: "Implantation", emoji: "🌱" },
  { week: 4, size: "Poppy Seed", emoji: "⚫" },
  { week: 5, size: "Apple Seed", emoji: "🍎" },
  { week: 6, size: "Sweet Pea", emoji: "🫛" },
  { week: 7, size: "Blueberry", emoji: "🫐" },
  { week: 8, size: "Raspberry", emoji: "🍓" },
  { week: 9, size: "Green Olive", emoji: "🫒" },
  { week: 10, size: "Prune", emoji: "🫐" },
  { week: 11, size: "Strawberry", emoji: "🍓" },
  { week: 12, size: "Lime", emoji: "🍋‍🟩" },
  { week: 13, size: "Lemon", emoji: "🍋" },
  { week: 14, size: "Nectarine", emoji: "🍑" },
  { week: 15, size: "Pear", emoji: "🍐" },
  { week: 16, size: "Avocado", emoji: "🥑" },
  { week: 17, size: "Turnip", emoji: "🧅" },
  { week: 18, size: "Bell Pepper", emoji: "🫑" },
  { week: 19, size: "Mango", emoji: "🥭" },
  { week: 20, size: "Banana", emoji: "🍌" },
  { week: 21, size: "Carrot", emoji: "🥕" },
  { week: 22, size: "Spaghetti Squash", emoji: "🎃" },
  { week: 23, size: "Large Mango", emoji: "🥭" },
  { week: 24, size: "Ear of Corn", emoji: "🌽" },
  { week: 25, size: "Eggplant", emoji: "🍆" },
  { week: 26, size: "Zucchini", emoji: "🥒" },
  { week: 27, size: "Cauliflower", emoji: "🥦" },
  { week: 28, size: "Eggplant", emoji: "🍆" },
  { week: 29, size: "Butternut Squash", emoji: "🫒" },
  { week: 30, size: "Cabbage", emoji: "🥬" },
  { week: 31, size: "Coconut", emoji: "🥥" },
  { week: 32, size: "Jicama", emoji: "🥔" },
  { week: 33, size: "Pineapple", emoji: "🍍" },
  { week: 34, size: "Cantaloupe", emoji: "🍈" },
  { week: 35, size: "Honeydew", emoji: "🍈" },
  { week: 36, size: "Romaine", emoji: "🥬" },
  { week: 37, size: "Swiss Chard", emoji: "🌿" },
  { week: 38, size: "Leek", emoji: "🥬" },
  { week: 39, size: "Watermelon", emoji: "🍉" },
  { week: 40, size: "Pumpkin", emoji: "🎃" },
  { week: 41, size: "Jackfruit", emoji: "🍈" },
  { week: 42, size: "Large Watermelon", emoji: "🍉" },
];

export default function PregnancyWeekSelector({ onSelectWeek }) {
  const { t, i18n } = useTranslation();

  const scrollRef = useRef(null);
  const [selectedWeek, setSelectedWeek] = useState(12);

  const isRTL =
    i18n.language?.toLowerCase().startsWith("ur") ||
    i18n.language?.toLowerCase().startsWith("ar");

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;

      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleWeekClick = (weekObj) => {
    setSelectedWeek(weekObj.week);

    if (onSelectWeek) {
      onSelectWeek(weekObj);
    }
  };

  return (
    <section
      className="pw-section"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="pw-container">

        {/* HEADER */}
        <div className="pw-header">
          <div className="pw-badge-wrapper">
            <span className="pw-badge-dot" />

            <p className="pw-badge-text">
              {t("WEEK BY WEEK GUIDE")}
            </p>
          </div>

          <h3 className="pw-title">
            {t("Jump to Your")}{" "}
            <span className="pw-title-accent">
              {t("Week of Pregnancy")}
            </span>
          </h3>
        </div>

        {/* CAROUSEL CONTROLS & TRACK */}
        <div className="pw-carousel-wrapper">

          <button
            type="button"
            className="pw-nav-btn pw-nav-btn-left"
            onClick={() => scroll("left")}
            aria-label={t("Scroll Left")}
          >
            <ChevronLeft size={22} />
          </button>

          <div
            className="pw-carousel-track"
            ref={scrollRef}
          >
            {weeksData.map((item) => {
              const isActive = selectedWeek === item.week;

              return (
                <div
                  key={item.week}
                  className={`pw-card ${isActive ? "active" : ""}`}
                  onClick={() => handleWeekClick(item)}
                >
                  <div className="pw-icon-container">
                    {item.emoji}
                  </div>

                  <h4 className="pw-week-title">
                    {t("Pregnancy")}
                    <br />
                    {t("Week")} {item.week}
                  </h4>

                  <p className="pw-size-hint">
                    {t(item.size)}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="pw-nav-btn pw-nav-btn-right"
            onClick={() => scroll("right")}
            aria-label={t("Scroll Right")}
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </div>
    </section>
  );
}