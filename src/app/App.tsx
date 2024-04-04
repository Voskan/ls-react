import { useTheme } from "@/hooks/useTheme";
import AboutPageAsync from "@/pages/AboutPage/AboutPage.async";
import MainPageAsync from "@/pages/MainPage/MainPage.async";
import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";

const App = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-red-500 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className="text-white px-3 py-2 rounded-md text-md font-medium"
              >
                Main
              </Link>
              <Link
                to="/about"
                className="text-white px-3 py-2 rounded-md text-md font-medium"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <button
          className="absolute top-0 right-0 m-5 p-2 rounded-md bg-white text-black"
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          {mode === "dark" ? "Light" : "Dark"}
        </button>
      </div>
      <div className="flex-grow py-5">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainPageAsync />} />
            <Route path="/about" element={<AboutPageAsync />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
