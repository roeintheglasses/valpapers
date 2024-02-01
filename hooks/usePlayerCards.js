import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VALORANT_WALLPAPER_API_ENDPOINT } from "@data/constants.json";

/**
 * 1. Fetches wallpapers from the Valorant wallpaper API endpoint.
 * 2. The endpoint returns a JSON object, which is destructured into the data variable.
 * 3. The data variable is returned, which is an array of wallpaper objects.
 */
async function fetchWallpapers() {
  try {
    const { data } = await axios.get(VALORANT_WALLPAPER_API_ENDPOINT);
    if (!data || !data.data) {
      throw new Error("No wallpapers found");
    }

    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export default function usePlayerCards() {
  return useQuery({
    queryKey: ["playerCards"],
    queryFn: fetchWallpapers,
    config: {
      retry: (failureCount, error) => {
        if (failureCount > 3) return false;
        if (error.message.includes("404")) return false;
        return true;
      },
      onError: (error, variables, context) => {
        console.log("Error fetching wallpapers", error);
      },
      onSettled: (data, error, variables, context) => {
        console.log("Wallpapers fetched");
      },
    },
  });
}
