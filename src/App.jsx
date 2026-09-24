import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/homepage.jsx";
import Blogs from "./components/Blogs";
import BlogsbyCategories from "./components/BlogsbyCategories.jsx";
import BabyNames from "./components/baby-names";
import PregnancyQuestionsCenter from "./components/PregnancyQuestionsCenter";
import JourneyDetail from "./components/JourneyDetail";
import PregnancyDueDateCalculatorPage from "./components/PregnancyDueDateCalendar";
import FreeHelpline from "./components/FreeLiveHelpline";
import OvulationCalendar from "./components/OvulationCalendar";
import PregnancyQuiz from "./components/PregnancyQuiz";
import PregnancyResources from "./components/PregnancyResources";
import ContactusPage from './pages/contactus.jsx';
import Ovulationcalculator from './tools/OvulationCalculator.jsx';
import Duedatecalculator from './tools/PregnancyCalculator.jsx';
import PregnancyWeighgainercalculator from './tools/PregnancyWeightCalculator.jsx';
import ConceptionDateCalculator from './tools/ConceptionDateCalculator.jsx';
import IVFDueDateCalculator from './tools/IVFDueDateCalculator.jsx';
import Chinesegenderpredictor from './tools/Chinesegenderpredictor.jsx';
import Birthchartcalculator from './tools/Birthchartcalculator.jsx';
import SingleBlogPost from './components/SingleBlogPost.jsx';
import Bookappointment from './pages/bookappointmentform.jsx';
import SiteScraper from './components/SiteZipDownloader.jsx';
import Privacypolcy from './pages/Privacypolicy.jsx';
import Refundpolicy from './pages/Refundpolicy.jsx';
import TermsandconditionsPage from './pages/termsandconditions.jsx'
import AboutUsPage from './pages/AboutusPages.jsx';
import "./i18n";



export default function App() {
  return (
    <div id="top" className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogsbyCategories />} />
          <Route path="/blog/:slug" element={<SingleBlogPost/>} />

          <Route path="/baby-names" element={<BabyNames />} />
          <Route path="/pregnancyquestionscenter" element={<PregnancyQuestionsCenter />} />
          <Route path="/journey/:id" element={<JourneyDetail />} />

          <Route path="/free-live-helpline" element={<FreeHelpline />} />
          <Route path="/tools/ovulation-calendar" element={<OvulationCalendar />} />
          <Route path="/tools/due-date" element={<PregnancyDueDateCalculatorPage />} />
          <Route path="/tools/pregnancy-quiz" element={<PregnancyQuiz />} />
          <Route path="/pregnancy-resources" element={<PregnancyResources />} />

          <Route path="/babyNames" element={<Navigate to="/baby-names" replace />} />
          <Route path="/babyname" element={<Navigate to="/baby-names" replace />} />
          <Route path="/baby-name" element={<Navigate to="/baby-names" replace />} />
          <Route path="/tools/baby-names" element={<Navigate to="/baby-names" replace />} />
          <Route path="/contact-us" element={<ContactusPage/>}></Route>
          <Route path='/book-appointment' element={<Bookappointment/>}></Route>
          <Route path="/privacypolicy" element={<Privacypolcy/>}></Route>
          <Route path='/refundpolicy' element={<Refundpolicy/>}></Route>
          <Route path="/terms-and-conditions" element={<TermsandconditionsPage/>}></Route>
          <Route path="/about" element={<AboutUsPage/>}></Route>


          {/* Tools Routes */}
          <Route path="/ovulation-calculator" element={<Ovulationcalculator/>}></Route>
          <Route path="/due-date-calculator" element={<Duedatecalculator/>}></Route>
          <Route path="/pregnancy-weight-gain-calculator" element={<PregnancyWeighgainercalculator/>}></Route>
          <Route path="/conception-date-calculator" element={<ConceptionDateCalculator/>}></Route>
          <Route path="/ivf-due-date-calculator" element={<IVFDueDateCalculator />} />
          <Route path="/chinese-gender-predictor" element={<Chinesegenderpredictor />} />
          <Route path="/birth-chart-calculator" element={<Birthchartcalculator />} />
          <Route path='/siteextractor' element={<SiteScraper/>}></Route>

          <Route path="*" element={<div className="p-10 font-bold">Page not found</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}