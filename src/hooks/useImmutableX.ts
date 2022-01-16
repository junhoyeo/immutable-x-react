import { useEffect, useRef } from 'react';

import { ImmutableXClient, Link } from '@imtbl/imx-sdk';

const ENDPOINTS = {
  mainnet: {
    LINK: 'https://link.x.immutable.com',
    PUBLIC_API: 'https://api.x.immutable.com/v1',
  },
  ropsten: {
    LINK: 'https://ropsten.link.x.immutable.com',
    PUBLIC_API: 'https://ropsten.api.x.immutable.com/v1',
  },
};

type Environment = 'mainnet' | 'ropsten';

export const getImmutableX = async (environment: Environment) => {
  const Endpoint =
    environment === 'mainnet' ? ENDPOINTS.mainnet : ENDPOINTS.ropsten;

  const link = new Link(Endpoint.LINK);
  const client = await ImmutableXClient.build({
    publicApiUrl: Endpoint.PUBLIC_API,
  });

  return { link, client };
};

export const useImmutableX = (environment: Environment) => {
  const linkRef = useRef<Link | null>(null);
  const clientRef = useRef<ImmutableXClient | null>(null);

  useEffect(() => {
    getImmutableX(environment).then(({ link, client }) => {
      linkRef.current = link;
      clientRef.current = client;
    });
  }, [environment]);

  return { link: linkRef.current, client: clientRef.current };
};
