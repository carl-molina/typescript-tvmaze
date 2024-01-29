const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

interface IShows {
    id: number,
    name: string,
    summary: string,
    image: string,
}

interface IShow {
  id: number,
  name: string,
  season: number,
  number: number,
}


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string): Promise<[IShows]> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  const params = new URLSearchParams({q: term});

  const res = await fetch(`${TVMAZE_API_URL}/search/shows?${params}`);

  let showsData = await res.json();

  console.log("This is showsData: ", showsData);

  const filteredShowsData = showsData.map(s => ({
    id: s.show.id,
    name: s.show.name,
    summary: s.show.summary,
    image: s.show.image ? s.show.image.medium : MISSING_IMAGE_URL,
  }));

  return filteredShowsData;
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number): (Promise<[IShow]> ) {

  const res = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);

  const showData = await res.json();

  console.log("This is showData: ", showData);

  if (showData.status === 404) {
    throw new Error("404");
  }

  const filteredShowData = showData.map(s => ({
    id: s.id,
    name: s.name,
    season: s.season,
    number: s.number
  }))

  console.log("This is filteredShowData: ", filteredShowData);

  return filteredShowData;
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};