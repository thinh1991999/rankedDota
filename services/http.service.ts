import axiosService from "./axios.service";

class HttpService {
  stratsApi: axiosService;
  constructor() {
    this.stratsApi = new axiosService("https://api.stratz.com/graphql", {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTgxNjM0MDExNzQiLCJ1bmlxdWVfbmFtZSI6IlJhbmRvbSBhbmQgZ28gbWlkIiwiU3ViamVjdCI6Ijc4OWMyNzQyLWZlMTYtNDA3Yi05MzI2LWY4ZGZmNmE1ZjdjMiIsIlN0ZWFtSWQiOiIyMDMxMzU0NDYiLCJuYmYiOjE2NjI4NzM1NjQsImV4cCI6MTY5NDQwOTU2NCwiaWF0IjoxNjYyODczNTY0LCJpc3MiOiJodHRwczovL2FwaS5zdHJhdHouY29tIn0.20uksDmyLzyDjHdKRENdfge3KbdDS4n6XcOchv7Ii14`,
    });
  }

  getHeroes(query: any) {
    // console.log(111);
    // console.log(this.stratsApi);
    this.stratsApi.postMethod("/", query);
    // return this.stratsApi.postMethod("/", query);
  }
  getHeroStats() {
    // return axiosService.getMethod("heroStats");
  }
}

export default new HttpService();
const test = new HttpService();
test.stratsApi
  .postMethod("/", {
    query: `{constants {
      heroes {
        id
        name
        displayName
        shortName
        aliases
        gameVersionId
        stats {
          enabled
          heroUnlockOrder
          team
          cMEnabled
          newPlayerEnabled
          attackType
          startingArmor
          startingMagicArmor
          startingDamageMin
          startingDamageMax
          attackRate
          attackAnimationPoint
          attackAcquisitionRange
          attackRange
          primaryAttribute
          strengthBase
          strengthGain
          intelligenceBase
          intelligenceGain
          agilityBase
          agilityGain
          hpRegen
          mpRegen
          moveSpeed
          moveTurnRate
          hpBarOffset
          visionDaytimeRange
          visionNighttimeRange
          complexity
        }
      }
    }}`,
  })
  .then((res: any) => {
    console.log(res);
  })
  .catch((err: any) => {
    console.log(err);
  });
// console.log(process.env.STRATZ_TOKEN);
