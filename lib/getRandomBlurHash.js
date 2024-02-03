import { BLUR_HASH_LIST } from "../data/constants.json";

export default function getRandomBlurHash() {
  return BLUR_HASH_LIST[Math.floor(Math.random() * BLUR_HASH_LIST.length)];
}
