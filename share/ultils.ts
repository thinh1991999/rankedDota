export const getImgOpenDota = (key: string) => {
  return "https://cdn.cloudflare.steamstatic.com" + key;
};

export const getImgStratsDota = (key: string) => {
  return "https://cdn.stratz.com/images/dota2" + key;
};

export const getFixIndexHero = (value: number): string => {
  return value.toFixed(1);
};
