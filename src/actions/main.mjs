import * as core from "../core/main.mjs";

export default {
  findClient: () => (state, actions) => {
    const clientKey = new URL(document.location).searchParams.get("key");

    if (clientKey) {
      const clientName = core.clientKeys.get(clientKey.toLowerCase());

      if (clientName) {
        const client = window.localStorage.getItem("client");

        if (client) {
          if (client.includes(clientKey)) {
            actions.inputClient({ value: client });
          } else {
            window.localStorage.removeItem("client");
          }
        }

        return { clientName };
      }

      return { notFoundKey: clientKey.toUpperCase() };
    }

    return { notFoundKey: null };
  },

  inputClient: ({ target, value }) => (state, actions) => {
    if (!value) {
      value = target.value;
    }

    actions.setClient({ value });

    const clientKey = new URL(document.location).searchParams.get("key");

    if (!value.includes(clientKey)) {
      if (target) {
        target.focus();
        target.select();
      }

      return { client: value, clientData: null };
    }

    if (value.length === 36 && value.includes(clientKey)) {
      actions.loadPortal();

      return { loadingClientData: true };
    }
  },

  loadPortal: () => async (state, actions) => {
    const { client } = state;

    const portal = await core.loadPortal({ client });

    actions.setPortal({ portal });
  },

  setPortal: ({ portal }) => {
    if (portal) {
      window.localStorage.setItem(
        "client",
        portal.clientKey ? portal.clientKey : portal._id
      );

      return {
        client: portal.clientKey ? portal.clientKey : portal._id,
        clientData: portal.activation_steps,
        loadingClientData: false
      };
    }

    return { clientData: null, loadingClientData: false };
  },

  setClient: ({ value }) => ({ client: value })
};
