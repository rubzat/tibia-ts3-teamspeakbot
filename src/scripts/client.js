export const sendJoinMessage = async (event = {}) => (
  new Promise(async (resolve) => {
    event.client.message('Welcome! =)');
    event.client.message('Config By Rubzat');
    resolve();
  })
);

export const massKick = async (teamspeak, message) => (
  new Promise(async (resolve) => {
    const clients = await teamspeak.clientList({ client_type: 0 });
    await Promise.all(clients.map((client) => (
      new Promise(async (resolve) => {
        const { propcache } = client;
        const { clid } = propcache;

        await teamspeak.clientKick(clid, 5, message);
        resolve(true);
      })
    )));
    resolve();
  })
);

export const massMove = async (teamspeak, cid, cpw) => (
  new Promise(async (resolve) => {
    const clients = await teamspeak.clientList({ client_type: 0 });
    await Promise.all(clients.map((client) => (
      new Promise(async (resolve) => {
        const { propcache } = client;
        const { cid: currentChannelUserIs } = propcache;

        if (cid !== currentChannelUserIs) {
          await client.move(cid, cpw);
        }
        resolve(true);
      })
    )));
    resolve();
  })
);

export const sendMassPoke = async (teamspeak, message) => (
  new Promise(async (resolve) => {
    const clients = await teamspeak.clientList({ client_type: 0 });
    await Promise.all(clients.map((client) => (
      new Promise(async (resolve) => {
        await client.poke(message);
        resolve(true);
      })
    )));
    resolve();
  })
);

