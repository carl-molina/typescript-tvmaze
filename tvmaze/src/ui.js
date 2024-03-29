import $ from 'jquery';
import { getEpisodesOfShow, searchShowsByTerm } from "./model.ts";
const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
/** Given list of shows, create markup for each and append to DOM */
function populateShows(shows) {
    $showsList.empty();
    const x = "https://static.tvmaze.com/" +
        "uploads/images/medium_portrait/160/401704.jpg";
    for (let show of shows) {
        const $show = $(`<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
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
      `);
        $showsList.append($show);
    }
}
/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */
async function searchForShowAndDisplay() {
    const term = $("#searchForm-term").val();
    const shows = await searchShowsByTerm(term);
    $episodesArea.hide();
    populateShows(shows);
}
$searchForm.on("submit", async function (evt) {
    evt.preventDefault();
    await searchForShowAndDisplay();
});
/** Given list of episodes, create markup for each and append to DOM
 * Previous episodes shown are cleared before new episodes appended to DOM
 *
*/
function populateEpisodes(episodes) {
    $episodesArea.empty();
    const $episodesUl = $("#episodesList");
    for (let episode of episodes) {
        const $episode = $(`<li>${episode.name} (${episode.season}, ${episode.number})</li>`);
        $episodesUl.append($episode);
    }
}
$episodesArea.on("click", async function (evt) {
    evt.preventDefault();
    const showId = $(evt.target).closest("div[data-show-id]").attr("data-show-id");
    const numShowId = Number(showId);
    const episodesOfShow = await getEpisodesOfShow(numShowId);
    populateEpisodes(episodesOfShow);
});
