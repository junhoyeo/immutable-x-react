import { ethers } from 'ethers';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useImmutableX } from '@/hooks/useImmutableX';
import { useImmutableXBalance } from '@/hooks/useImmutableXBalance';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const LandingPage = () => {
  const { client, link } = useImmutableX('mainnet');
  const [address, setAddress] = useLocalStorage<string>('@wallet_address', '');
  const [starkPublicKey, setStarkPublicKey] = useLocalStorage<string>(
    '@stark_public_key',
    '',
  );

  const onClickSetupIMX = useCallback(async () => {
    if (!link) {
      return;
    }
    const { address, starkPublicKey } = await link.setup({});
    setAddress(address);
    setStarkPublicKey(starkPublicKey);
  }, [link, setAddress, setStarkPublicKey]);

  const onClickDisconnectIMX = useCallback(async () => {
    setAddress('');
    setStarkPublicKey('');
  }, [setAddress, setStarkPublicKey]);

  const balance = useImmutableXBalance({ client, address });

  return (
    <Container>
      {!address ? (
        <SetupButton onClick={onClickSetupIMX}>Setup IMX</SetupButton>
      ) : (
        <DisconnectButton onClick={onClickDisconnectIMX}>
          Disconnect
        </DisconnectButton>
      )}
      <br />
      <span>ADDRESS: {address}</span>
      <br />
      <span>STARK PUBLIC KEY: {starkPublicKey}</span>
      <br />
      <ul>
        <li>IMX: {balance ? ethers.utils.formatEther(balance.imx) : '-'}</li>
        <li>
          Preparing withdrawal:{' '}
          {balance
            ? ethers.utils.formatEther(balance.preparingWithdrawal)
            : '-'}
        </li>
        <li>
          Withdrawal:{' '}
          {balance ? ethers.utils.formatEther(balance.withdrawable) : '-'}
        </li>
      </ul>
    </Container>
  );
};

export default LandingPage;

const Container = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const SetupButton = styled.button`
  width: fit-content;
  padding: 12px 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #17aabf;
  border-radius: 10px;
  background-color: #1dc1d8;

  font-weight: bold;
  font-size: 1.65rem;
  color: white;
  line-height: 120%;
`;
const DisconnectButton = styled(SetupButton)`
  border: 3px solid #24d1e9;
  border-radius: 10px;
  background-color: transparent;
  color: #24d1e9;
`;
