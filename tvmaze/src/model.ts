const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

interface IShows {
  show: {
    id: number,
    name: string,
    summary: string,
    image: string,
  }
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

async function searchShowsByTerm(term: "string"): Promise<[]> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  const params = new URLSearchParams({q: term});

  const res = await fetch(`${TVMAZE_API_URL}/search/shows?${params}`);

  let showsData = await res.json();

  console.log("This is showsData: ", showsData);

  showsData.map(results => (
    const singleShow = results.show;
    {
      id: singleShow.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image.image : MISSING_IMAGE_URL
  }
  ));

  return showsData;
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: "string"): Promise<IShow> {

  const res = await fetch(`${TVMAZE_API_URL}/lookup/shows/${id}/episodes`);

  const showData = await res.json();

  return showData;
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};