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
