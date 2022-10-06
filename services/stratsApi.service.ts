import axios from "axios";
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

  getHeroInfo(variables: object) {
    const HeroInfo = `fragment HeroInfoConstantQueryFragment on ConstantQuery {
      hero(id: $heroId) {
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
              lore
              attributes
              aghanimDescription
              shardDescription
              description
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
              manaCost
              cooldown
            }
            attributes {
              name
              value
              linkedSpecialBonusAbilityId
            }
            drawMatchPage
            isTalent
          }
          __typename
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
      }
    }`;
    return this.axios.post("", {
      query: `
      ${HeroInfo}
        query GetHeroOverview($heroId: Short!) {
        constants {
          ...HeroInfoConstantQueryFragment
        }
      }`,
      variables,
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
      drawMatchPage
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
          drawMatchPage
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
    return this.axios.post("", {
      query: `
      {
        constants{
          ${abilities}
          ${items}
          ${heroes}
          ${gameVersions}
        }
      }
      `,
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

  getMatchDetail(variables: object) {
    const HeroGuideMatch = ` fragment HeroGuideMatch on MatchType {
      ...HeroGuideTimelineMatch
      ...HeroGuidePickBan
      __typename
    }`;

    const HeroGuideMatchPlayer = ` fragment HeroGuideMatchPlayer on MatchPlayerType {
      ...HeroGuideTimelineMatchPlayer
      ...HeroGuideAbilityBuildMatchPlayer
      ...HeroGuidePostGameStatsMatchPlayer
      ...HeroGuidePickBanPlayer
      __typename
    }`;

    const HeroGuideMatchPlayerOther = `fragment HeroGuideMatchPlayerOther on MatchPlayerType {
  ...HeroGuideTimelineMatchPlayerOther
  ...HeroGuidePostGameStatsMatchPlayerOther
  __typename
}`;

    const HeroGuideTimelineMatch = ` fragment HeroGuideTimelineMatch on MatchType {
      durationSeconds
      stats {
        towerDeaths {
          npcId
          time
          isRadiant
          __typename
        }
        __typename
      }
      __typename
    }
    `;
    const HeroGuideTimelineMatchPlayerOther = ` fragment HeroGuideTimelineMatchPlayerOther on MatchPlayerType {
      lane
      role
      heroId
      stats {
        networthPerMinute
        level
        wards {
          positionX
          positionY
          time
          type
          __typename
        }
        __typename
      }
      __typename
    }`;

    const HeroGuideTimelineMatchPlayer = ` fragment HeroGuideTimelineMatchPlayer on MatchPlayerType {
      lane
      role
      stats {
        itemPurchases {
          time
          itemId
          __typename
        }
        inventoryReport {
          backPack0 {
            ...inventoryReportItem
            __typename
          }
          backPack1 {
            ...inventoryReportItem
            __typename
          }
          backPack2 {
            ...inventoryReportItem
            __typename
          }
          item0 {
            ...inventoryReportItem
            __typename
          }
          item1 {
            ...inventoryReportItem
            __typename
          }
          item2 {
            ...inventoryReportItem
            __typename
          }
          item3 {
            ...inventoryReportItem
            __typename
          }
          item4 {
            ...inventoryReportItem
            __typename
          }
          item5 {
            ...inventoryReportItem
            __typename
          }
          neutral0 {
            ...inventoryReportItem
            __typename
          }
          __typename
        }
        spiritBearInventoryReport {
          backPack0Id
          backPack1Id
          backPack2Id
          item0Id
          item1Id
          item2Id
          item3Id
          item4Id
          item5Id
          neutral0Id
          __typename
        }
        killEvents {
          time
          __typename
        }
        deathEvents {
          time
          __typename
        }
        assistEvents {
          time
          __typename
        }
        goldPerMinute
        experiencePerMinute
        lastHitsPerMinute
        deniesPerMinute
        level
        matchPlayerBuffEvent {
          abilityId
          itemId
          time
          stackCount
          __typename
        }
        __typename
      }
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
      __typename
    }`;

    const inventoryReportItem = ` fragment inventoryReportItem on MatchPlayerInventoryObjectType {
      itemId
      charges
      __typename
    }`;

    const HeroGuideAbilityBuildMatchPlayer = ` fragment HeroGuideAbilityBuildMatchPlayer on MatchPlayerType {
      item0Id
      item1Id
      item2Id
      item3Id
      item4Id
      item5Id
      stats {
        itemPurchases {
          itemId
          __typename
        }
        abilities {
          abilityId
          level
          time
          __typename
        }
        __typename
      }
      __typename
    }`;

    const HeroGuidePostGameStatsMatchPlayerOther = `fragment HeroGuidePostGameStatsMatchPlayerOther on MatchPlayerType {
      isRadiant
      kills
      __typename
    }`;

    const HeroGuidePostGameStatsMatchPlayer = `fragment HeroGuidePostGameStatsMatchPlayer on MatchPlayerType {
      isRadiant
      kills
      deaths
      assists
      level
      networth
      imp
      goldPerMinute
      experiencePerMinute
      numLastHits
      numDenies
      heroDamage
      towerDamage
      heroAverage {
        time
        kills
        deaths
        assists
        networth
        xp
        cs
        dn
        heroDamage
        towerDamage
        __typename
      }
      __typename
    }`;

    const HeroGuidePickBan = `fragment HeroGuidePickBan on MatchType {
      stats {
        pickBans {
          bannedHeroId
          isPick
          playerIndex
          isRadiant
          order
          heroId
          __typename
        }
        __typename
      }
      __typename
    }`;

    const HeroGuidePickBanPlayer = ` fragment HeroGuidePickBanPlayer on MatchPlayerType {
      playerSlot
      __typename
    }`;

    const MatchLanesMatchTypeFragment = `fragment MatchLanesMatchTypeFragment on MatchType {
      players {
        stats {
          tripsFountainPerMinute
          farmDistributionReport {
            other {
              id
              count
              __typename
            }
            creepType {
              id
              count
              __typename
            }
            neutralLocation {
              count
              __typename
            }
            ancientLocation {
              count
              __typename
            }
            __typename
          }
          assistEvents {
            target
            __typename
          }
          __typename
        }
        __typename
      }
      topLaneOutcome
      bottomLaneOutcome
      midLaneOutcome
      stats {
        towerStatus {
          towers {
            npcId
            hp
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }`;

    const MatchBuilds = `fragment MatchBuilds on MatchType {
      didRadiantWin
      statsDateTime
      stats {
        radiantKills
        direKills
        __typename
      }
      players {
        role
        lane
        heroId
        level
        neutral0Id
        steamAccount {
          id
          name
          isAnonymous
          smurfFlag
          proSteamAccount {
            name
            __typename
          }
          __typename
        }
        stats {
          abilities {
            abilityId
            time
            level
            __typename
          }
          itemPurchases {
            time
            itemId
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }`;

    const MatchGraphs = `fragment MatchGraphs on MatchType {
      durationSeconds
      stats {
        winRates
        radiantNetworthLeads
        __typename
      }
      players {
        stats {
          level
          lastHitsPerMinute
          networthPerMinute
          actionsPerMinute
          __typename
        }
        __typename
      }
      __typename
    }`;

    const MatchLog = `fragment MatchLog on MatchType {
      id
      endDateTime
      statsDateTime
      stats {
        towerDeaths {
          attacker
          npcId
          time
          isRadiant
          __typename
        }
        chatEvents {
          isRadiant
          time
          value
          fromHeroId
          type
          __typename
        }
        __typename
      }
      players {
        isRadiant
        heroId
        lane
        role
        steamAccount {
          id
          isAnonymous
          name
          smurfFlag
          proSteamAccount {
            name
            __typename
          }
          __typename
        }
        stats {
          runes {
            time
            rune
            action
            __typename
          }
          allTalks {
            time
            message
            pausedTick
            __typename
          }
          chatWheels {
            time
            chatWheelId
            __typename
          }
          killEvents {
            time
            target
            __typename
          }
          deathEvents {
            time
            attacker
            target
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }`;

    const MatchPerformance = ` fragment MatchPerformance on MatchType {
      ...MatchPerformanceDistribution
      ...MatchPerformanceSimulation
      __typename
    }`;

    const MatchPerformanceDistribution = `fragment MatchPerformanceDistribution on MatchType {
      players {
        award
        heroId
        imp
        stats {
          impPerMinute2
          __typename
        }
        __typename
      }
      __typename
    }`;

    const MatchPerformanceSimulation = ` fragment MatchPerformanceSimulation on MatchType {
      ...MatchPerformanceSimulationHeroSection
      ...MatchPerformanceSimulationStatDataRowList
      __typename
    }`;

    const MatchPerformanceSimulationHeroSection = ` fragment MatchPerformanceSimulationHeroSection on MatchType {
      rank
      players {
        heroId
        lane
        role
        steamAccount {
          id
          name
          isAnonymous
          smurfFlag
          seasonRank
          proSteamAccount {
            name
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }`;

    const MatchPerformanceSimulationStatDataRowList = ` fragment MatchPerformanceSimulationStatDataRowList on MatchType {
      players {
        heroId
        __typename
      }
      __typename
    }
    `;

    const MatchScoreboard = `fragment MatchScoreboard on MatchType {
      didRadiantWin
      stats {
        pickBans {
          heroId
          order
          isPick
          letter
          __typename
        }
        __typename
      }
      players {
        role
        stats {
          campStack
          heroDamageReceivedPerMinute
          runes {
            time
            rune
            action
            __typename
          }
          killEvents {
            time
            target
            __typename
          }
          assistEvents {
            time
            __typename
          }
          deathEvents {
            time
            timeDead
            goldLost
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }`;

    const MatchHeaderMatchTypeFragment = `fragment MatchHeaderMatchTypeFragment on MatchType {
      id
      players {
        heroId
        role
        lane
        __typename
      }
      didRadiantWin
      radiantTeam {
        ...MatchHeaderTeamTypeFragment
        __typename
      }
      direTeam {
        ...MatchHeaderTeamTypeFragment
        __typename
      }
      statsDateTime
      series {
        matches {
          id
          __typename
        }
        __typename
      }
      analysisOutcome
      durationSeconds
      stats {
        radiantKills
        direKills
        __typename
      }
      ...MatchHeaderSummaryRowMatchTypeFragment
      __typename
    }`;

    const MatchHeaderTeamTypeFragment = `fragment MatchHeaderTeamTypeFragment on TeamType {
      id
      name
      __typename
    }`;

    const MatchHeaderSummaryRowMatchTypeFragment = `fragment MatchHeaderSummaryRowMatchTypeFragment on MatchType {
      id
      lobbyType
      gameMode
      regionId
      durationSeconds
      endDateTime
      rank
      league {
        id
        displayName
        __typename
      }
      __typename
    }`;

    const MatchLeagueSeriesSectionMatchTypeFragmen = `fragment MatchLeagueSeriesSectionMatchTypeFragment on MatchType {
      id
      league {
        id
        displayName
        __typename
      }
      series {
        type
        matches {
          id
          radiantTeamId
          direTeamId
          didRadiantWin
          __typename
        }
        __typename
      }
      __typename
    }`;

    const MatchOverviewMatchTypeFragment = `fragment MatchOverviewMatchTypeFragment on MatchType {
      bottomLaneOutcome
      durationSeconds
      endDateTime
      midLaneOutcome
      statsDateTime
      topLaneOutcome
      gameMode
      players {
        assists
        award
        deaths
        experiencePerMinute
        goldPerMinute
        heroDamage
        heroHealing
        heroId
        imp
        isRadiant
        kills
        lane
        level
        networth
        numDenies
        numLastHits
        partyId
        position
        towerDamage
        item0Id
        item1Id
        item2Id
        item3Id
        item4Id
        item5Id
        backpack0Id
        backpack1Id
        backpack2Id
        neutral0Id
        stats {
          deniesPerMinute
          experiencePerMinute
          goldPerMinute
          healPerMinute
          heroDamagePerMinute
          impPerMinute2
          lastHitsPerMinute
          level
          networthPerMinute
          towerDamagePerMinute
          killEvents {
            time
            target
            gold
            xp
            __typename
          }
          deathEvents {
            time
            attacker
            __typename
          }
          assistEvents {
            time
            __typename
          }
          itemPurchases {
            itemId
            time
            __typename
          }
          inventoryReport {
            backPack0 {
              ...inventoryReportItem
              __typename
            }
            backPack1 {
              ...inventoryReportItem
              __typename
            }
            backPack2 {
              ...inventoryReportItem
              __typename
            }
            item0 {
              ...inventoryReportItem
              __typename
            }
            item1 {
              ...inventoryReportItem
              __typename
            }
            item2 {
              ...inventoryReportItem
              __typename
            }
            item3 {
              ...inventoryReportItem
              __typename
            }
            item4 {
              ...inventoryReportItem
              __typename
            }
            item5 {
              ...inventoryReportItem
              __typename
            }
            neutral0 {
              ...inventoryReportItem
              __typename
            }
            __typename
          }
          matchPlayerBuffEvent {
            time
            abilityId
            itemId
            stackCount
            __typename
          }
          spiritBearInventoryReport {
            item0Id
            item1Id
            item2Id
            item3Id
            item4Id
            item5Id
            neutral0Id
            __typename
          }
          abilities {
            abilityId
            time
            __typename
          }
          __typename
        }
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
        steamAccount {
          id
          name
          isAnonymous
          smurfFlag
          proSteamAccount {
            name
            __typename
          }
          seasonRank
          seasonLeaderboardRank
          __typename
        }
        dotaPlus {
          level
          __typename
        }
        __typename
      }
      stats {
        towerDeaths {
          time
          npcId
          attacker
          __typename
        }
        radiantNetworthLeads
        radiantExperienceLeads
        pickBans {
          heroId
          bannedHeroId
          wasBannedSuccessfully
          isRadiant
          order
          __typename
        }
        __typename
      }
      radiantTeam {
        ...team
        __typename
      }
      direTeam {
        ...team
        __typename
      }
      __typename
    }`;

    const team = ` fragment team on TeamType {
      id
      name
      __typename
    }`;
    return this.axios.post("", {
      query: `
      ${HeroGuideMatch}
      ${HeroGuideMatchPlayer}
      ${HeroGuideMatchPlayerOther}
      ${HeroGuideTimelineMatch}
      ${HeroGuideTimelineMatchPlayerOther}
      ${HeroGuideTimelineMatchPlayer}
      ${inventoryReportItem}
      ${HeroGuideAbilityBuildMatchPlayer}
      ${HeroGuidePostGameStatsMatchPlayerOther}
      ${HeroGuidePostGameStatsMatchPlayer}
      ${HeroGuidePickBan}
      ${HeroGuidePickBanPlayer}
      ${MatchLanesMatchTypeFragment}
      ${MatchBuilds}
      ${MatchGraphs}
      ${MatchLog}
      ${MatchPerformance}
      ${MatchPerformanceDistribution}
      ${MatchPerformanceSimulation}
      ${MatchPerformanceSimulationHeroSection}
      ${MatchPerformanceSimulationStatDataRowList}
      ${MatchScoreboard}
      ${MatchHeaderMatchTypeFragment}
      ${MatchHeaderTeamTypeFragment}
      ${MatchHeaderSummaryRowMatchTypeFragment}
      ${MatchLeagueSeriesSectionMatchTypeFragmen}
      ${MatchOverviewMatchTypeFragment}
      ${team}
      query GetMatch($id: Long!) {
        match(id: $id) {
          id
          durationSeconds
          ...MatchBuilds
          ...MatchGraphs
          ...MatchLanesMatchTypeFragment
          ...MatchLog
          ...MatchPerformance
          ...MatchScoreboard
          ...HeroGuideMatch
          players {
            ...HeroGuideMatchPlayer
            ...HeroGuideMatchPlayerOther
            __typename
          }
          ...MatchHeaderMatchTypeFragment
          ...MatchLeagueSeriesSectionMatchTypeFragment
          ...MatchOverviewMatchTypeFragment
          __typename
        }
      }`,
      variables,
    });
  }
}

export default new StratsApiService();
