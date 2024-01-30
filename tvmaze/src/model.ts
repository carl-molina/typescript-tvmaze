const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

interface IShowsAPI {
  show: {
    id: number,
    name: string,
    summary: string,
    image: {
      medium: string,
      // TODO: handle if the image doesn't show up (image: null)
    };
  };
}

interface IShows {
  id: number,
  name: string,
  summary: string,
  image: string,
}

interface IShowAPI {
  id: number,
  name: string,
  season: number,
  number: number,
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

async function searchShowsByTerm(term: string): Promise<IShows[]> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  const params = new URLSearchParams({ q: term });

  const res = await fetch(`${TVMAZE_API_URL}/search/shows?${params}`);

  const showsData: IShowsAPI[] = await res.json();
  // TODO: IShowsAPI not descriptive enough, try "IShowsResults"

  console.log("This is showsData: ", showsData);

  // TODO: store s in a variable and map through that instead
  // consider returning the whole map instead "return showsData.map(...)"
  const filteredShowsData = showsData.map(s => ({
    id: s.show.id,
    name: s.show.name,
    summary: s.show.summary,
    image: s.show.image ? s.show.image.medium : MISSING_IMAGE_URL,
    // image: s.show.image.medium || MISSING_IMAGE_URL,
    // TODO: shorter way: s.show.image.medium || MISSING_IMAGE_URL
  }));

  return filteredShowsData;
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number): (Promise<IShow[]>) {

  const res: Response = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);

  console.log('This is res obj: ', res);

  if (res.status === 404) {
    throw new Error("404");
  }

  const showData: IShowAPI[] = await res.json();
  // TODO: be more descriptive, try "IEpisode"

  console.log("This is showData: ", showData);


  // TODO: return map instead of storing in variable
  const filteredShowData: IShow[] = showData.map(s => ({
    id: s.id,
    name: s.name,
    season: s.season,
    number: s.number
  }));
  // TODO: better name "IEpisodeOfShow"

  console.log("This is filteredShowData: ", filteredShowData);

  return filteredShowData;
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};