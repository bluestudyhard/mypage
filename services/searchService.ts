import { from } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@ngify/http";
import Bing_SEARCH_API_KEY from "../apiconfig.js";

const http = new HttpClient();
// env中获取 Bing 搜索 API 的 key

const apiKey: string | undefined = Bing_SEARCH_API_KEY;

const headers: any = {
  "Ocp-Apim-Subscription-Key": apiKey,
};
export const searchService = {
  search(term: string | number | boolean) {
    if (term === "") return;
    const url: string = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(
      term
    )}`;
    return from(http.get(url, null, { headers: headers })).pipe(
      map((response: any) => response.webPages.value)
    );
  },
};
