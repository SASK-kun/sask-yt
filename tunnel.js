const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ 
    port: 2000, 
    subdomain: 'sask-tok-V.1.0
  });

  console.log('====================================');
  console.log('URL: ' + tunnel.url);
  console.log('====================================');

  tunnel.on('close', () => {
    console.log('Tunnel closed');
  });
})();
