import styles from '../styles/customCursor.module.scss';
import { useTheme } from 'next-themes';
import { useState, useEffect } from "react";

import {useGlobalStateContext} from '../context/globalContext';

function CustomCursor({toggleMenu}) {
    const { theme } = useTheme();
    const {cursorType} = useGlobalStateContext();
    const [mousePos, setMousePos] = useState({
        x: 0,
        y: 0
    })

    const onMouseMove = event => {
        const {pageX: x, pageY: y} = event;

        setMousePos({x, y});
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);
        
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        }
    }, [])

    return (
        <div 
            className={`${styles.custom_cursor} ${styles[theme]} ${!!cursorType ? `${styles.hovered}` : ""} ${cursorType && styles[cursorType]} ${toggleMenu && styles.nav_opened}`}
            style={{transform: `translate(${mousePos.x - 25}px, ${mousePos.y-25}px)`}}
        >
        </div>
    )
}

export default CustomCursor
