MDS.init(function (msg) {
  if (msg.event === 'inited') {
    MDS.keypair.set('CHAIN_ERROR', '0');
  }

  if (msg.event === 'MINIMALOG') {
    if (msg.data.message.includes('[!] CONNECTED TO HEAVIER CHAIN')) {
      MDS.keypair.set('CHAIN_ERROR', '1');
    }

    if (msg.data.message.includes('Invalid TxPoW Super Parents')) {
      MDS.keypair.set('CHAIN_ERROR', '1');
    }
  }
});
