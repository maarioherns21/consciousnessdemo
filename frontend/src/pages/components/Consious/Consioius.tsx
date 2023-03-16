import { FC, useEffect, useState } from "react";
import Results from "../Results/Results";
import SearchForm from "../SearchForm/SearchForm";
// https://0cunqbxr63.execute-api.us-west-1.amazonaws.com/prod/
const ConciousAi: FC = () => {
  
  const [prompt, setPrompt] = useState("");
  const [question, setQuestion] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [hasResult, setHasResult] = useState(false);
  const CHARACTER_LIMIT = 50;
  const [isLoading, setIsLoading] =useState(false);



//this  is how we fetch the data from aws 
  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await fetch(`https://0cunqbxr63.execute-api.us-west-1.amazonaws.com/prod/ai_snippets?prompt=${prompt}`);
    const keyword = await fetch(`https://0cunqbxr63.execute-api.us-west-1.amazonaws.com/prod/generate_keywords?prompt=${prompt}`);
    const data2 = await  keyword.json()
    const data = await res.json();
    console.log(data, data2);
    onResult(data, data2);
  };



  const onResult = (data: any, data2: any) => {
    setQuestion(data.results);
    setKeywords(data2.keywords);
    setHasResult(true);
    setIsLoading(false)
  };

  const onReset = () => {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false)
  };

  let displayElement = null;



  if (hasResult) {
    displayElement = (
      <Results
        onBack={onReset}
        question={question}
        keywords={keywords}
        prompt={prompt}
      />
    );
  } else {
    displayElement = (
      <SearchForm
        handleSubmit={handleSubmit}
        setPrompt={setPrompt}
        resultsElement={displayElement}
        characterLimit={CHARACTER_LIMIT}
        prompt={prompt}
        isLoading={isLoading}
      />
    );
  }

  return (
    <>
     <div className="h-screen flex">
      <div className="max-w-xl m-auto p-2">
        <div className="bg-slate-800 p-6 rounded-md text-white">
          <div className="text-center my-6">
            <h1 className=" text-3xl font-light">
             ConsiousAI
            </h1>
            <div>Your ConsiousAI assistant</div>
          </div>
          {displayElement}
        </div>
      </div>
    </div>
    </>
  );
};


export default ConciousAi;
