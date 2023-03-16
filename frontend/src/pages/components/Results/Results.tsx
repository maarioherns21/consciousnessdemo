import { FC } from "react";

interface Props {
  question: String;
  keywords: never[];
  onBack: any;
  prompt: String;
}

const Results: FC<Props> = ({ question, keywords, onBack, prompt }) => {
    const keywordElements = [];
    for (let i = 0; i < keywords.length; i++) {
      const element = (
        <div  key={i}  className="bg-teal-200 p-1 text-teal-700 px-2 text-sm rounded-lg">#{keywords[i]}
        </div>
      );
      keywordElements.push(element);
    }
  
    const keywordElementsHolder = (
      <div className="flex flex-wrap gap-2">{keywordElements}</div>
    );
  
    const resultSection = (label: string, body: any) => {
      return (
        <div className=" bg-gray-100 p-1 my-2 rounded-md">
          <div className="text-white-400 text-md font-bold mb-4">{label}</div>
          <div className="pb-2 justify-center" >{body}</div>
        </div>
      );
    };
  
    return (
      <>
      <div className="mb-6">
          {resultSection(
            "Question",
            <div className="text-lg ">{prompt}</div>
          )}
          {resultSection("Consciousness", question)}
          {resultSection("Keywords", keywordElementsHolder)}
        </div>
        <button
          className="bg-gradient-to-r from-teal-400 text-white
          to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
          onClick={onBack}
        >
          Back
        </button>
      </>
    );
  };

export default Results;
