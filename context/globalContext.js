const { createContext, useContext, useReducer } = require("react");

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();


const GlobalReducer = (state, action) => {
    switch(action.type) {
        case "CURSOR_TYPE": {
            return {
                ...state,
                cursorType: action.cursorType
            }
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

const cursorStyles = ["pointer", "hovered"];

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(
        GlobalReducer, 
        {
            cursorType: false,
            cursorStyles: cursorStyles
        });
    
    return (
        <GlobalDispatchContext.Provider value={dispatch}>
            <GlobalStateContext.Provider value={state}>
                {children}
            </GlobalStateContext.Provider>
        </GlobalDispatchContext.Provider>
    );
}

export const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
    return cursorType;
}

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export const useGlobalDispatchContext = () => {return( {dispatch: useContext(GlobalDispatchContext), onCursor: onCursor});}
