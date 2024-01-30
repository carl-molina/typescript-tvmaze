import $ from 'jquery';
import { getEpisodesOfShow, searchShowsByTerm } from "./model.ts";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

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


/** Given list of shows, create markup for each and append to DOM */

function populateShows(shows: IShows[]): void {
  $showsList.empty();
  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image}
              alt="${show.name}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay(): Promise<void> {
  const term = $("#searchForm-term").val() as string; // "as" treats this as string
  const shows = await searchShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt: JQuery.SubmitEvent) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given list of episodes, create markup for each and append to DOM
 * Previous episodes shown are cleared before new episodes appended to DOM
 *
*/

function populateEpisodes(episodes: IShow[]): void {

  console.log("populateEpisodes function called")
  $episodesArea.empty();
  // space here
  const $episodesUl = $("#episodesList")
  // space here
  for (let episode of episodes){
    const $episode = $(
            `<li>${episode.name} (${episode.season}, ${episode.number})</li>`
          );
    $episodesArea.append($episode);
  }
  $episodesArea.show()
}


$showsList.on("click", ".Show-getEpisodes", handleClick);

async function handleClick (evt: JQuery.ClickEvent): Promise<void> {
  evt.preventDefault();
  const showId: string = $(evt.target).closest(".Show").data("show-id");
  console.log("showId is: ", showId)

  const numShowId: number = Number(showId);

  const episodesOfShow: IShow[] = await getEpisodesOfShow(numShowId);

  console.log("episodesOfShow is: ", episodesOfShow )

  populateEpisodes(episodesOfShow);
}
