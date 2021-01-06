import styles from '../../styles/index/homeHero.module.scss';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useEffect, useRef} from "react";
import useWindowSize from '../../hooks/useWindowSize';
import { useGlobalDispatchContext } from '../../context/globalContext';

const HomeHero = () => {
    const { theme } = useTheme();
    let canvas = useRef(null);
    const size = useWindowSize();
    const { dispatch, onCursor } = useGlobalDispatchContext();

    useEffect(() => {
        let renderingElement = canvas.current;
        let drawingElement = renderingElement.cloneNode();

        let drawingContext = drawingElement.getContext('2d');
        let renderingContext = renderingElement.getContext('2d');

        let lastX;
        let lastY;
        
        let moving = false;

        renderingContext.globalCompositeOperation = 'source-over';
        renderingContext.fillStyle = theme === 'dark' ? "#000000": "#FFFFFF";
        renderingContext.fillRect(0,0, size.width, size.height);
        
        
        
        const _mouseOver = e => {
            moving = true;
            lastX = e.pageX - renderingElement.offsetLeft;
            lastY = e.pageY - renderingElement.offsetTop;
        }

        const _mouseUp = e => {
            moving = false;
            lastX = e.pageX - renderingElement.offsetLeft;
            lastY = e.pageY - renderingElement.offsetTop;
        }

        const _mouseMove = e => {
            if(moving){
                drawingContext.globalCompositeOperation = 'source-over';
                renderingContext.globalCompositeOperation = 'destination-out';
                let currentX = e.pageX - renderingElement.offsetLeft;
                let currentY = e.pageY - renderingElement.offsetTop;
                drawingContext.lineJoin = 'round';
                drawingContext.moveTo(lastX, lastY);
                drawingContext.lineTo(currentX, currentY);
                drawingContext.closePath();
                drawingContext.lineWidth = 120;
                drawingContext.stroke();
                lastX = currentX;
                lastY = currentY;
                renderingContext.drawImage(drawingElement, 0, 10);
            }
        }

        renderingElement.addEventListener('mouseover', _mouseOver);
        renderingElement.addEventListener('mouseup', _mouseUp);
        renderingElement.addEventListener('mousemove', _mouseMove);

        return () => {
            renderingElement.removeEventListener('mouseover', _mouseOver);
            renderingElement.removeEventListener('mouseup', _mouseUp);
            renderingElement.removeEventListener('mousemove', _mouseMove);
        }
    }, [theme])

    const parent = {
        initial: {y: 100},
        animate : {
            y: 0,
            transition: {
                staggerChilderen: 0.2
            },
        }
    };

    const child = {
        initial: {y: 100},
        animate : {
            y: 0,
            transition: {
                duration: 1,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    };

    return (
        <div className={`${styles[theme]} ${styles.hero_wrapper}`}>
            <div className={`${styles.video_wrapper}`}>
                <video loop autoPlay muted src="video/video.mp4" >

                </video>
            </div>
            <canvas 
                ref={canvas} 
                width={size.width} 
                height={size.height}
                onMouseEnter={()=>{ dispatch({ type: 'CURSOR_TYPE', cursorType: onCursor('hovered')}); }}
                onMouseLeave={()=>{ dispatch({ type: 'CURSOR_TYPE', cursorType: onCursor()}); }}
            >

            </canvas>
            <motion.div className={`${styles.hero_text_wrapper}`} variants={parent} initial='initial' animate='animate'>
                <motion.h1 variants={child}>DIG</motion.h1>
                <motion.h1 variants={child}>DEEP</motion.h1>
            </motion.div>
        </div>
    )
}

export default HomeHero