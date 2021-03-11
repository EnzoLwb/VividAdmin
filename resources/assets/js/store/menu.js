export const menu = {
		/**
		 * Defines the state being monitored for the module.
		 */
		state: {
				menu_list: [],
				load_menu_status:false
		},
		/**
		 * Defines the actions used to retrieve the data.
		 */
		actions: {
				loadMenu( { commit } ){
						commit( 'setMenuStatus', true );
						axios.post('/admin/getMenu')
								.then(response => {
										commit( 'setMenuList', response.data.data );
								})
								.catch( function(){
										console.log('error')
										commit( 'setMenuList', [] );
								});

				},
		},
		/**
		 * Defines the mutations used
		 */
		mutations: {
				setMenuList( state, menu_list ){
						state.menu_list = menu_list;
				},
				setMenuStatus( state, status ){
						state.load_menu_status = status;
				},
		},
		/**
		 * Defines the getters used by the module
		 */
		getters: {
				getMenuList( state ){
						return state.menu_list;
				},
				getMenuStatus( state ){
						return state.load_menu_status;
				},
		}
};