const state = {
  client: null,
};

const mutations = {
  SET_CLIENT: (state, client) => {
    state.client = client;
  },
};

const actions = {
  /* getAllArea({ commit }) {
        let params = {
            args: "{}"
        };
        getProvince(params).then(response => {
            if (response.code === 0) {
                let Data = response.ret["region_obj"] || [];
                commit('SET_ALLAREA', recursionSplit(Data, 1));
            }
        })
    } */
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
