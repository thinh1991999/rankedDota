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
        query GetHeroOverview($heroId: Short!, $bracketIds: [RankBracket], $bracketBasicIds: [RankBracketBasicEnum]) {
        heroStats {
          ...HeroOverviewGuidesHeroStatsQueryFragment
          ...HeroOverviewItemsHeroStatsQueryFragment
          ...HeroOverviewMatchupsHeroStatsQueryFragment
          ...HeroOverviewGraphsHeroStatsQueryFragment
          ...HeroOverviewPositionsHeroStatsQueryFragment
          ...HeroOverviewRampagesHeroStatsQueryFragment
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
}

export default new StratsApiService();
