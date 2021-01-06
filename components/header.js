import styles from '../styles/header.module.scss';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {useGlobalDispatchContext} from '../context/globalContext';

const Header = ({setToggleMenu, toggleMenu}) => {
    const { theme, setTheme } = useTheme();
    const {dispatch, onCursor} = useGlobalDispatchContext();

    return (
        <motion.div 
            className={`${styles[theme]} ${styles.wrapper}`}
            animate={{y:0, opacity: 1}}
            initial={{y:-72, opacity: 0}}
            transition= {{duration: 1, ease: [.6, .05, -.01, .9]}}
        >
            <div className={`${styles.container}`}>
                <nav className={styles.nav}>
                    <div className={styles.logo} 
                        onMouseEnter={()=>{ dispatch({type: 'CURSOR_TYPE', cursorType: onCursor('hovered')}); }}
                        onMouseLeave={()=>{ dispatch({type: 'CURSOR_TYPE', cursorType: onCursor()}); }}
                    >
                        <Link href="/"> FURR </Link>
                        <span 
                            onClick={()=>{theme == 'light' ? setTheme('dark') : setTheme('light') }}
                            onMouseEnter={()=>{ dispatch({type: 'CURSOR_TYPE', cursorType: onCursor('pointer')}); }}
                            onMouseLeave={()=>{ dispatch({type: 'CURSOR_TYPE', cursorType: onCursor()}); }}
                        ></span>
                        <Link href="/"> W </Link>
                    </div>
                    <div className={styles.menu}>
                        <button onClick={() => { setToggleMenu(!toggleMenu) }}>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>
            </div>
        </motion.div>
    )
}

export default Header
