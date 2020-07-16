import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { client } from "../_app";

// TODO: Get static site generation up with getStaticProps/ getStaticPath??

const GET_PAMPHLET = gql`
  query pamphlet($pamphlet_slug: String!) {
    pamphlet(pamphlet_slug: $pamphlet_slug) {
      id
      links_array
      pamphlet_slug
      user
    }
  }
`;

const Pamphlet = () => {
  const router = useRouter();
  const { pamphlet_slug } = router.query;
  // const { pamphlet_slug } = params;
  console.log(pamphlet_slug);
  const { loading, data, error } = useQuery(GET_PAMPHLET, {
    variables: { pamphlet_slug },
  });
  console.log(data);
  return (
    <div>
      <h1>My pamphlet</h1>
      {loading
        ? "Loading..."
        : data.pamphlet.links_array.map((link, i) => (
            <a href={link} key={i} style={{ display: "block" }}>
              {"Link no: " + i}
            </a>
          ))}
    </div>
  );
};

export default Pamphlet;