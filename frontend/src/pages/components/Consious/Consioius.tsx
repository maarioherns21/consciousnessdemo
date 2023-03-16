import { Player } from "@lottiefiles/react-lottie-player";
import { FC, useState } from "react";
import Results from "../Results/Results";
import SearchForm from "../SearchForm/SearchForm";


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
  <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
      <Player src='https://assets8.lottiefiles.com/packages/lf20_Uzc4GaHaBw.json' loop  autoplay style={{height:"100px", display: "flex" }}  />
      <br/>
				<div className="text-2xl font-semibold">
					<h1>Consious AI</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
						{displayElement}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
    </>
  );
};


export default ConciousAi;
