import _ from "lodash";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { MoonLoader } from "react-spinners";
import HeroIntro from "../../components/Hero/HeroIntro";
import Layout from "../../components/Layout";
import {
  Hero,
  HeroVsHeroMatchup,
  Position,
  Rampage,
  RoleStatus,
} from "../../interfaces/heroes";
import stratsApiService from "../../services/stratsApi.service";
import { usePageLoading } from "../../share";
import { NextPageWithLayout } from "../_app";
import { GuideSymbol } from "../../interfaces/guide";
import FeaturedGuides from "../../components/Hero/FeaturedGuides";
import {
  ItemBootPurchase,
  ItemNeutral,
  PurchasePattern,
} from "../../interfaces/item";
import HeroItems from "../../components/Hero/HeroItems";
import HeroRampage from "../../components/Hero/HeroRampage";
import HeroDetailAndLore from "../../components/Hero/HeroDetailAndLore";
import {
  ChartPickRate,
  HeroCharWinrate,
  MatchUps,
  OptionsRank,
  RolesStatus,
} from "../../components";
import { WinGameVersion } from "../../interfaces/gameVersion";

type Props = {
  heroOverView: {
    hero: Hero;
  };
};

type MainData = {
  rampages: Rampage[];
  guide: GuideSymbol[];
  purchasePattern: PurchasePattern;
  itemNeutral: ItemNeutral[];
  itemBootPurchase: ItemBootPurchase;
  heroVsHeroMatchup: HeroVsHeroMatchup;
  positions: Position[];
  rolesStatus: {
    pos1: RoleStatus[];
    pos2: RoleStatus[];
    pos3: RoleStatus[];
    pos4: RoleStatus[];
    pos5: RoleStatus[];
  };
  winGameVersion: WinGameVersion[];
};

const HeroesPage: NextPageWithLayout<Props> = (props) => {
  const {
    heroOverView: { hero },
  } = props;
  const router = useRouter();
  const { isPageLoading } = usePageLoading();

  const [loading, setLoading] = useState<boolean>(false);
  const [mainData, setMainData] = useState<MainData>();

  useEffect(() => {
    let isApiSubcribed: boolean = true;
    setLoading(true);
    const bracketBasicIds = router.query?.rankBracketHeroTimeDetail;
    const topPlayersBracketIds: string[] = [];
    if (bracketBasicIds) {
      const idxRegex = bracketBasicIds.indexOf("_");
      const bracketLeft = bracketBasicIds.slice(0, idxRegex);
      const bracketRight = bracketBasicIds.slice(
        idxRegex + 1,
        bracketBasicIds.length
      );
      topPlayersBracketIds.push(String(bracketLeft));
      topPlayersBracketIds.push(String(bracketRight));
    } else {
      topPlayersBracketIds.push("IMMORTAL");
    }
    const variables: object = {
      heroId: Number(router.query?.id),
      bracketIds: topPlayersBracketIds,
      bracketBasicIds: bracketBasicIds,
      topPlayersBracketIds,
    };
    const result = _(variables).omit(_.isUndefined).omit(_.isNull).value();
    stratsApiService.getDetailHero(result).then((res) => {
      if (isApiSubcribed) {
        const {
          heroStats: {
            rampages,
            guide,
            purchasePattern,
            itemNeutral,
            itemBootPurchase,
            heroVsHeroMatchup,
            position,
            laneOutcome_POSITION_1,
            laneOutcome_POSITION_2,
            laneOutcome_POSITION_3,
            laneOutcome_POSITION_4,
            laneOutcome_POSITION_5,
            winGameVersion,
          },
        } = res.data.data;
        setMainData({
          rampages,
          guide,
          purchasePattern,
          itemNeutral,
          itemBootPurchase,
          heroVsHeroMatchup,
          positions: position,
          rolesStatus: {
            pos1: laneOutcome_POSITION_1,
            pos2: laneOutcome_POSITION_2,
            pos3: laneOutcome_POSITION_3,
            pos4: laneOutcome_POSITION_4,
            pos5: laneOutcome_POSITION_5,
          },
          winGameVersion,
        });
        setLoading(false);
      }
    });
    return () => {
      isApiSubcribed = false;
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>{hero.displayName}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <HeroIntro hero={hero} />
        <div className="container m-auto mt-5">
          <OptionsRank />
          {loading && (
            <div className="py-10 flex justify-center items-center">
              <MoonLoader color="#fff" size={40} />
            </div>
          )}
          {!loading && mainData && (
            <>
              <div className="mb-8 flex -ml-2 -mr-2">
                <div className="w-1/3 p-2 lg:h-[200px]">
                  <HeroCharWinrate
                    winGameVersions={mainData.winGameVersion}
                    hero={hero}
                  />
                </div>
                <div className="w-1/3 p-2 lg:h-[200px]">
                  <ChartPickRate
                    winGameVersions={mainData.winGameVersion}
                    hero={hero}
                  />
                </div>
                <div className="w-1/3 p-2 lg:h-[200px]">
                  <MatchUps
                    heroVsHeroMatchup={mainData.heroVsHeroMatchup}
                    hero={hero}
                  />
                </div>
              </div>
              <div className="mb-8">
                <RolesStatus
                  data={mainData.rolesStatus}
                  positions={mainData.positions}
                />
              </div>
              <div className="mb-8">
                <HeroItems
                  purchasePattern={mainData.purchasePattern}
                  itemNeutral={mainData.itemNeutral}
                  itemBootPurchase={mainData.itemBootPurchase}
                />
              </div>
              {mainData.guide.length > 0 && (
                <div className="mb-8">
                  <FeaturedGuides hero={hero} guide={mainData.guide[0]} />
                </div>
              )}
              <div className="mb-8">
                <HeroRampage rampages={mainData.rampages} />
              </div>
              <div className="mb-8">
                <HeroDetailAndLore hero={hero} />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

HeroesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const variables: object = {
    heroId: Number(context.params?.id),
  };
  const res = await stratsApiService.getHeroInfo(variables);
  const {
    constants: { hero },
  }: {
    constants: { hero: Hero };
  } = res.data.data;
  return {
    props: {
      heroOverView: {
        hero,
      },
    },
  };
};

export default HeroesPage;
