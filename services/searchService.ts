import { from } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@ngify/http";
// vite 获取环境变量

// env中获取 Bing 搜索 API 的 key
const Bing_SEARCH_API_KEY = "af5cbc4e2d464da4a3da3607510a36e4";
const http = new HttpClient();
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
