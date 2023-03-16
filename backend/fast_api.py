from fastapi import FastAPI, HTTPException
from practice import ai_snippets, generate_keywords
from mangum import Mangum

app = FastAPI()
#this wraps the api end points from FAstAPi so we can add them into lambda funtion 
handler = Mangum(app)
MAX_INPUT_LENGTH = 42


@app.get("/ai_snippets")
async def ai_snippets_api(prompt: str):
    # this validates id the length is greater than 32 char
    validate_input_length(prompt)
    results = ai_snippets(prompt)
    return {"results": results, "keywords": []}


@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    # this validates id the length is greater than 32 char
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    return {"results": None, "keywords": keywords}


@app.get("/ai_snippets_generate_keywords")
async def generate_keywords_api(prompt: str):
    # this validates id the length is greater than 32 char
    validate_input_length(prompt)
    results = ai_snippets(prompt)
    keywords = generate_keywords(prompt)
    return {"results": results, "keywords": keywords}


def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400, detail=f"Input Lenght is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {len(prompt)}")
    pass
