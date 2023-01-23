import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuote } from "./api/quote.api";

function App() {
  const [quote, setQuote] = useState({
    text: `Impossible is just a big word thrown around by small men who find it easier to live in the world they've been given than to explore the power they have to change it. Impossible is not a fact. It's an opinion. Impossible is not a declaration. It's a dare. Impossible is potential. Impossible is temporary. Impossible is nothing.`,
    author: "Muhammad Ali",
  });
  const [generateQuote, setGenerateQuote] = useState(false);

  const quoteQuery = useQuery(["quote"], getQuote, {
    enabled: generateQuote || !quote.text,
    onSuccess: (data) => {
      setQuote(data);
      setGenerateQuote(false);
    },
    onError: (error) => {
      console.log(error);
      setGenerateQuote(false);
    },
  });

  return (
    <div className=" min-h-[100vh] flex justify-center items-center gap-3">
      <div className="card flex flex-col justify-around items-center ">
        <p className="my-2 px-5 py-2 ">
          {quote.text.length >= 120 ? (
            <i className="fas fa-quote-left text-8xl" />
          ) : (
            <i className="fas fa-quote-left text-6xl" />
          )}

          <span
            className={`font-bold px-3 text-center text-[1.8rem] lg:text-[2rem] text-gray-900 `}
          >
            {quote?.text}
          </span>
        </p>
        <span className="mx-3 font-semibold text-2xl text-gray-700">
          {" "}
          - {quote.author ? quote.author : "unknown"} -{" "}
        </span>

        <div className="w-full flex justify-end">
          <button
            className="btn"
            title="generate new quote"
            onClick={() => setGenerateQuote(true)}
            disabled={generateQuote}
          >
            {generateQuote ? "generating..." : "New Quote"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
