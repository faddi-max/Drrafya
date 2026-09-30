import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MessageSquare,
  PhoneCall,
  CalendarDays,
  Calculator,
  MapPin,
  HelpCircle,
} from "lucide-react";

const categories = [
  "All Topics",
  "Unplanned Pregnancy",
  "Getting Pregnant",
  "Healthy Pregnancy",
  "Giving Birth",
  "Postpartum",
];

const topics = [
  {
    id: 1,
    title: "Omega-3 and Pregnancy",
    category: "Healthy Pregnancy",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "GIFT (Gamete Transfer)",
    category: "Getting Pregnant",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Period Changes",
    category: "Unplanned Pregnancy",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Infant Development",
    category: "Postpartum",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Rapid Labor",
    category: "Giving Birth",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Hair Treatments",
    category: "Healthy Pregnancy",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Ovulation FAQs",
    category: "Getting Pregnant",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Child Support",
    category: "Unplanned Pregnancy",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Umbilical Cord Care",
    category: "Postpartum",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Hives and Pregnancy",
    category: "Healthy Pregnancy",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
  },
];

const toolItems = [
  {
    title: "Ovulation",
    icon: CalendarDays,
    href: "/tools/ovulation-calendar",
  },
  {
    title: "Due Date",
    icon: Calculator,
    href: "/tools/due-date",
  },
  {
    title: "Quiz",
    icon: HelpCircle,
    href: "/tools/pregnancy-quiz",
  },
  {
    title: "Provider",
    icon: MapPin,
    href: "/contact-us",
  },
];

function TopicCard({ topic }) {
  return (
    <Link
      to="/pregnancyquestionscenter/early-signs-of-pregnancy"
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      aria-label={`Read ${topic.title}`}
    >
      <div className="overflow-hidden">
        <img
          src={topic.image}
          alt={topic.title}
          loading="lazy"
          className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-44"
        />
      </div>

      <div className="p-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-600">
          {topic.category}
        </p>

        <h3 className="text-sm font-bold leading-5 text-slate-900 sm:text-[15px]">
          {topic.title}
        </h3>

        <span className="mt-3 inline-flex text-xs font-semibold text-pink-600 transition-colors group-hover:text-pink-700">
          Read More →
        </span>
      </div>
    </Link>
  );
}

function ToolButton({ item }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-3 text-left text-white transition-all duration-300 hover:translate-x-1 hover:bg-white/12"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
        <Icon className="h-4 w-4 text-yellow-400" />
      </span>

      <span className="text-sm font-medium">
        {item.title}
      </span>
    </Link>
  );
}

export default function PregnancyQuestionsCenter() {
  const [activeCategory, setActiveCategory] =
    useState("All Topics");

  const [search, setSearch] = useState("");

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();

    return topics.filter((topic) => {
      const matchesCategory =
        activeCategory === "All Topics" ||
        topic.category === activeCategory;

      const matchesSearch =
        !query ||
        topic.title.toLowerCase().includes(query) ||
        topic.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-slate-900">

      {/* =========================
          HERO
      ========================= */}
      <section className="bg-gradient-to-r from-pink-600 via-pink-600 to-pink-500">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Pregnancy Questions Center
          </h1>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-yellow-400" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-pink-50 sm:text-base">
            Trusted information for your most requested
            questions. Search our database or explore topics
            below.
          </p>
        </div>
      </section>

      {/* =========================
          TOPICS
      ========================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* Search + Categories */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search for a topic or question..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active =
                activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setActiveCategory(cat)
                  }
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                    active
                      ? "bg-pink-600 text-white shadow-md"
                      : "bg-transparent text-slate-600 hover:bg-white hover:text-pink-600"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
            <Search className="mx-auto h-8 w-8 text-slate-300" />

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No topics found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search term or select a
              different category.
            </p>
          </div>
        )}

        {/* Load More */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-pink-500 bg-white px-6 py-3 text-sm font-semibold text-pink-600 transition-all duration-300 hover:bg-pink-600 hover:text-white hover:shadow-md"
          >
            Load More Topics
          </button>
        </div>
      </section>

      {/* =========================
          BOTTOM CTA
      ========================= */}
      <section className="overflow-hidden bg-gradient-to-r from-[#081634] via-[#0d1736] to-[#2d1438]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">

          {/* Left */}
          <div className="text-white">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">
              Support Center
            </p>

            <h2 className="max-w-md text-3xl font-extrabold leading-tight sm:text-4xl">
              Every Pregnancy Comes with Questions
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Our live team is here to support you.
              Chat with a real person or talk with a
              pregnancy advisor today.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              {/* Call */}
              <a
                href="tel:1-800-672-2296"
                className="flex items-center gap-4 rounded-2xl bg-white/6 px-4 py-4 transition hover:bg-white/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600">
                  <PhoneCall className="h-5 w-5 text-white" />
                </div>

                <div>
                  <p className="text-xs text-slate-300">
                    Call Us
                  </p>

                  <p className="font-bold">
                    1-800-672-2296
                  </p>
                </div>
              </a>

              {/* Live Chat */}
              <a
                href="/free-live-helpline"
                className="flex items-center gap-4 rounded-2xl bg-white/6 px-4 py-4 transition hover:bg-white/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>

                <div>
                  <p className="text-xs text-slate-300">
                    Live Chat
                  </p>

                  <p className="font-bold">
                    Free Text Chat
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-[28px] bg-white/6 p-6 backdrop-blur-sm sm:p-8">

            <div className="mb-6 flex items-center gap-3 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600">
                <Calculator className="h-5 w-5" />
              </span>

              <h3 className="text-xl font-bold">
                Try Our Tools
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {toolItems.map((item) => (
                <ToolButton
                  key={item.title}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}