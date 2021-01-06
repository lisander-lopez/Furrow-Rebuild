import { AnimatePresence } from 'framer-motion';
import {useState, useEffect} from 'react';
import Header from '../components/header';
import NavMenu from '../components/navMenu';
import CustomCursor from '../components/customCursor';

import { useGlobalStateContext, useGlobalDispatchContext, onCursor} from '../context/globalContext';

const Layout = ({ children }) => {
    const { cursorStyles } = useGlobalStateContext();
    const [ toggleMenu, setToggleMenu ] = useState(false);
    return (
    <>
        <CustomCursor toggleMenu={toggleMenu} />

        <Header setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
        <AnimatePresence> 
            { toggleMenu && <NavMenu setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} /> }
        </AnimatePresence>
        <main>{children}</main>
    </>)
}

export default Layout;