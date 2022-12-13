const BASE_URL = `https://api.datamuse.com`;

const fetchSynonyms = async (word: string) => {
  const response = await (
    await fetch(`${BASE_URL}/words?rel_syn=${word}`)
  ).json();

  return response;
};

export default fetchSynonyms;