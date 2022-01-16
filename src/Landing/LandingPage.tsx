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

const Container = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SetupButton = styled.button`
  width: fit-content;
  padding: 12px 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #17aabf;
  border-radius: 8px;
  background-color: #1dc1d8;

  font-weight: bold;
  font-size: 1.65rem;
  color: white;
  line-height: 120%;
`;
