const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

interface IShowsAPIResults {
  show: {
    id: number,
    name: string,
    summary: string,
    image: {
      medium: string | null
    };
  };
}

interface IShows {
  id: number,
  name: string,
  summary: string,
  image: string,
}

interface IEpisodeAPIResult {
  id: number,
  name: string,
  season: number,
  number: number,
}

interface IEpisodeOfShow {
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

  const showsData: IShowsAPIResults[] = await res.json();

  console.log("This is showsData: ", showsData);

  return showsData.map(result => {
    const show = result.show;
    return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image?.medium || MISSING_IMAGE_URL
    };
  });
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

  const showData: IEpisodeAPIResult[] = await res.json();

  console.log("This is showData: ", showData);



  return showData.map(s => ({
    id: s.id,
    name: s.name,
    season: s.season,
    number: s.number
  }));

}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};