import Head from "next/head"

import { SoportePageView } from "@/components/page/Soporte/View"

import type { NextPage } from "next"

export const SoportePage: NextPage = () => (
  <>
    <Head>
      <title>Soporte • nftStore</title>
    </Head>
    <SoportePageView />
  </>
)

// Next.js exige export-default para generar la ruta
export default SoportePage
