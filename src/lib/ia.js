const COHERE_API_KEY = 'XJ3Tx8oPERORSkB9LqZCxbkQ6TTB5XLXpc6VDMVr'
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'
const COHERE_API_DETECT_LANGUAGE_URL = 'https://api.cohere.ai/detect-language'

export async function checkIsEnglish(input) {
  const data = {
    texts: [input]
  }

  const { results } = await fetch(COHERE_API_DETECT_LANGUAGE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `BEARER ${COHERE_API_KEY}`,
      "Content-Type": 'application/json',
      "Cohere-Version": '2022-12-06'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

  const [{ language_code }] = results
  return language_code === 'en'
}

export async function ImproveMyEnglish(input) {
  const prompt = `
    This is a spell checker generator.

  --
  Incorrect sample: "I are good!".
  Correct sample: "I am good!"
  --
  Incorrect sample: "I have 22 years old."
  Correct sample: "I am 22 years old."
  --
  Incorrect sample: "I don't can know"
  Correct sample: "I don't know"
  --
  Incorrect sample: "Me car is vlue"
  Correct sample: "My car is blue"
  --
  Incorrect sample : "${input}"
  Correct sample:`;

  const params = {
    model: "xlarge",
    prompt,
    max_tokens: 40,
    temperature: 0.3,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE"
  };

  try {
    const response = await fetch(COHERE_API_GENERATE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
        "Cohere-Version": "2022-12-06"
      },
      body: JSON.stringify(params)
    });

    const { generations } = await response.json();
    const { text } = generations[0];
    return text.split("\n")[0].replaceAll('"', "");
  } catch (error) {
    console.error(error);
    return "";
  }
}