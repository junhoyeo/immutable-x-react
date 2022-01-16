import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useImmutableX } from '@/hooks/useImmutableX';

const LandingPage = () => {
  const { client, link } = useImmutableX('mainnet');

  const onClickSetupIMX = useCallback(async () => {
    const { address, starkPublicKey } = await link.setup({});
    console.log(address, starkPublicKey);
  }, [link]);

  return (
    <Container>
      <SetupButton onClick={onClickSetupIMX}>Setup IMX</SetupButton>
    </Container>
  );
};

export default LandingPage;

const Container = styled.div``;

const SetupButton = styled.button``;
