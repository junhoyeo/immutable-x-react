import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { ImmutableXClient } from '@imtbl/imx-sdk';

type UseBalanceParams = {
  client: ImmutableXClient;
  address: string;
};

type ImmutableXBalance = {
  imx: ethers.BigNumber;
  preparingWithdrawal: ethers.BigNumber;
  withdrawable: ethers.BigNumber;
};

export const useImmutableXBalance = ({
  client,
  address,
}: UseBalanceParams): ImmutableXBalance | null => {
  const [balance, setBalance] = useState<ImmutableXBalance | null>(null);

  useEffect(() => {
    if (!client || !address) {
      return;
    }
    client
      .getBalances({
        user: address as any, // unbranding from `EthAddressBrand`
      })
      .then((data) => {
        setBalance({
          imx: data.imx,
          preparingWithdrawal: data.preparing_withdrawal,
          withdrawable: data.withdrawable,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [client, address]);

  return balance;
};
