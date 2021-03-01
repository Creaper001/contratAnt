export const inicialState = {
	image: '',
};

export const useReducer = (state, action) => {
	switch(action.type) {
		case 'setImage':
			return { ...state, image: action.payload.image };
		default:
			return state;
	}
};