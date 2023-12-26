import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { microAlgos } from '@algorandfoundation/algokit-utils';
import { AlgoTsPlayClient } from '../contracts/clients/AlgoTsPlayClient';

const fixture = algorandFixture();

let appClient: AlgoTsPlayClient;
let assetId: bigint;

describe('AlgoTsPlay', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;

    appClient = new AlgoTsPlayClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod
    );

    await appClient.create.createApplication({});
    await appClient.appClient.fundAppAccount(microAlgos(5_000_000));
  });

  test('itxnSendAssetCreation', async () => {
    const result = await appClient.itxnSendAssetCreation(
      {},
      {
        sendParams: {
          fee: microAlgos(2000),
        },
      }
    );
    assetId = result.return!.valueOf();
  });

  test('itxnSendAssetTransfer', async () => {
    await appClient.itxnSendAssetTransfer(
      {
        asset: assetId,
        receiver: fixture.context.testAccount.addr,
      },
      {
        sendParams: {
          fee: microAlgos(2000),
        },
      }
    );
  });
});
