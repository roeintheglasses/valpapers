import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import {VALORANT_WALLPAPER_API_ENDPOINT} from '../../../constants.json';

async function fetchWallpapers() {
  const {data} = await axios.get(VALORANT_WALLPAPER_API_ENDPOINT);
  if (!data || !data.data) return [];
  return data.data;
}

export default function useWallpapers() {
  return useQuery({queryKey: ['wallpapers'], queryFn: fetchWallpapers});
}
