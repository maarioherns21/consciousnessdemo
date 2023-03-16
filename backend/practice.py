import os
import openai
import argparse
import re
from typing import List

MAX_INPUT_LENGTH = 42


def main():

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"Your question is:{user_input}")
    if validate_length(user_input):
        ai_snippets(user_input)
        generate_keywords(user_input)

    else:
        raise ValueError(
            f"Input Lenght is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {len(user_input)}")
    pass

#  validation so it doesnt request that many tokens


def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


def ai_snippets(prompt: str) -> str:
    # this is my api key for open ai
    openai.api_key = os.getenv("OPENAI_API_KEY2")

    enriched_prompt = f"this is what you want: {prompt}"
    print(enriched_prompt)
    #  this is the response and how i want to fetch from the response
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"{enriched_prompt}",
        max_tokens=50,
        temperature=0
    )

    # print(response)
    # this is the response from the json and this is hw we extract the output we want
    brand_text: str = response["choices"][0]["text"]

    # strip method removes all the extra spaces
    brand_text = brand_text.strip()

    # this is how i append the dots at the end with a condition
    last_char = brand_text[-1]
    if last_char not in {".", "!", "?"}:
        brand_text += "..."

    print(f"Results: {brand_text}")
    return brand_text


def generate_keywords(prompt: str) -> List[str]:
    # this is my api key for open ai
    openai.api_key = os.getenv("OPENAI_API_KEY2")

    enriched_prompt = f"Generate related consequences keywords:{prompt}"
    print(enriched_prompt)
    #  this is the response and how i want to fetch from the response
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"{enriched_prompt}",
        max_tokens=50,
        temperature=0
    )

    # print(response)
    # this is the response from the json and this is hw we extract the output we want
    keywords_text: str = response["choices"][0]["text"]

    # strip method removes all the extra spaces
    keywords_text = keywords_text.strip()
    #this regex removes bullet points numebrs
    # r'\s*(?:\d+\.|[A-Za-z]+\))\s*',
    # convert into  a list with regex taking off bullet points and white spaces
    keywords_array = re.split(',|\n|;|-', keywords_text)
    #  loop thorught the  array and strip the white spaces
    keywords_array = [k.lower().strip() for k in keywords_array]
    # only create an array  with the length greater the o
    keywords_array = [k for k in keywords_array if len(k) > 2 and len(k) < 25]

    print(f"Keywords: {keywords_array}")
    return keywords_array


if __name__ == "__main__":
    main()
