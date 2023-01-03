import axios from "axios";
import _ from "lodash";
import { removeEmpty } from "../share/ultils";
class StratsApiService {
  axiosConfig: any;
  axios = axios.create({
    baseURL: "https://api.stratz.com/graphql",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTgxNjM0MDExNzQiLCJ1bmlxdWVfbmFtZSI6IlJhbmRvbSBhbmQgZ28gbWlkIiwiU3ViamVjdCI6Ijc4OWMyNzQyLWZlMTYtNDA3Yi05MzI2LWY4ZGZmNmE1ZjdjMiIsIlN0ZWFtSWQiOiIyMDMxMzU0NDYiLCJuYmYiOjE2NjI4NzM1NjQsImV4cCI6MTY5NDQwOTU2NCwiaWF0IjoxNjYyODczNTY0LCJpc3MiOiJodHRwczovL2FwaS5zdHJhdHouY29tIn0.20uksDmyLzyDjHdKRENdfge3KbdDS4n6XcOchv7Ii14`,
    },
  });
  addConfig(config: any) {
    this.axiosConfig = {
      ...config,
    };
  }
  // Hero
  getHeroesPaths() {
    return this.axios.post("", {
      query: `{
        constants {
          heroes {
            id
            
          }
        }
      }`,
    });
  }

  getHeroesPage() {
    return this.axios.post("", {
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
    });
  }

  getHeroStats() {
    return this.axios.post("", {
      query: `query HeroesOverview {
        heroStats {
          POSITION_1: winDay(take: 1, positionIds: [POSITION_1], bracketIds: [HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE, IMMORTAL]) {
            heroId
            matchCount
            winCount
            __typename
          }
          POSITION_2: winDay(take: 1, positionIds: [POSITION_2], bracketIds: [HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE, IMMORTAL]) {
            heroId
            matchCount
            winCount
            __typename
          }
          POSITION_3: winDay(take: 1, positionIds: [POSITION_3], bracketIds: [HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE, IMMORTAL]) {
            heroId
            matchCount
            winCount
            __typename
          }
          POSITION_4: winDay(take: 1, positionIds: [POSITION_4], bracketIds: [HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE, IMMORTAL]) {
            heroId
            matchCount
            winCount
            __typename
          }
          POSITION_5: winDay(take: 1, positionIds: [POSITION_5], bracketIds: [HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE, IMMORTAL]) {
            heroId
            matchCount
            winCount
            __typename
          }
          __typename
        }
      }`,
    });
  }

  getHeroInfo(
    id: number,
    bracketBasicIds: string | string[] | undefined,
    brackets?: string[]
  ) {
    return this.axios.post("", {
      operationName: "GetHeroOverview",
      // variables: {
      //   heroId: id,
      //   topPlayersBracketIds: brackets ? brackets : ["IMMORTAL"],
      // },
      variables: {
        heroId: id,
        bracketIds: brackets ? brackets : ["IMMORTAL"],
        bracketBasicIds: bracketBasicIds,
        topPlayersBracketIds: brackets ? brackets : ["IMMORTAL"],
      },
      query:
        "query GetHeroOverview($heroId: Short!, $bracketIds: [RankBracket], $bracketBasicIds: [RankBracketBasicEnum], $topPlayersBracketIds: [RankBracket]) {\n  heroStats {\n    ...HeroOverviewGuidesHeroStatsQueryFragment\n    ...HeroOverviewItemsHeroStatsQueryFragment\n    ...HeroOverviewMatchupsHeroStatsQueryFragment\n    ...HeroOverviewGraphsHeroStatsQueryFragment\n    ...HeroOverviewAbilitiesHeroStatsQueryFragment\n    ...HeroOverviewTalentsHeroStatsQueryFragment\n    ...HeroOverviewPositionsHeroStatsQueryFragment\n    ...HeroOverviewRampagesHeroStatsQueryFragment\n    __typename\n  }\n  constants {\n    ...HeroOverviewAbilitiesConstantQueryFragment\n    ...HeroOverviewConstantsConstantQueryFragment\n    ...HeroOverviewItemsConstantQueryFragment\n    __typename\n  }\n  leaderboard {\n    ...HeroOverviewPlayersLeaderboardQueryFragment\n    __typename\n  }\n}\n\nfragment HeroOverviewGuidesHeroStatsQueryFragment on HeroStatsQuery {\n  guide(heroId: $heroId) {\n    heroId\n    guides(take: 3) {\n      ...GuidePreviewHeroGuide\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GuidePreviewHeroGuide on HeroGuideType {\n  heroId\n  match {\n    id\n    durationSeconds\n    players {\n      matchId\n      steamAccountId\n      heroId\n      position\n      __typename\n    }\n    __typename\n  }\n  matchPlayer {\n    matchId\n    steamAccountId\n    heroId\n    position\n    steamAccount {\n      id\n      name\n      proSteamAccount {\n        name\n        __typename\n      }\n      __typename\n    }\n    assists\n    deaths\n    imp\n    isRadiant\n    item0Id\n    item1Id\n    item2Id\n    item3Id\n    item4Id\n    item5Id\n    neutral0Id\n    kills\n    additionalUnit {\n      item0Id\n      item1Id\n      item2Id\n      item3Id\n      item4Id\n      item5Id\n      neutral0Id\n      __typename\n    }\n    stats {\n      itemPurchases {\n        itemId\n        time\n        __typename\n      }\n      level\n      __typename\n    }\n    level\n    abilities {\n      abilityId\n      time\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewAbilitiesConstantQueryFragment on ConstantQuery {\n  hero(id: $heroId) {\n    id\n    abilities {\n      abilityId\n      ability {\n        id\n        name\n        stat {\n          maxLevel\n          behavior\n          unitTargetTeam\n          unitTargetType\n          hasScepterUpgrade\n          isGrantedByScepter\n          isGrantedByShard\n          isUltimate\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewAbilitiesHeroStatsQueryFragment on HeroStatsQuery {\n  abilityMaxLevel(heroId: $heroId, bracketBasicIds: $bracketBasicIds) {\n    abilityId\n    level\n    winCount\n    matchCount\n    __typename\n  }\n  abilityMinLevel(heroId: $heroId, bracketBasicIds: $bracketBasicIds) {\n    abilityId\n    level\n    winCount\n    matchCount\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewItemsHeroStatsQueryFragment on HeroStatsQuery {\n  ...HeroOverviewItemsStagesHeroStatsQueryFragment\n  ...HeroOverviewItemsNeutralsHeroStatsQueryFragment\n  ...HeroOverviewItemsBootsHeroStatsQueryFragment\n  __typename\n}\n\nfragment HeroOverviewItemsConstantQueryFragment on ConstantQuery {\n  ...HeroOverviewItemsNeutralsConstantQueryFragment\n  __typename\n}\n\nfragment HeroOverviewItemsStagesHeroStatsQueryFragment on HeroStatsQuery {\n  purchasePattern(heroId: $heroId, bracketBasicIds: $bracketBasicIds) {\n    startingItems {\n      ...HeroOverviewItemsStagesHeroItemStartingPurchaseTypeFragment\n      __typename\n    }\n    earlyGame {\n      ...HeroOverviewItemsStagesHeroItemPurchaseTypeFragment\n      __typename\n    }\n    midGame {\n      ...HeroOverviewItemsStagesHeroItemPurchaseTypeFragment\n      __typename\n    }\n    lateGame {\n      ...HeroOverviewItemsStagesHeroItemPurchaseTypeFragment\n      __typename\n    }\n    __typename\n  }\n  purchasePatternStats: stats(\n    heroIds: [$heroId]\n    bracketBasicIds: $bracketBasicIds\n    minTime: 0\n    maxTime: 36\n    groupByTime: true\n  ) {\n    time\n    matchCount\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewItemsStagesHeroItemStartingPurchaseTypeFragment on HeroItemStartingPurchaseType {\n  itemId\n  winCount\n  matchCount\n  instance\n  wasGiven\n  __typename\n}\n\nfragment HeroOverviewItemsStagesHeroItemPurchaseTypeFragment on HeroItemPurchaseType {\n  itemId\n  winCount\n  matchCount\n  instance\n  __typename\n}\n\nfragment HeroOverviewItemsBootsHeroStatsQueryFragment on HeroStatsQuery {\n  itemBootPurchase(heroId: $heroId, bracketBasicIds: $bracketBasicIds) {\n    itemId\n    matchCount\n    winCount\n    timeAverage\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewItemsNeutralsHeroStatsQueryFragment on HeroStatsQuery {\n  itemNeutral(\n    heroId: $heroId\n    bracketBasicIds: $bracketBasicIds\n    week: 1671984373\n  ) {\n    itemId\n    equippedMatchCount\n    equippedMatchWinCount\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewItemsNeutralsConstantQueryFragment on ConstantQuery {\n  items {\n    id\n    stat {\n      neutralItemTier\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewMatchupsHeroStatsQueryFragment on HeroStatsQuery {\n  heroVsHeroMatchup(heroId: $heroId, bracketBasicIds: $bracketBasicIds) {\n    advantage {\n      ...HeroOverviewMatchupsHeroDryadTypeFragment\n      __typename\n    }\n    disadvantage {\n      ...HeroOverviewMatchupsHeroDryadTypeFragment\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewMatchupsHeroStatsHeroDryadTypeFragment on HeroStatsHeroDryadType {\n  heroId2\n  synergy\n  matchCount\n  winCount\n  __typename\n}\n\nfragment HeroOverviewMatchupsHeroDryadTypeFragment on HeroDryadType {\n  with {\n    ...HeroOverviewMatchupsHeroStatsHeroDryadTypeFragment\n    __typename\n  }\n  vs {\n    ...HeroOverviewMatchupsHeroStatsHeroDryadTypeFragment\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewGraphsHeroStatsQueryFragment on HeroStatsQuery {\n  winGameVersion(take: 7, groupBy: HERO_ID, bracketIds: $bracketIds) {\n    gameVersionId\n    heroId\n    winCount\n    matchCount\n    __typename\n  }\n  winDay(take: 32, groupBy: HERO_ID, bracketIds: $bracketIds) {\n    timestamp: day\n    heroId\n    winCount\n    matchCount\n    __typename\n  }\n  winHour(take: 25, groupBy: HERO_ID, bracketIds: $bracketIds) {\n    timestamp: hour\n    heroId\n    winCount\n    matchCount\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewPlayersLeaderboardQueryFragment on LeaderboardQuery {\n  hero(request: {heroIds: [$heroId], bracketIds: $topPlayersBracketIds, take: 5}) {\n    position\n    impAverage\n    steamAccount {\n      ...PlayerColSteamAccountTypeFragment\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PlayerColSteamAccountTypeFragment on SteamAccountType {\n  avatar\n  ...PlayerNameColSteamAccountTypeFragment\n  __typename\n}\n\nfragment PlayerNameColSteamAccountTypeFragment on SteamAccountType {\n  id\n  name\n  proSteamAccount {\n    name\n    __typename\n  }\n  isAnonymous\n  smurfFlag\n  __typename\n}\n\nfragment HeroOverviewTalentsHeroStatsQueryFragment on HeroStatsQuery {\n  talent(heroId: $heroId) {\n    abilityId\n    matchCount\n    winCount\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewPositionsHeroStatsQueryFragment on HeroStatsQuery {\n  position: stats(\n    heroIds: [$heroId]\n    bracketBasicIds: $bracketBasicIds\n    groupByPosition: true\n    maxTime: 0\n  ) {\n    position\n    matchCount: remainingMatchCount\n    winCount\n    __typename\n  }\n  laneOutcomeWith_POSITION_1: laneOutcome(\n    heroId: $heroId\n    positionIds: [POSITION_1]\n    isWith: true\n  ) {\n    ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment\n    __typename\n  }\n  laneOutcomeWith_POSITION_2: laneOutcome(\n    heroId: $heroId\n    positionIds: [POSITION_2]\n    isWith: true\n  ) {\n    ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment\n    __typename\n  }\n  laneOutcomeWith_POSITION_3: laneOutcome(\n    heroId: $heroId\n    positionIds: [POSITION_3]\n    isWith: true\n  ) {\n    ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment\n    __typename\n  }\n  laneOutcomeWith_POSITION_4: laneOutcome(\n    heroId: $heroId\n    positionIds: [POSITION_4]\n    isWith: true\n  ) {\n    ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment\n    __typename\n  }\n  laneOutcomeWith_POSITION_5: laneOutcome(\n    heroId: $heroId\n    positionIds: [POSITION_5]\n    isWith: true\n  ) {\n    ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment\n    __typename\n  }\n  laneOutcomeAgainst_POSITION_1: laneOutcome(\n    heroId: $heroId\n    positionIds: [POSITION_1]\n    isWith: false\n  ) {\n    ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment\n    __typename\n  }\n  laneOutcomeAgainst_POSITION_2: laneOutcome(\n    heroId: $heroId\n    positionIds: [POSITION_2]\n    isWith: false\n  ) {\n    ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment\n    __typename\n  }\n  laneOutcomeAgainst_POSITION_3: laneOutcome(\n    heroId: $heroId\n    positionIds: [POSITION_3]\n    isWith: false\n  ) {\n    ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment\n    __typename\n  }\n  laneOutcomeAgainst_POSITION_4: laneOutcome(\n    heroId: $heroId\n    positionIds: [POSITION_4]\n    isWith: false\n  ) {\n    ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment\n    __typename\n  }\n  laneOutcomeAgainst_POSITION_5: laneOutcome(\n    heroId: $heroId\n    positionIds: [POSITION_5]\n    isWith: false\n  ) {\n    ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewPositionsHeroLaneOutcomeTypeFragment on HeroLaneOutcomeType {\n  heroId2\n  matchCount\n  winCount\n  lossCount\n  drawCount\n  stompWinCount\n  stompLossCount\n  __typename\n}\n\nfragment HeroOverviewRampagesHeroStatsQueryFragment on HeroStatsQuery {\n  rampages(request: {heroId: $heroId, bracketBasicIds: $bracketBasicIds, take: 5}) {\n    match {\n      id\n      rank\n      endDateTime\n      players {\n        steamAccountId\n        isRadiant\n        heroId\n        __typename\n      }\n      __typename\n    }\n    steamAccount {\n      avatar\n      ...PlayerNameColSteamAccountTypeFragment\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HeroOverviewConstantsConstantQueryFragment on ConstantQuery {\n  hero(id: $heroId) {\n    id\n    language {\n      hype\n      lore\n      __typename\n    }\n    aliases\n    __typename\n  }\n  __typename\n}\n",
    });
  }
  getHeroHeader(id: number) {
    return this.axios.post("", {
      operationName: "GetHeroHeader",
      variables: {
        heroId: id,
      },
      query:
        "query GetHeroHeader($heroId: Short!) {\n  constants {\n    ...HeroHeaderSummaryRowConstantQueryFragment\n    __typename\n  }\n  heroStats {\n    POSITION_1: winDay(\n      take: 1\n      positionIds: [POSITION_1]\n      bracketIds: [HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE, IMMORTAL]\n    ) {\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    POSITION_2: winDay(\n      take: 1\n      positionIds: [POSITION_2]\n      bracketIds: [HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE, IMMORTAL]\n    ) {\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    POSITION_3: winDay(\n      take: 1\n      positionIds: [POSITION_3]\n      bracketIds: [HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE, IMMORTAL]\n    ) {\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    POSITION_4: winDay(\n      take: 1\n      positionIds: [POSITION_4]\n      bracketIds: [HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE, IMMORTAL]\n    ) {\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    POSITION_5: winDay(\n      take: 1\n      positionIds: [POSITION_5]\n      bracketIds: [HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE, IMMORTAL]\n    ) {\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment HeroHeaderSummaryRowConstantQueryFragment on ConstantQuery {\n  hero(id: $heroId) {\n    id\n    stats {\n      attackType\n      complexity\n      primaryAttribute\n      strengthBase\n      strengthGain\n      agilityBase\n      agilityGain\n      intelligenceBase\n      intelligenceGain\n      __typename\n    }\n    roles {\n      roleId\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n",
    });
  }

  getDetailHero(variables: object) {
    const HeroOverviewPlayersLeaderboardQueryFragment = `fragment HeroOverviewPlayersLeaderboardQueryFragment on LeaderboardQuery {
      hero(request: {heroIds: [$heroId], bracketIds: $topPlayersBracketIds, take: 5}) {
        position
        impAverage
        steamAccount {
          ...PlayerColSteamAccountTypeFragment
          __typename
        }
        __typename
      }
      __typename
    }`;

    const PlayerColSteamAccountTypeFragment = `fragment PlayerColSteamAccountTypeFragment on SteamAccountType {
      avatar
      ...PlayerNameColSteamAccountTypeFragment
      __typename
    }`;

    const HeroOverviewMatchupsHeroStatsQueryFragment = `fragment HeroOverviewMatchupsHeroStatsQueryFragment on HeroStatsQuery {
      heroVsHeroMatchup(heroId: $heroId, bracketBasicIds: $bracketBasicIds) {
        advantage {
          ...HeroOverviewMatchupsHeroDryadTypeFragment
          __typename
        }
        disadvantage {
          ...HeroOverviewMatchupsHeroDryadTypeFragment
          __typename
        }
        __typename
      }
      __typename
    }`;

    const HeroOverviewMatchupsHeroDryadTypeFragment = `fragment HeroOverviewMatchupsHeroDryadTypeFragment on HeroDryadType {
      with {
        ...HeroOverviewMatchupsHeroStatsHeroDryadTypeFragment
        __typename
      }
      vs {
        ...HeroOverviewMatchupsHeroStatsHeroDryadTypeFragment
        __typename
      }
      __typename
    }`;

    const HeroOverviewMatchupsHeroStatsHeroDryadTypeFragment = `fragment HeroOverviewMatchupsHeroStatsHeroDryadTypeFragment on HeroStatsHeroDryadType {
      heroId2
      synergy
      matchCount
      winCount
      __typename
    }`;

    const HeroOverviewGuidesHeroStatsQueryFragment = `fragment HeroOverviewGuidesHeroStatsQueryFragment on HeroStatsQuery {
      guide(heroId: $heroId) {
        heroId
        guides(take: 3) {
          ...GuidePreviewHeroGuide
          __typename
        }
        __typename
      }
      __typename
    }`;

    const HeroOverviewGraphsHeroStatsQueryFragment = `fragment HeroOverviewGraphsHeroStatsQueryFragment on HeroStatsQuery {
      winGameVersion(take: 7, groupBy: HERO_ID, bracketIds: $bracketIds) {
        gameVersionId
        heroId
        winCount
        matchCount
        __typename
      }
      winDay(take: 32, groupBy: HERO_ID, bracketIds: $bracketIds) {
        timestamp: day
        heroId
        winCount
        matchCount
        __typename
      }
      winHour(take: 25, groupBy: HERO_ID, bracketIds: $bracketIds) {
        timestamp: hour
        heroId
        winCount
        matchCount
        __typename
      }
      __typename
    }`;

    const HeroOverviewItemsHeroStatsQueryFragment = `fragment HeroOverviewItemsHeroStatsQueryFragment on HeroStatsQuery {
      ...HeroOverviewItemsStagesHeroStatsQueryFragment
      ...HeroOverviewItemsNeutralsHeroStatsQueryFragment
      ...HeroOverviewItemsBootsHeroStatsQueryFragment
      __typename
    }`;
    const HeroOverviewItemsStagesHeroStatsQueryFragment = `fragment HeroOverviewItemsStagesHeroStatsQueryFragment on HeroStatsQuery {
      purchasePattern(heroId: $heroId, bracketBasicIds: $bracketBasicIds) {
        startingItems {
          ...HeroOverviewItemsStagesHeroItemStartingPurchaseTypeFragment
          __typename
        }
        earlyGame {
          ...HeroOverviewItemsStagesHeroItemPurchaseTypeFragment
          __typename
        }
        midGame {
          ...HeroOverviewItemsStagesHeroItemPurchaseTypeFragment
          __typename
        }
        lateGame {
          ...HeroOverviewItemsStagesHeroItemPurchaseTypeFragment
          __typename
        }
        __typename
      }
      __typename
    }`;
    const HeroOverviewItemsStagesHeroItemPurchaseTypeFragment = `fragment HeroOverviewItemsStagesHeroItemPurchaseTypeFragment on HeroItemPurchaseType {
      matchCount: count
      events {
        itemId
        winCount: wins
        matchCount: count
        instance
        __typename
      }
      __typename
    }`;
    const HeroOverviewItemsStagesHeroItemStartingPurchaseTypeFragment = `fragment HeroOverviewItemsStagesHeroItemStartingPurchaseTypeFragment on HeroItemStartingPurchaseType {
      matchCount: count
      events {
        itemId
        winCount: wins
        matchCount: count
        instance
        wasGiven
        __typename
      }
      __typename
    }`;
    const HeroOverviewItemsNeutralsHeroStatsQueryFragment = `fragment HeroOverviewItemsNeutralsHeroStatsQueryFragment on HeroStatsQuery {
      itemNeutral(heroId: $heroId, bracketBasicIds: $bracketBasicIds, week: 1663085599) {
        itemId
        equippedMatchCount
        equippedMatchWinCount
        __typename
      }
      __typename
    }`;
    const HeroOverviewItemsBootsHeroStatsQueryFragment = `fragment HeroOverviewItemsBootsHeroStatsQueryFragment on HeroStatsQuery {
      itemBootPurchase(heroId: $heroId, bracketBasicIds: $bracketBasicIds) {
        matchCount: count
        events {
          itemId
          matchCount: count
          winCount: wins
          timeAverage
          __typename
        }
        __typename
      }
      __typename
    }`;
    const GuidePreviewHeroGuide = `fragment GuidePreviewHeroGuide on HeroGuideType {
      heroId
      match {
        id
        durationSeconds
        players {
          matchId
          steamAccountId
          heroId
          role
          lane
          __typename
        }
        __typename
      }
      matchPlayer {
        matchId
        steamAccountId
        heroId
        role
        lane
        steamAccount {
          id
          name
          proSteamAccount {
            name
            __typename
          }
          __typename
        }
        assists
        deaths
        imp
        isRadiant
        item0Id
        item1Id
        item2Id
        item3Id
        item4Id
        item5Id
        neutral0Id
        kills
        additionalUnit {
          item0Id
          item1Id
          item2Id
          item3Id
          item4Id
          item5Id
          neutral0Id
          __typename
        }
        stats {
          abilities {
            abilityId
            time
            __typename
          }
          itemPurchases {
            itemId
            time
            __typename
          }
          level
          __typename
        }
        level
        __typename
      }
      __typename
    }`;
    const PlayerNameColSteamAccountTypeFragment = `fragment PlayerNameColSteamAccountTypeFragment on SteamAccountType {
      id
      name
      proSteamAccount {
        name
        __typename
      }
      isAnonymous
      smurfFlag
      __typename
    }`;
    const HeroOverviewPositionsHeroStatsQueryFragment = `fragment HeroOverviewPositionsHeroStatsQueryFragment on HeroStatsQuery {
      position(heroId: $heroId, bracketBasicIds: $bracketBasicIds) {
        position
        matchCount
        winCount
        __typename
      }
      laneOutcome_POSITION_1: laneOutcome(heroId: $heroId, positionIds: [POSITION_1]) {
        ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment
        __typename
      }
      laneOutcome_POSITION_2: laneOutcome(heroId: $heroId, positionIds: [POSITION_2]) {
        ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment
        __typename
      }
      laneOutcome_POSITION_3: laneOutcome(heroId: $heroId, positionIds: [POSITION_3]) {
        ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment
        __typename
      }
      laneOutcome_POSITION_4: laneOutcome(heroId: $heroId, positionIds: [POSITION_4]) {
        ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment
        __typename
      }
      laneOutcome_POSITION_5: laneOutcome(heroId: $heroId, positionIds: [POSITION_5]) {
        ...HeroOverviewPositionsHeroLaneOutcomeTypeFragment
        __typename
      }
      __typename
    }`;
    const HeroOverviewPositionsHeroLaneOutcomeTypeFragment = `fragment HeroOverviewPositionsHeroLaneOutcomeTypeFragment on HeroLaneOutcomeType {
      matchCount
      winCount
      lossCount
      drawCount
      stompWinCount
      stompLossCount
      partners {
        ...HeroOverviewPositionsHeroLaneOutcomeHeroObjectTypeFragment
        __typename
      }
      against {
        ...HeroOverviewPositionsHeroLaneOutcomeHeroObjectTypeFragment
        __typename
      }
      __typename
    }`;
    const HeroOverviewPositionsHeroLaneOutcomeHeroObjectTypeFragment = `fragment HeroOverviewPositionsHeroLaneOutcomeHeroObjectTypeFragment on HeroLaneOutcomeHeroObjectType {
      heroId
      matchCount
      winCount
      __typename
    }`;
    const HeroOverviewRampages = `fragment HeroOverviewRampagesHeroStatsQueryFragment on HeroStatsQuery {
      rampages(request: {heroId: $heroId, bracketBasicIds: $bracketBasicIds, take: 5}) {
        match {
          id
          rank
          endDateTime
          players {
            steamAccountId
            isRadiant
            heroId
            __typename
          }
          __typename
        }
        steamAccount {
          avatar
          ...PlayerNameColSteamAccountTypeFragment
          __typename
        }
        __typename
      }
      __typename
    }
    `;
    return this.axios.post("", {
      query: `
      ${HeroOverviewPlayersLeaderboardQueryFragment}
      ${PlayerColSteamAccountTypeFragment}
      ${HeroOverviewMatchupsHeroStatsQueryFragment}
      ${HeroOverviewMatchupsHeroDryadTypeFragment}
      ${HeroOverviewMatchupsHeroStatsHeroDryadTypeFragment}
      ${HeroOverviewItemsStagesHeroItemStartingPurchaseTypeFragment}
      ${HeroOverviewGraphsHeroStatsQueryFragment}
      ${HeroOverviewGuidesHeroStatsQueryFragment}
      ${HeroOverviewItemsHeroStatsQueryFragment}
      ${HeroOverviewItemsStagesHeroStatsQueryFragment}
      ${HeroOverviewItemsStagesHeroItemPurchaseTypeFragment}
      ${HeroOverviewItemsNeutralsHeroStatsQueryFragment}
      ${HeroOverviewItemsBootsHeroStatsQueryFragment}
      ${GuidePreviewHeroGuide}
      ${PlayerNameColSteamAccountTypeFragment}
      ${HeroOverviewPositionsHeroStatsQueryFragment}
      ${HeroOverviewPositionsHeroLaneOutcomeTypeFragment}
      ${HeroOverviewPositionsHeroLaneOutcomeHeroObjectTypeFragment}
      ${HeroOverviewRampages}
        query GetHeroOverview($heroId: Short!, $bracketIds: [RankBracket], $bracketBasicIds: [RankBracketBasicEnum],$topPlayersBracketIds: [RankBracket]) {
        heroStats {
          ...HeroOverviewGuidesHeroStatsQueryFragment
          ...HeroOverviewItemsHeroStatsQueryFragment
          ...HeroOverviewMatchupsHeroStatsQueryFragment
          ...HeroOverviewGraphsHeroStatsQueryFragment
          ...HeroOverviewPositionsHeroStatsQueryFragment
          ...HeroOverviewRampagesHeroStatsQueryFragment
          __typename
        }
        leaderboard {
          ...HeroOverviewPlayersLeaderboardQueryFragment
          __typename
        }
      }`,
      variables,
    });
  }

  getAllDefaultData() {
    const abilities = `abilities{
      id
      name
      uri
      stat {
        abilityId
        type
        behavior
        unitTargetType
        unitTargetTeam
        unitTargetFlags
        unitDamageType
        spellImmunity
        modifierSupportValue
        modifierSupportBonus
        isOnCastbar
        isOnLearnbar
        fightRecapLevel
        isGrantedByScepter
        hasScepterUpgrade
        maxLevel
        levelsBetweenUpgrades
        requiredLevel
        hotKeyOverride
        displayAdditionalHeroes
        isUltimate
        duration
        charges
        chargeRestoreTime
        isGrantedByShard
        dispellable
      }
      attributes {
        name
        value
        linkedSpecialBonusAbilityId
      }
      isTalent
      language {
        displayName
        lore
        aghanimDescription
        shardDescription
      }
    }`;
    const items = `items{
      id
      name
      displayName
      shortName
      isSupportFullItem
      language {
        displayName
      }
      stat {
        behavior
        unitTargetType
        unitTargetTeam
        unitTargetFlags
        fightRecapLevel
        sharedCooldown
        cost
        shopTags
        aliases
        quality
        isSellable
        isDroppable
        isPurchasable
        isSideShop
        isStackable
        isPermanent
        isHideCharges
        isRequiresCharges
        isDisplayCharges
        isSupport
        isAlertable
        isTempestDoubleClonable
        stockMax
        initialCharges
        initialStock
        stockTime
        initialStockTime
        isRecipe
        needsComponents
        upgradeItem
        upgradeRecipe
        itemResult
        neutralItemDropTime
        neutralItemTier
      }
      attributes {
        name
        value
      }
      components {
        index
        componentId
      }
      image
    }`;
    const heroes = `heroes {
      id
      name
      displayName
      shortName
      aliases
      gameVersionId
      abilities {
        slot
        gameVersionId
        abilityId
        ability {
          id
          name
          uri
          language {
            displayName
            description
            attributes
            lore
            aghanimDescription
            shardDescription
            notes
          }
          stat {
            abilityId
            type
            behavior
            unitTargetType
            unitTargetTeam
            unitTargetFlags
            unitDamageType
            spellImmunity
            modifierSupportValue
            modifierSupportBonus
            isOnCastbar
            isOnLearnbar
            fightRecapLevel
            isGrantedByScepter
            hasScepterUpgrade
            maxLevel
            levelsBetweenUpgrades
            requiredLevel
            hotKeyOverride
            displayAdditionalHeroes
            isUltimate
            duration
            charges
            chargeRestoreTime
            isGrantedByShard
            dispellable
          }
          attributes {
            name
            value
            linkedSpecialBonusAbilityId
            requiresScepter
          }
          isTalent
        }
      }
      roles {
        roleId
        level
      }
      language {
        displayName
        lore
        hype
      }
      talents {
        abilityId
        slot
      }
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
    }`;
    const gameVersions = `gameVersions {
      id
      name
      asOfDateTime
    }`;
    const regions = ` regions{
      id
      name
      clientName
      displayName
      leaderboardDivision
      langKey
      latitude
      longitude
      code
      matchGroup
      weekendTourneyDivision
      __typename
    }`;
    return this.axios.post("", {
      query: `
      {
        constants{
          ${abilities}
          ${items}
          ${heroes}
          ${gameVersions}
          ${regions}
        }
      }
      `,
    });
  }
  // Hero/meta/trends
  getHeroesMetaTrends(
    bracketIds?: string | null | undefined,
    positionIds?: string[] | null,
    regionIds?: string | null | undefined,
    gameModeIds?: string | null | undefined
  ) {
    let variables: {
      bracketIds?: string[];
      positionIds?: string[];
      regionIds?: string[];
      gameModeIds?: string[];
    } = {};
    if (bracketIds) variables["bracketIds"] = [bracketIds];
    if (positionIds && positionIds.length > 0)
      variables["positionIds"] = positionIds.filter((p) => p);
    if (regionIds) variables["regionIds"] = [regionIds];
    if (gameModeIds) variables["gameModeIds"] = [gameModeIds];
    return this.axios.post("", {
      operationName: "HeroesMetaTrends",
      variables,
      query:
        "query HeroesMetaTrends($bracketIds: [RankBracket], $positionIds: [MatchPlayerPositionType], $regionIds: [BasicRegionType], $gameModeIds: [GameModeEnumType]) {\n  heroStats {\n    winDay(\n      take: 8\n      bracketIds: $bracketIds\n      positionIds: $positionIds\n      regionIds: $regionIds\n      gameModeIds: $gameModeIds\n    ) {\n      timestamp: day\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    winGameVersion(\n      take: 3\n      bracketIds: $bracketIds\n      positionIds: $positionIds\n      regionIds: $regionIds\n      gameModeIds: $gameModeIds\n    ) {\n      gameVersionId\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    winHour(\n      take: 32\n      bracketIds: $bracketIds\n      positionIds: $positionIds\n      regionIds: $regionIds\n      gameModeIds: $gameModeIds\n    ) {\n      timestamp: hour\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    __typename\n  }\n}\n",
    });
  }

  // Hero/meta/positions

  getHeroMetaPositions(
    bracketIds?: string | null | undefined,
    regionIds?: string | null | undefined
  ) {
    let variables: {
      bracketIds?: string[];
      regionIds?: string[];
    } = {};
    if (bracketIds) variables["bracketIds"] = [bracketIds];
    if (regionIds) variables["regionIds"] = [regionIds];
    return this.axios.post("", {
      operationName: "HeroesMetaPositions",
      variables,
      query:
        "query HeroesMetaPositions($bracketIds: [RankBracket], $gameModeIds: [GameModeEnumType]) {\n  heroesPos1: heroStats {\n    winDay(\n      take: 1\n      positionIds: [POSITION_1]\n      bracketIds: $bracketIds\n      gameModeIds: $gameModeIds\n    ) {\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    __typename\n  }\n  heroesPos2: heroStats {\n    winDay(\n      take: 1\n      positionIds: [POSITION_2]\n      bracketIds: $bracketIds\n      gameModeIds: $gameModeIds\n    ) {\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    __typename\n  }\n  heroesPos3: heroStats {\n    winDay(\n      take: 1\n      positionIds: [POSITION_3]\n      bracketIds: $bracketIds\n      gameModeIds: $gameModeIds\n    ) {\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    __typename\n  }\n  heroesPos4: heroStats {\n    winDay(\n      take: 1\n      positionIds: [POSITION_4]\n      bracketIds: $bracketIds\n      gameModeIds: $gameModeIds\n    ) {\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    __typename\n  }\n  heroesPos5: heroStats {\n    winDay(\n      take: 1\n      positionIds: [POSITION_5]\n      bracketIds: $bracketIds\n      gameModeIds: $gameModeIds\n    ) {\n      heroId\n      matchCount\n      winCount\n      __typename\n    }\n    __typename\n  }\n}\n",
    });
  }

  // Matches/graphs
  getMatchesGraphsGameMode() {
    return this.axios.post("", {
      query: `
      query ($take: Int!) {
        heroStats {
          ALL_PICK: winMonth(take: $take, gameModeIds: [ALL_PICK], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          CAPTAINS_MODE: winMonth(take: $take, gameModeIds: [CAPTAINS_MODE], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          ALL_PICK_RANKED: winMonth(take: $take, gameModeIds: [ALL_PICK_RANKED], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          TURBO: winMonth(take: $take, gameModeIds: [TURBO], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          
        }
      }
      `,
      variables: {
        take: 120,
      },
    });
  }
  getMatchesGraphsRegion() {
    return this.axios.post("", {
      query: `
      query ($take: Int!) {
        heroStats {
          CHINA: winMonth(take: $take, regionIds: [CHINA], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          SEA: winMonth(take: $take, regionIds: [SEA], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          NORTH_AMERICA: winMonth(take: $take, regionIds: [NORTH_AMERICA], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          SOUTH_AMERICA: winMonth(take: $take, regionIds: [SOUTH_AMERICA], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          EUROPE: winMonth(take: $take, regionIds: [EUROPE], groupBy: ALL) {
            month
            matchCount
            __typename
          }
        }
      }
      `,
      variables: {
        take: 120,
      },
    });
  }
  getMatchesGraphsRank() {
    return this.axios.post("", {
      query: `
      query ($take: Int!) {
        heroStats {
          HERALD: winMonth(take: $take, bracketIds: [HERALD], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          GUARDIAN: winMonth(take: $take, bracketIds: [GUARDIAN], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          CRUSADER: winMonth(take: $take, bracketIds: [CRUSADER], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          ARCHON: winMonth(take: $take, bracketIds: [ARCHON], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          LEGEND: winMonth(take: $take, bracketIds: [LEGEND], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          ANCIENT: winMonth(take: $take, bracketIds: [ANCIENT], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          DIVINE: winMonth(take: $take, bracketIds: [DIVINE], groupBy: ALL) {
            month
            matchCount
            __typename
          }
          IMMORTAL: winMonth(take: $take, bracketIds: [IMMORTAL], groupBy: ALL) {
            month
            matchCount
            __typename
          }
        }
      }
      `,
      variables: {
        take: 120,
      },
    });
  }
  getMatchesLive() {
    const LiveMatchMatchLiveTypeFragment = `fragment LiveMatchMatchLiveTypeFragment on MatchLiveType {
    gameTime
    averageRank
    league {
      id
      displayName
      __typename
    }
    players {
      ...LiveMatchFactionMatchLivePlayerTypeFragment
      __typename
    }
    ...GetGameStateMatchLiveTypeFragment
    ...LiveMinimapMatchLiveTypeFragment
    ...LiveMatchKashaMatchLiveTypeFragment
    __typename
  }`;

    const GetGameStateMatchLiveTypeFragment = ` fragment GetGameStateMatchLiveTypeFragment on MatchLiveType {
    playbackData {
      buildingEvents {
        npcId
        isAlive
        __typename
      }
      __typename
    }
    isParsing
    players {
      heroId
      __typename
    }
    gameTime
    __typename
  }`;

    const LiveMatchFactionMatchLivePlayerTypeFragment = `fragment LiveMatchFactionMatchLivePlayerTypeFragment on MatchLivePlayerType {
    heroId
    numKills
    numDeaths
    numAssists
    steamAccount {
      id
      name
      proSteamAccount {
        name
        team {
          id
          tag
          name
          __typename
        }
        __typename
      }
      ...SteamAccountHoverCardSteamAccountTypeFragment
      __typename
    }
    __typename
  }`;

    const SteamAccountHoverCardSteamAccountTypeFragment = ` fragment SteamAccountHoverCardSteamAccountTypeFragment on SteamAccountType {
    id
    name
    avatar
    isAnonymous
    smurfFlag
    proSteamAccount {
      name
      team {
        id
        tag
        __typename
      }
      __typename
    }
    __typename
  }
  `;

    const LiveMinimapMatchLiveTypeFragment = ` fragment LiveMinimapMatchLiveTypeFragment on MatchLiveType {
    players {
      heroId
      isRadiant
      playbackData {
        positionEvents {
          x
          y
          time
          __typename
        }
        __typename
      }
      ...LiveMinimapHeroHoverCardMatchLivePlayerTypeFragment
      __typename
    }
    playbackData {
      buildingEvents {
        npcId
        isRadiant
        type
        indexId
        isAlive
        time
        positionX
        positionY
        __typename
      }
      __typename
    }
    gameTime
    ...LiveScoreAndTimeMatchLiveTypeFragment
    __typename
  }
  `;
    const LiveMinimapHeroHoverCardMatchLivePlayerTypeFragment = ` fragment LiveMinimapHeroHoverCardMatchLivePlayerTypeFragment on MatchLivePlayerType {
    heroId
    level
    steamAccount {
      ...SteamAccountHoverCardSteamAccountTypeFragment
      __typename
    }
    __typename
  }`;

    const LiveScoreAndTimeMatchLiveTypeFragment = ` fragment LiveScoreAndTimeMatchLiveTypeFragment on MatchLiveType {
    gameTime
    radiantScore
    direScore
    radiantTeam {
      ...LiveScoreAndTimeTeamTypeFragment
      __typename
    }
    direTeam {
      ...LiveScoreAndTimeTeamTypeFragment
      __typename
    }
    playbackData {
      radiantScore {
        ...LiveScoreAndTimeMatchLiveTeamScoreDetailTypeFragment
        __typename
      }
      direScore {
        ...LiveScoreAndTimeMatchLiveTeamScoreDetailTypeFragment
        __typename
      }
      __typename
    }
    __typename
  }`;
    const LiveScoreAndTimeTeamTypeFragment = ` fragment LiveScoreAndTimeTeamTypeFragment on TeamType {
      id
      name
      __typename
    }`;

    const LiveScoreAndTimeMatchLiveTeamScoreDetailTypeFragment = `fragment LiveScoreAndTimeMatchLiveTeamScoreDetailTypeFragment on MatchLiveTeamScoreDetailType {
      time
      score
      __typename
    }
    `;
    const LiveMatchKashaMatchLiveTypeFragment = ` fragment LiveMatchKashaMatchLiveTypeFragment on MatchLiveType {
      matchId
      serverSteamId
      radiantScore
      direScore
      winRateValues
      durationValues
      liveWinRateValues {
        winRate
        __typename
      }
      players {
        networth
        __typename
      }
      radiantTeam {
        ...LiveMatchKashaTeamTypeFragment
        __typename
      }
      direTeam {
        ...LiveMatchKashaTeamTypeFragment
        __typename
      }
      ...GetDidRadiantWinMatchLiveTypeFragment
      __typename
    }`;

    const LiveMatchKashaTeamTypeFragment = ` fragment LiveMatchKashaTeamTypeFragment on TeamType {
      id
      name
      __typename
    }`;

    const GetDidRadiantWinMatchLiveTypeFragment = ` fragment GetDidRadiantWinMatchLiveTypeFragment on MatchLiveType {
      playbackData {
        buildingEvents {
          npcId
          isAlive
          __typename
        }
        __typename
      }
      __typename
    }`;

    const LivePageModifiersMatchLiveType = ` fragment LivePageModifiersMatchLiveType on MatchLiveType {
      players {
        steamAccount {
          ...SteamAccountPageModifierSteamAccountTypeFragment
          __typename
        }
        heroId
        __typename
      }
      radiantTeam {
        ...LivePageModifiersTeamTypeFragment
        __typename
      }
      direTeam {
        ...LivePageModifiersTeamTypeFragment
        __typename
      }
      league {
        id
        displayName
        __typename
      }
      ...GetGameStateMatchLiveTypeFragment
      __typename
    }`;

    const LivePageModifiersTeamTypeFragment = ` fragment LivePageModifiersTeamTypeFragment on TeamType {
      id
      name
      __typename
    }`;

    const SteamAccountPageModifierSteamAccountTypeFragment = ` fragment SteamAccountPageModifierSteamAccountTypeFragment on SteamAccountType {
      id
      name
      avatar
      proSteamAccount {
        name
        team {
          id
          tag
          name
          __typename
        }
        __typename
      }
      __typename
    }`;
    return this.axios.post("", {
      query: `
      ${LiveMatchMatchLiveTypeFragment}
      ${GetGameStateMatchLiveTypeFragment}
      ${LiveMatchFactionMatchLivePlayerTypeFragment}
      ${SteamAccountHoverCardSteamAccountTypeFragment}
      ${LiveMinimapMatchLiveTypeFragment}
      ${LiveMinimapHeroHoverCardMatchLivePlayerTypeFragment}
      ${LiveScoreAndTimeMatchLiveTypeFragment}
      ${LiveScoreAndTimeTeamTypeFragment}
      ${LiveScoreAndTimeMatchLiveTeamScoreDetailTypeFragment}
      ${LiveMatchKashaMatchLiveTypeFragment}
      ${LiveMatchKashaTeamTypeFragment}
      ${GetDidRadiantWinMatchLiveTypeFragment}
      ${LivePageModifiersMatchLiveType}
      ${LivePageModifiersTeamTypeFragment}
      ${SteamAccountPageModifierSteamAccountTypeFragment}
      query GetLiveMatches {
        live {
          matches(request: {take: 100, orderBy: GAME_TIME, isParsing: true}) {
            matchId
            spectators
            ...LiveMatchMatchLiveTypeFragment
            ...LivePageModifiersMatchLiveType
            __typename
          }
          __typename
        }
      }
      `,
    });
  }

  getMatchDetail(id: number) {
    return this.axios.post("", {
      operationName: "GetMatch",
      variables: {
        id,
      },
      query:
        "query GetMatch($id: Long!) {\n  match(id: $id) {\n    id\n    durationSeconds\n    ...MatchBuildsMatchTypeFragment\n    ...MatchGraphs\n    ...MatchLog\n    ...MatchPerformance\n    ...MatchScoreboard\n    ...HeroGuideMatch\n    players {\n      ...HeroGuideMatchPlayer\n      ...HeroGuideMatchPlayerOther\n      __typename\n    }\n    ...MatchHeaderMatchTypeFragment\n    ...MatchLeagueSeriesSectionMatchTypeFragment\n    ...MatchOverviewMatchTypeFragment\n    __typename\n  }\n}\n\nfragment HeroGuideMatch on MatchType {\n  ...HeroGuideTimelineMatch\n  ...HeroGuidePickBan\n  __typename\n}\n\nfragment HeroGuideMatchPlayer on MatchPlayerType {\n  ...HeroGuideTimelineMatchPlayer\n  ...HeroGuideAbilityBuildMatchPlayer\n  ...HeroGuidePostGameStatsMatchPlayer\n  ...HeroGuidePickBanPlayer\n  __typename\n}\n\nfragment HeroGuideMatchPlayerOther on MatchPlayerType {\n  ...HeroGuideTimelineMatchPlayerOther\n  ...HeroGuidePostGameStatsMatchPlayerOther\n  __typename\n}\n\nfragment HeroGuideTimelineMatch on MatchType {\n  durationSeconds\n  towerDeaths {\n    npcId\n    time\n    isRadiant\n    __typename\n  }\n  __typename\n}\n\nfragment HeroGuideTimelineMatchPlayerOther on MatchPlayerType {\n  lane\n  position\n  heroId\n  stats {\n    networthPerMinute\n    level\n    wards {\n      positionX\n      positionY\n      time\n      type\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HeroGuideTimelineMatchPlayer on MatchPlayerType {\n  lane\n  position\n  stats {\n    itemPurchases {\n      time\n      itemId\n      __typename\n    }\n    inventoryReport {\n      backPack0 {\n        ...inventoryReportItem\n        __typename\n      }\n      backPack1 {\n        ...inventoryReportItem\n        __typename\n      }\n      backPack2 {\n        ...inventoryReportItem\n        __typename\n      }\n      item0 {\n        ...inventoryReportItem\n        __typename\n      }\n      item1 {\n        ...inventoryReportItem\n        __typename\n      }\n      item2 {\n        ...inventoryReportItem\n        __typename\n      }\n      item3 {\n        ...inventoryReportItem\n        __typename\n      }\n      item4 {\n        ...inventoryReportItem\n        __typename\n      }\n      item5 {\n        ...inventoryReportItem\n        __typename\n      }\n      neutral0 {\n        ...inventoryReportItem\n        __typename\n      }\n      __typename\n    }\n    spiritBearInventoryReport {\n      backPack0Id\n      backPack1Id\n      backPack2Id\n      item0Id\n      item1Id\n      item2Id\n      item3Id\n      item4Id\n      item5Id\n      neutral0Id\n      __typename\n    }\n    killEvents {\n      time\n      __typename\n    }\n    deathEvents {\n      time\n      __typename\n    }\n    assistEvents {\n      time\n      __typename\n    }\n    goldPerMinute\n    experiencePerMinute\n    lastHitsPerMinute\n    deniesPerMinute\n    level\n    matchPlayerBuffEvent {\n      abilityId\n      itemId\n      time\n      stackCount\n      __typename\n    }\n    __typename\n  }\n  additionalUnit {\n    item0Id\n    item1Id\n    item2Id\n    item3Id\n    item4Id\n    item5Id\n    neutral0Id\n    __typename\n  }\n  __typename\n}\n\nfragment inventoryReportItem on MatchPlayerInventoryObjectType {\n  itemId\n  charges\n  __typename\n}\n\nfragment HeroGuideAbilityBuildMatchPlayer on MatchPlayerType {\n  item0Id\n  item1Id\n  item2Id\n  item3Id\n  item4Id\n  item5Id\n  stats {\n    itemPurchases {\n      itemId\n      __typename\n    }\n    __typename\n  }\n  abilities {\n    abilityId\n    level\n    time\n    __typename\n  }\n  __typename\n}\n\nfragment HeroGuidePostGameStatsMatchPlayerOther on MatchPlayerType {\n  isRadiant\n  kills\n  __typename\n}\n\nfragment HeroGuidePostGameStatsMatchPlayer on MatchPlayerType {\n  isRadiant\n  kills\n  deaths\n  assists\n  level\n  networth\n  imp\n  goldPerMinute\n  experiencePerMinute\n  numLastHits\n  numDenies\n  heroDamage\n  towerDamage\n  heroAverage {\n    time\n    kills\n    deaths\n    assists\n    networth\n    xp\n    cs\n    dn\n    heroDamage\n    towerDamage\n    __typename\n  }\n  __typename\n}\n\nfragment HeroGuidePickBan on MatchType {\n  pickBans {\n    bannedHeroId\n    isPick\n    playerIndex\n    isRadiant\n    order\n    heroId\n    __typename\n  }\n  __typename\n}\n\nfragment HeroGuidePickBanPlayer on MatchPlayerType {\n  playerSlot\n  __typename\n}\n\nfragment MatchBuildsMatchTypeFragment on MatchType {\n  durationSeconds\n  endDateTime\n  gameMode\n  didRadiantWin\n  statsDateTime\n  radiantKills\n  direKills\n  players {\n    isRadiant\n    position\n    heroId\n    level\n    neutral0Id\n    steamAccount {\n      id\n      ...PlayerNameColSteamAccountTypeFragment\n      __typename\n    }\n    stats {\n      inventoryReport {\n        backPack0 {\n          ...inventoryReportItem\n          __typename\n        }\n        backPack1 {\n          ...inventoryReportItem\n          __typename\n        }\n        backPack2 {\n          ...inventoryReportItem\n          __typename\n        }\n        item0 {\n          ...inventoryReportItem\n          __typename\n        }\n        item1 {\n          ...inventoryReportItem\n          __typename\n        }\n        item2 {\n          ...inventoryReportItem\n          __typename\n        }\n        item3 {\n          ...inventoryReportItem\n          __typename\n        }\n        item4 {\n          ...inventoryReportItem\n          __typename\n        }\n        item5 {\n          ...inventoryReportItem\n          __typename\n        }\n        neutral0 {\n          ...inventoryReportItem\n          __typename\n        }\n        __typename\n      }\n      itemPurchases {\n        time\n        itemId\n        __typename\n      }\n      level\n      __typename\n    }\n    abilities {\n      abilityId\n      time\n      level\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PlayerNameColSteamAccountTypeFragment on SteamAccountType {\n  id\n  name\n  proSteamAccount {\n    name\n    __typename\n  }\n  isAnonymous\n  smurfFlag\n  __typename\n}\n\nfragment MatchGraphs on MatchType {\n  durationSeconds\n  winRates\n  radiantNetworthLeads\n  players {\n    stats {\n      level\n      lastHitsPerMinute\n      networthPerMinute\n      actionsPerMinute\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MatchLog on MatchType {\n  id\n  endDateTime\n  statsDateTime\n  towerDeaths {\n    attacker\n    npcId\n    time\n    isRadiant\n    __typename\n  }\n  chatEvents {\n    isRadiant\n    time\n    value\n    fromHeroId\n    type\n    __typename\n  }\n  players {\n    isRadiant\n    heroId\n    position\n    steamAccount {\n      id\n      isAnonymous\n      name\n      smurfFlag\n      proSteamAccount {\n        name\n        __typename\n      }\n      __typename\n    }\n    stats {\n      runes {\n        time\n        rune\n        action\n        __typename\n      }\n      allTalks {\n        time\n        message\n        pausedTick\n        __typename\n      }\n      chatWheels {\n        time\n        chatWheelId\n        __typename\n      }\n      killEvents {\n        time\n        target\n        __typename\n      }\n      deathEvents {\n        time\n        attacker\n        target\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MatchPerformance on MatchType {\n  ...MatchPerformanceDistribution\n  ...MatchPerformanceSimulation\n  __typename\n}\n\nfragment MatchPerformanceDistribution on MatchType {\n  players {\n    award\n    heroId\n    imp\n    stats {\n      impPerMinute\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MatchPerformanceSimulation on MatchType {\n  ...MatchPerformanceSimulationHeroSection\n  ...MatchPerformanceSimulationStatDataRowList\n  __typename\n}\n\nfragment MatchPerformanceSimulationHeroSection on MatchType {\n  rank\n  players {\n    heroId\n    position\n    steamAccount {\n      id\n      name\n      isAnonymous\n      smurfFlag\n      seasonRank\n      proSteamAccount {\n        name\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MatchPerformanceSimulationStatDataRowList on MatchType {\n  players {\n    heroId\n    __typename\n  }\n  __typename\n}\n\nfragment MatchScoreboard on MatchType {\n  didRadiantWin\n  pickBans {\n    heroId\n    order\n    isPick\n    letter\n    __typename\n  }\n  players {\n    position\n    stats {\n      campStack\n      heroDamageReceivedPerMinute\n      runes {\n        time\n        rune\n        action\n        __typename\n      }\n      killEvents {\n        time\n        target\n        __typename\n      }\n      assistEvents {\n        time\n        __typename\n      }\n      deathEvents {\n        time\n        timeDead\n        goldLost\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MatchHeaderMatchTypeFragment on MatchType {\n  id\n  players {\n    heroId\n    position\n    __typename\n  }\n  didRadiantWin\n  radiantTeam {\n    ...MatchHeaderTeamTypeFragment\n    __typename\n  }\n  direTeam {\n    ...MatchHeaderTeamTypeFragment\n    __typename\n  }\n  statsDateTime\n  series {\n    matches {\n      id\n      __typename\n    }\n    __typename\n  }\n  analysisOutcome\n  durationSeconds\n  radiantKills\n  direKills\n  ...MatchHeaderSummaryRowMatchTypeFragment\n  __typename\n}\n\nfragment MatchHeaderTeamTypeFragment on TeamType {\n  id\n  name\n  __typename\n}\n\nfragment MatchHeaderSummaryRowMatchTypeFragment on MatchType {\n  id\n  lobbyType\n  gameMode\n  regionId\n  durationSeconds\n  endDateTime\n  rank\n  league {\n    id\n    displayName\n    __typename\n  }\n  __typename\n}\n\nfragment MatchLeagueSeriesSectionMatchTypeFragment on MatchType {\n  id\n  league {\n    id\n    displayName\n    __typename\n  }\n  series {\n    type\n    matches {\n      id\n      radiantTeamId\n      direTeamId\n      didRadiantWin\n      __typename\n    }\n    node {\n      id\n      nodeType\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MatchOverviewMatchTypeFragment on MatchType {\n  bottomLaneOutcome\n  durationSeconds\n  endDateTime\n  midLaneOutcome\n  statsDateTime\n  topLaneOutcome\n  gameMode\n  players {\n    assists\n    award\n    deaths\n    experiencePerMinute\n    goldPerMinute\n    heroDamage\n    heroHealing\n    heroId\n    imp\n    isRadiant\n    kills\n    lane\n    level\n    networth\n    numDenies\n    numLastHits\n    partyId\n    position\n    towerDamage\n    item0Id\n    item1Id\n    item2Id\n    item3Id\n    item4Id\n    item5Id\n    backpack0Id\n    backpack1Id\n    backpack2Id\n    neutral0Id\n    stats {\n      deniesPerMinute\n      experiencePerMinute\n      goldPerMinute\n      healPerMinute\n      heroDamagePerMinute\n      impPerMinute\n      lastHitsPerMinute\n      level\n      networthPerMinute\n      towerDamagePerMinute\n      killEvents {\n        time\n        target\n        gold\n        xp\n        __typename\n      }\n      deathEvents {\n        time\n        attacker\n        __typename\n      }\n      assistEvents {\n        time\n        __typename\n      }\n      itemPurchases {\n        itemId\n        time\n        __typename\n      }\n      inventoryReport {\n        backPack0 {\n          ...inventoryReportItem\n          __typename\n        }\n        backPack1 {\n          ...inventoryReportItem\n          __typename\n        }\n        backPack2 {\n          ...inventoryReportItem\n          __typename\n        }\n        item0 {\n          ...inventoryReportItem\n          __typename\n        }\n        item1 {\n          ...inventoryReportItem\n          __typename\n        }\n        item2 {\n          ...inventoryReportItem\n          __typename\n        }\n        item3 {\n          ...inventoryReportItem\n          __typename\n        }\n        item4 {\n          ...inventoryReportItem\n          __typename\n        }\n        item5 {\n          ...inventoryReportItem\n          __typename\n        }\n        neutral0 {\n          ...inventoryReportItem\n          __typename\n        }\n        __typename\n      }\n      matchPlayerBuffEvent {\n        time\n        abilityId\n        itemId\n        stackCount\n        __typename\n      }\n      spiritBearInventoryReport {\n        item0Id\n        item1Id\n        item2Id\n        item3Id\n        item4Id\n        item5Id\n        neutral0Id\n        __typename\n      }\n      __typename\n    }\n    abilities {\n      abilityId\n      time\n      __typename\n    }\n    additionalUnit {\n      item0Id\n      item1Id\n      item2Id\n      item3Id\n      item4Id\n      item5Id\n      neutral0Id\n      __typename\n    }\n    steamAccount {\n      id\n      name\n      isAnonymous\n      smurfFlag\n      proSteamAccount {\n        name\n        __typename\n      }\n      seasonRank\n      seasonLeaderboardRank\n      __typename\n    }\n    dotaPlus {\n      level\n      __typename\n    }\n    __typename\n  }\n  towerDeaths {\n    time\n    npcId\n    attacker\n    __typename\n  }\n  radiantNetworthLeads\n  radiantExperienceLeads\n  pickBans {\n    heroId\n    bannedHeroId\n    wasBannedSuccessfully\n    isRadiant\n    order\n    __typename\n  }\n  radiantTeam {\n    ...team\n    __typename\n  }\n  direTeam {\n    ...team\n    __typename\n  }\n  __typename\n}\n\nfragment team on TeamType {\n  id\n  name\n  __typename\n}\n",
    });
  }

  // Lengues
  getActiveLengues() {
    return this.axios.post("", {
      query: `
          fragment LeagueSeriesRowLeague on LeagueType {
            id
            displayName
            region
            nodeGroups {
              ...LeagueSeriesRowNodeGroup
              __typename
            }
            __typename
          }
          fragment LeagueSeriesRowNodeGroup on LeagueNodeGroupType {
            id
            name
            nodes {
              ...LeagueSeriesRowNode
              __typename
            }
            __typename
          }
          fragment LeagueSeriesRowNode on LeagueNodeType {
            id
            scheduledTime
            actualTime
            teamOne {
              ...LeagueSeriesRowTeam
              __typename
            }
            teamTwo {
              ...LeagueSeriesRowTeam
              __typename
            }
            teamOneWins
            teamTwoWins
            hasStarted
            isCompleted
            nodeType
            matches {
              id
              __typename
            }
            __typename
          }
          fragment LeagueSeriesRowTeam on TeamType {
            id
            name
            tag
            __typename
          }
          query GetActiveLeagues($leaguesRequest: LeagueRequestType!) {
            leagues(request: $leaguesRequest) {
              ...LeagueSeriesRowLeague
              __typename
            }
          }
     `,
      variables: {
        leaguesRequest: {
          tiers: [
            "MINOR",
            "MAJOR",
            "INTERNATIONAL",
            "DPC_QUALIFIER",
            "DPC_LEAGUE_QUALIFIER",
            "DPC_LEAGUE",
            "DPC_LEAGUE_FINALS",
          ],
          betweenStartDateTime: 1666544400,
          betweenEndDateTime: 1667235600,
          orderBy: "LAST_MATCH_TIME_THEN_TIER",
        },
      },
    });
  }

  getLeaguesOverviewLeagueCard() {
    return this.axios.post("", [
      {
        operationName: "GetLeaguesOverviewLeagueCard",
        variables: {
          leagueId: 14268,
        },
        query:
          "query GetLeaguesOverviewLeagueCard($leagueId: Int!) {\n  league(id: $leagueId) {\n    id\n    displayName\n    prizePool\n    startDateTime\n    endDateTime\n    __typename\n  }\n}\n",
      },
      {
        operationName: "GetLeaguesSchedule",
        variables: {
          request: {
            tiers: [
              "AMATEUR",
              "PROFESSIONAL",
              "MINOR",
              "MAJOR",
              "INTERNATIONAL",
              "DPC_QUALIFIER",
              "DPC_LEAGUE_QUALIFIER",
              "DPC_LEAGUE",
              "DPC_LEAGUE_FINALS",
            ],
            betweenStartDateTime: 1666198800,
            betweenEndDateTime: 1668013200,
            take: 1000,
          },
        },
        query:
          "query GetLeaguesSchedule($request: LeagueRequestType!) {\n  leagues(request: $request) {\n    ...LeaguesScheduleLeague\n    __typename\n  }\n}\n\nfragment LeaguesScheduleLeague on LeagueType {\n  id\n  region\n  tier\n  nodeGroups {\n    nodes {\n      scheduledTime\n      actualTime\n      teamOneWins\n      teamTwoWins\n      nodeType\n      __typename\n    }\n    __typename\n  }\n  ...LeagueSeriesRowLeague\n  __typename\n}\n\nfragment LeagueSeriesRowLeague on LeagueType {\n  id\n  displayName\n  region\n  nodeGroups {\n    ...LeagueSeriesRowNodeGroup\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowNodeGroup on LeagueNodeGroupType {\n  id\n  name\n  nodes {\n    ...LeagueSeriesRowNode\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowNode on LeagueNodeType {\n  id\n  scheduledTime\n  actualTime\n  teamOne {\n    ...LeagueSeriesRowTeam\n    __typename\n  }\n  teamTwo {\n    ...LeagueSeriesRowTeam\n    __typename\n  }\n  teamOneWins\n  teamTwoWins\n  hasStarted\n  isCompleted\n  nodeType\n  matches {\n    id\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowTeam on TeamType {\n  id\n  name\n  tag\n  __typename\n}\n",
      },
      {
        operationName: "GetLeaguesOverviewLeagueList",
        variables: {
          ongoingRequest: {
            take: 13,
            tiers: [
              "MINOR",
              "MAJOR",
              "DPC_QUALIFIER",
              "DPC_LEAGUE_QUALIFIER",
              "DPC_LEAGUE",
              "DPC_LEAGUE_FINALS",
              "INTERNATIONAL",
            ],
            leagueEnded: false,
            isFutureLeague: false,
          },
          upcomingRequest: {
            take: 13,
            tiers: [
              "MINOR",
              "MAJOR",
              "DPC_QUALIFIER",
              "DPC_LEAGUE_QUALIFIER",
              "DPC_LEAGUE",
              "DPC_LEAGUE_FINALS",
              "INTERNATIONAL",
            ],
            leagueEnded: false,
            isFutureLeague: true,
          },
          completedRequest: {
            take: 13,
            tiers: [
              "MINOR",
              "MAJOR",
              "DPC_QUALIFIER",
              "DPC_LEAGUE_QUALIFIER",
              "DPC_LEAGUE",
              "DPC_LEAGUE_FINALS",
              "INTERNATIONAL",
            ],
            leagueEnded: true,
            isFutureLeague: false,
          },
        },
        query:
          "query GetLeaguesOverviewLeagueList($ongoingRequest: LeagueRequestType!, $upcomingRequest: LeagueRequestType!, $completedRequest: LeagueRequestType!) {\n  ongoing: leagues(request: $ongoingRequest) {\n    ...LeaguesOverviewLeagueFragment\n    __typename\n  }\n  upcoming: leagues(request: $upcomingRequest) {\n    ...LeaguesOverviewLeagueFragment\n    __typename\n  }\n  completed: leagues(request: $completedRequest) {\n    ...LeaguesOverviewLeagueFragment\n    __typename\n  }\n}\n\nfragment LeaguesOverviewLeagueFragment on LeagueType {\n  id\n  displayName\n  startDateTime\n  endDateTime\n  prizePool\n  liveMatches {\n    matchId\n    __typename\n  }\n  standings {\n    standing\n    team {\n      ...LeaguesOverviewLeagueTeamFragment\n      __typename\n    }\n    __typename\n  }\n  matches(request: {take: 1, skip: 0}) {\n    id\n    radiantTeam {\n      ...LeaguesOverviewLeagueTeamFragment\n      __typename\n    }\n    direTeam {\n      ...LeaguesOverviewLeagueTeamFragment\n      __typename\n    }\n    didRadiantWin\n    __typename\n  }\n  matchesGroupBy(request: {groupBy: TEAM, playerList: SINGLE, take: 100}) {\n    id\n    __typename\n  }\n  nodeGroups {\n    nodeGroupType\n    __typename\n  }\n  __typename\n}\n\nfragment LeaguesOverviewLeagueTeamFragment on TeamType {\n  id\n  name\n  __typename\n}\n",
      },
      {
        operationName: "GetLeaguesOverviewLeagueList",
        variables: {
          ongoingRequest: {
            take: 13,
            tiers: ["PROFESSIONAL"],
            leagueEnded: false,
            isFutureLeague: false,
          },
          upcomingRequest: {
            take: 13,
            tiers: ["PROFESSIONAL"],
            leagueEnded: false,
            isFutureLeague: true,
          },
          completedRequest: {
            take: 13,
            tiers: ["PROFESSIONAL"],
            leagueEnded: true,
            isFutureLeague: false,
          },
        },
        query:
          "query GetLeaguesOverviewLeagueList($ongoingRequest: LeagueRequestType!, $upcomingRequest: LeagueRequestType!, $completedRequest: LeagueRequestType!) {\n  ongoing: leagues(request: $ongoingRequest) {\n    ...LeaguesOverviewLeagueFragment\n    __typename\n  }\n  upcoming: leagues(request: $upcomingRequest) {\n    ...LeaguesOverviewLeagueFragment\n    __typename\n  }\n  completed: leagues(request: $completedRequest) {\n    ...LeaguesOverviewLeagueFragment\n    __typename\n  }\n}\n\nfragment LeaguesOverviewLeagueFragment on LeagueType {\n  id\n  displayName\n  startDateTime\n  endDateTime\n  prizePool\n  liveMatches {\n    matchId\n    __typename\n  }\n  standings {\n    standing\n    team {\n      ...LeaguesOverviewLeagueTeamFragment\n      __typename\n    }\n    __typename\n  }\n  matches(request: {take: 1, skip: 0}) {\n    id\n    radiantTeam {\n      ...LeaguesOverviewLeagueTeamFragment\n      __typename\n    }\n    direTeam {\n      ...LeaguesOverviewLeagueTeamFragment\n      __typename\n    }\n    didRadiantWin\n    __typename\n  }\n  matchesGroupBy(request: {groupBy: TEAM, playerList: SINGLE, take: 100}) {\n    id\n    __typename\n  }\n  nodeGroups {\n    nodeGroupType\n    __typename\n  }\n  __typename\n}\n\nfragment LeaguesOverviewLeagueTeamFragment on TeamType {\n  id\n  name\n  __typename\n}\n",
      },
      {
        operationName: "GetLeaguesOverviewLeagueList",
        variables: {
          ongoingRequest: {
            take: 13,
            tiers: ["AMATEUR"],
            leagueEnded: false,
            isFutureLeague: false,
          },
          upcomingRequest: {
            take: 13,
            tiers: ["AMATEUR"],
            leagueEnded: false,
            isFutureLeague: true,
          },
          completedRequest: {
            take: 13,
            tiers: ["AMATEUR"],
            leagueEnded: true,
            isFutureLeague: false,
          },
        },
        query:
          "query GetLeaguesOverviewLeagueList($ongoingRequest: LeagueRequestType!, $upcomingRequest: LeagueRequestType!, $completedRequest: LeagueRequestType!) {\n  ongoing: leagues(request: $ongoingRequest) {\n    ...LeaguesOverviewLeagueFragment\n    __typename\n  }\n  upcoming: leagues(request: $upcomingRequest) {\n    ...LeaguesOverviewLeagueFragment\n    __typename\n  }\n  completed: leagues(request: $completedRequest) {\n    ...LeaguesOverviewLeagueFragment\n    __typename\n  }\n}\n\nfragment LeaguesOverviewLeagueFragment on LeagueType {\n  id\n  displayName\n  startDateTime\n  endDateTime\n  prizePool\n  liveMatches {\n    matchId\n    __typename\n  }\n  standings {\n    standing\n    team {\n      ...LeaguesOverviewLeagueTeamFragment\n      __typename\n    }\n    __typename\n  }\n  matches(request: {take: 1, skip: 0}) {\n    id\n    radiantTeam {\n      ...LeaguesOverviewLeagueTeamFragment\n      __typename\n    }\n    direTeam {\n      ...LeaguesOverviewLeagueTeamFragment\n      __typename\n    }\n    didRadiantWin\n    __typename\n  }\n  matchesGroupBy(request: {groupBy: TEAM, playerList: SINGLE, take: 100}) {\n    id\n    __typename\n  }\n  nodeGroups {\n    nodeGroupType\n    __typename\n  }\n  __typename\n}\n\nfragment LeaguesOverviewLeagueTeamFragment on TeamType {\n  id\n  name\n  __typename\n}\n",
      },
    ]);
  }

  getLiveMatchesLengues() {
    return this.axios.post("", {
      operationName: "GetLiveMatches",
      variables: {
        liveMatchesRequest: {
          take: 100,
          orderBy: "SPECTATOR_COUNT",
          isParsing: true,
        },
      },
      query:
        "query GetLiveMatches($liveMatchesRequest: MatchLiveRequestType!) {\n  live {\n    matches(request: $liveMatchesRequest) {\n      matchId\n      radiantTeamId\n      direTeamId\n      ...HighlightsBarLive\n      ...LeagueSeriesRowLiveMatch\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment HighlightsBarLive on MatchLiveType {\n  matchId\n  gameTime\n  spectators\n  createdDateTime\n  averageRank\n  radiantTeam {\n    ...LeagueSeriesRowTeam\n    __typename\n  }\n  direTeam {\n    ...LeagueSeriesRowTeam\n    __typename\n  }\n  league {\n    ...LeagueSeriesRowLeague\n    __typename\n  }\n  players {\n    ...HighlightsBarLiveMatchPlayer\n    __typename\n  }\n  ...HighlightsBarLeagueLiveMatch\n  __typename\n}\n\nfragment LeagueSeriesRowTeam on TeamType {\n  id\n  name\n  tag\n  __typename\n}\n\nfragment HighlightsBarLiveMatchPlayer on MatchLivePlayerType {\n  isRadiant\n  steamAccount {\n    id\n    seasonLeaderboardRank\n    proSteamAccount {\n      name\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HighlightsBarLeagueLiveMatch on MatchLiveType {\n  matchId\n  radiantTeamId\n  direTeamId\n  radiantScore\n  direScore\n  gameTime\n  completed\n  __typename\n}\n\nfragment LeagueSeriesRowLeague on LeagueType {\n  id\n  displayName\n  region\n  nodeGroups {\n    ...LeagueSeriesRowNodeGroup\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowNodeGroup on LeagueNodeGroupType {\n  id\n  name\n  nodes {\n    ...LeagueSeriesRowNode\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowNode on LeagueNodeType {\n  id\n  scheduledTime\n  actualTime\n  teamOne {\n    ...LeagueSeriesRowTeam\n    __typename\n  }\n  teamTwo {\n    ...LeagueSeriesRowTeam\n    __typename\n  }\n  teamOneWins\n  teamTwoWins\n  hasStarted\n  isCompleted\n  nodeType\n  matches {\n    id\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowLiveMatch on MatchLiveType {\n  matchId\n  gameTime\n  radiantTeamId\n  direTeamId\n  playbackData {\n    pickBans {\n      heroId\n      isPick\n      isRadiant\n      __typename\n    }\n    __typename\n  }\n  players {\n    heroId\n    __typename\n  }\n  __typename\n}\n",
    });
  }
  // players
  getPlayersRanks() {
    return this.axios.post("", {
      operationName: "PlayersRanks",
      variables: {},
      query:
        "query PlayersRanks {\n  stratz {\n    page {\n      players {\n        steamAccountByRank {\n          rank\n          playerCount\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
    });
  }

  getPlayersQueue() {
    return this.axios.post("", {
      operationName: "GetPlayersQueue",
      variables: {},
      query:
        "query GetPlayersQueue {\n  stratz {\n    page {\n      matches {\n        matchmakingStats {\n          ...PlayersQueueMatchmakingStatsFragment\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PlayersQueueMatchmakingStatsFragment on MatchmakingStatsType {\n  timestamp: time\n  australia\n  austria\n  brazil\n  chile\n  dubai\n  europe\n  india\n  japan\n  perfectWorldTelecom\n  perfectWorldTelecomGuangdong\n  perfectWorldTelecomWuhan\n  perfectWorldTelecomZhejiang\n  perfectWorldUnicom\n  perfectWorldUnicomTianjin\n  peru\n  singapore\n  southAfrica\n  stockholm\n  taiwan\n  usEast: uSEast\n  usWest: uSWest\n  __typename\n}\n",
    });
  }

  getCoachesLeaderboard(skip: number = 0) {
    return this.axios.post("", {
      operationName: "GetCoachesLeaderboard",
      variables: {
        take: 20,
        skip,
      },
      query:
        "query GetCoachesLeaderboard($skip: Int, $take: Int) {\n  leaderboard {\n    coaching {\n      players(take: $take, skip: $skip) {\n        steamAccount {\n          id\n          seasonRank\n          seasonLeaderboardRank\n          avatar\n          lastMatchRegionId\n          ...PlayerNameColSteamAccountTypeFragment\n          __typename\n        }\n        matchCount\n        winCount\n        rating\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PlayerNameColSteamAccountTypeFragment on SteamAccountType {\n  id\n  name\n  proSteamAccount {\n    name\n    __typename\n  }\n  isAnonymous\n  smurfFlag\n  __typename\n}\n",
    });
  }

  getPlayersLeaderboards({
    divisionIdNb,
    skip = 0,
    take = 20,
    skipUserFollowingData,
  }: {
    divisionIdNb: number;
    skip?: number;
    take?: number;
    skipUserFollowingData?: boolean;
  }) {
    let leaderBoardDivision = "AMERICAS";
    if (divisionIdNb === 1) {
      leaderBoardDivision = "SE_ASIA";
    }
    if (divisionIdNb === 2) {
      leaderBoardDivision = "EUROPE";
    }
    if (divisionIdNb === 3) {
      leaderBoardDivision = "CHINA";
    }
    return this.axios.post("", {
      operationName: "GetPlayersLeaderboards",
      variables: {
        leaderboardRequestVariable: {
          leaderBoardDivision,
        },
        skip,
        take,
        skipUserFollowingData: false,
      },
      query:
        "query GetPlayersLeaderboards($leaderboardRequestVariable: FilterSeasonLeaderboardRequestType, $skipUserFollowingData: Boolean!, $skip: Long, $take: Long) {\n  leaderboard {\n    season(request: $leaderboardRequestVariable) {\n      playerCount\n      players(skip: $skip, take: $take) {\n        steamAccountId\n        steamAccount {\n          ...LeaderboardSteamAccount\n          __typename\n        }\n        rank\n        rankShift\n        position\n        __typename\n      }\n      countryData {\n        countryCode\n        playerCount\n        __typename\n      }\n      positionData {\n        position\n        playerCount\n        __typename\n      }\n      teamData {\n        id\n        name\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  stratz @skip(if: $skipUserFollowingData) {\n    user {\n      following {\n        steamAccount {\n          ...FollowingSteamAccount\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment LeaderboardSteamAccount on SteamAccountType {\n  id\n  countryCode\n  isAnonymous\n  proSteamAccount {\n    countries\n    __typename\n  }\n  ...TeamTagPlayerNameColSteamAccountTypeFragment\n  __typename\n}\n\nfragment TeamTagPlayerNameColSteamAccountTypeFragment on SteamAccountType {\n  id\n  name\n  proSteamAccount {\n    name\n    team {\n      tag\n      id\n      name\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment FollowingSteamAccount on SteamAccountType {\n  rankShift\n  seasonLeaderboardRank\n  seasonLeaderboardDivisionId\n  proSteamAccount {\n    position\n    __typename\n  }\n  ...LeaderboardSteamAccount\n  __typename\n}\n",
    });
  }

  // Teams
  getTeamOverview(id: number) {
    return this.axios.post("", {
      operationName: "GetTeamOverveiw",
      variables: {
        teamId: id,
        leaguesRequest: {
          tiers: [
            "MINOR",
            "MAJOR",
            "INTERNATIONAL",
            "DPC_QUALIFIER",
            "DPC_LEAGUE_QUALIFIER",
            "DPC_LEAGUE",
            "DPC_LEAGUE_FINALS",
          ],
          betweenStartDateTime: 1672678800,
          betweenEndDateTime: 1673110800,
        },
      },
      query:
        "query GetTeamOverveiw($teamId: Int!, $leaguesRequest: LeagueRequestType!) {\n  team(teamId: $teamId) {\n    id\n    ...TeamOverviewMembersTeamTypeFragment\n    series(request: {take: 6}) {\n      ...TeamSeriesSeriesTypeFragment\n      __typename\n    }\n    ...TeamOverviewSummaryRowTeamTypeFragment\n    __typename\n  }\n  leagues(request: $leaguesRequest) {\n    id\n    ...LeagueSeriesRowLeague\n    __typename\n  }\n}\n\nfragment TeamOverviewMembersTeamTypeFragment on TeamType {\n  id\n  members {\n    lastMatchDateTime\n    firstMatchDateTime\n    player {\n      steamAccountId\n      steamAccount {\n        id\n        name\n        avatar\n        proSteamAccount {\n          name\n          countries\n          realName\n          position\n          __typename\n        }\n        __typename\n      }\n      matchesGroupBy(\n        request: {groupBy: TEAM, teamId: $teamId, playerList: SINGLE, take: 10000}\n      ) {\n        teamId: id\n        matchCount\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  matches(request: {skip: 0, take: 25}) {\n    ...TeamOverviewMembersMatchMatchTypeFragment\n    __typename\n  }\n  __typename\n}\n\nfragment TeamOverviewMembersMatchMatchTypeFragment on MatchType {\n  id\n  players {\n    steamAccountId\n    isVictory\n    heroId\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowLeague on LeagueType {\n  id\n  displayName\n  region\n  nodeGroups {\n    ...LeagueSeriesRowNodeGroup\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowNodeGroup on LeagueNodeGroupType {\n  id\n  name\n  nodes {\n    ...LeagueSeriesRowNode\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowNode on LeagueNodeType {\n  id\n  scheduledTime\n  actualTime\n  teamOne {\n    ...LeagueSeriesRowTeam\n    __typename\n  }\n  teamTwo {\n    ...LeagueSeriesRowTeam\n    __typename\n  }\n  teamOneWins\n  teamTwoWins\n  hasStarted\n  isCompleted\n  nodeType\n  matches {\n    id\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowTeam on TeamType {\n  id\n  name\n  tag\n  __typename\n}\n\nfragment TeamSeriesSeriesTypeFragment on SeriesType {\n  id\n  teamOne {\n    ...LeagueSeriesRowTeam\n    __typename\n  }\n  teamTwo {\n    ...LeagueSeriesRowTeam\n    __typename\n  }\n  teamOneWins: teamOneWinCount\n  teamTwoWins: teamTwoWinCount\n  nodeType: type\n  matches {\n    startDateTime\n    ...LeagueSeriesRowMatch\n    __typename\n  }\n  league {\n    id\n    displayName\n    region\n    __typename\n  }\n  __typename\n}\n\nfragment LeagueSeriesRowMatch on MatchType {\n  id\n  durationSeconds\n  radiantTeamId\n  didRadiantWin\n  players {\n    heroId\n    kills\n    ...MatchHeroPickHoverCardPlayer\n    matchId\n    steamAccountId\n    __typename\n  }\n  radiantKills\n  direKills\n  pickBans {\n    heroId\n    isPick\n    isRadiant\n    order\n    __typename\n  }\n  __typename\n}\n\nfragment MatchHeroPickHoverCardPlayer on MatchPlayerType {\n  heroId\n  position\n  steamAccount {\n    ...SteamAccountHoverCardSteamAccountTypeFragment\n    __typename\n  }\n  __typename\n}\n\nfragment SteamAccountHoverCardSteamAccountTypeFragment on SteamAccountType {\n  id\n  name\n  avatar\n  isAnonymous\n  smurfFlag\n  proSteamAccount {\n    name\n    team {\n      id\n      tag\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment TeamOverviewSummaryRowTeamTypeFragment on TeamType {\n  winCount\n  lossCount\n  countryCode\n  lastMatchDateTime\n  dateCreated\n  __typename\n}\n",
    });
  }
  getTeamHeader(id: number) {
    return this.axios.post("", {
      operationName: "GetTeam",
      variables: {
        id: id,
      },
      query:
        "query GetTeam($id: Int!) {\n  team(teamId: $id) {\n    id\n    ...TeamHeaderTeamTypeFragment\n    __typename\n  }\n}\n\nfragment TeamHeaderTeamTypeFragment on TeamType {\n  id\n  name\n  __typename\n}\n",
    });
  }
}

export default new StratsApiService();
