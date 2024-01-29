import {describe, it, expect} from "vitest";
import {searchShowsByTerm, getEpisodesOfShow, TVMAZE_API_URL} from "./model.ts";
import fetchMock from "fetch-mock/esm/client";

// almost-"unit tests" (they call AJAX, because fetch isn't mocked.)

describe("searchShowsByTerm", function () {
  it("should successfully search", async function () {
    const shows = await searchShowsByTerm("bletchley");
    const ids = shows.map(s => s.id);
    expect(ids).toEqual([1767, 37008]);
  });

  it("should return nothing for bad search", async function () {
    const shows = await searchShowsByTerm("squeamish ossifrage");
    expect(shows).toEqual([]);
  });
});

describe("getEpisodesOfShow", function () {

  it("should successfully search", async function () {
    // @ts-ignore --- the type "string[]" is wrong; fix it!
    const episodes: string[] = await getEpisodesOfShow(1767);
    expect(episodes.length).toEqual(7);
  });

  it("should handle missing shows", async function () {
    try {
      await getEpisodesOfShow(0);
    } catch (err: any) {
      expect(err.message).toContain("404");
    }
  });
});


// an example that is really a unit test, since we mock out fetch

describe("getEpisodesOfShow [mocked]", function () {

  it("should successfully search", async function () {
    fetchMock.get(`${TVMAZE_API_URL}shows/1000/episodes`, {
      body: [{id: 1, name: "A", season: "B", number: 10}],
      status: 200,
    });

    const episodes = await getEpisodesOfShow(1000);
    expect(episodes).toEqual([{
      id: 1,
      name: "A",
      season: "B",
      number: 10,
    }]);

    // "un-mock" fetch so it works normally
    fetchMock.restore();
  });
});

