import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { findFundingBySlug, getFunding } from "../database/funding";
import { default as IFunding } from "../types/funding";
import { Text } from "@chakra-ui/layout";

const Funding = ({ funding }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return <Text>{funding.name}</Text>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { funding } = await findFundingBySlug(context.params.slug.toString());

  return {
    props: {
      funding,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { fundings } = await getFunding();
  console.log({ fundings });
  const paths = fundings.map((funding: IFunding) => ({
    params: { slug: funding.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Funding;
