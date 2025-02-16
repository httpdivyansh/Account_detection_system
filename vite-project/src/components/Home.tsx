import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-4 sm:px-6 sm:pt-48 lg:pt-56 lg:px-8">
      <aside className="text-center relative overflow-hidden text-black rounded-lg w-full max-w-4xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase leading-tight">
          <div>
            <span className="text-[#EFE9D5] text-4xl sm:text-5xl md:text-6xl font-bold uppercase">Fake Account Detection</span>
            <span className="text-[#71BBB2] text-4xl sm:text-5xl md:text-6xl font-bold uppercase"> using a click</span>
          </div>
        </h2>
      </aside>

      <Link to="/App">
        <div className="flex items-center justify-center mt-6 sm:mt-10">
          <button className="bg-blue-600 text-white font-semibold text-lg px-6 py-3 rounded-md transition duration-300 hover:bg-blue-700 focus:outline-none">
            Click to Analyze!
          </button>
        </div>
      </Link>
    </div>
  );
}
