import { FC } from "react";

interface Props {
  prompt: string;
  setPrompt: any;
  resultsElement: any;
  handleSubmit: any;
  characterLimit: number;
  isLoading: boolean;
}

const SearchForm: FC<Props> = ({
  handleSubmit,
  setPrompt,
  resultsElement,
  prompt,
  characterLimit,
  isLoading,
}) => {
  //   const characterLimit = 32;
  const isPromptValid = prompt.length >= characterLimit;
  const updatePromptValue = (text: string) => {
    if (text.length <= characterLimit) {
      setPrompt(text);
    }
  };

  return (
    <div className="mb-6 text-slate-400">
      <p className="pb-2">tell me what worries you and i will generate a response</p>
      <input
      className="p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700"
        type="text"
        placeholder="Coffe"
        value={prompt}
        onChange={(e) => updatePromptValue(e.target.value)}
      ></input>
      <div className="p-2">
        {prompt.length}/{characterLimit}
      </div>
      <button
      className="bg-gradient-to-r from-teal-400 
      to-blue-500 text-white disabled:opacity-50 w-full p-2 rounded-md text-lg"
       onClick={handleSubmit} disabled={isLoading || isPromptValid}>
        Submit
      </button>
      {resultsElement}
    </div>
  );
};

export default SearchForm;
