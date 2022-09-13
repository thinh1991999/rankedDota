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

  getDetailHero(variables: object) {
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
      ${PlayerNameColSteamAccountTypeFragment}
      ${HeroOverviewRampages}
      ${HeroInfo}
        query GetHeroOverview($heroId: Short!, $bracketBasicIds: [RankBracketBasicEnum]) {
        heroStats {
          ...HeroOverviewRampagesHeroStatsQueryFragment
          __typename
        }
        constants {
          ...HeroInfoConstantQueryFragment
        }
      }`,
      variables,
    });
  }
}

export default new StratsApiService();
