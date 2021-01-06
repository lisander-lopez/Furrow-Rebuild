import React, { useState, useEffect} from 'react'
import style from "../../styles/index/homeFeature.module.scss";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useGlobalDispatchContext } from '../../context/globalContext';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';

const variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: .6, ease: [.6, .05, -.01, .9]}
    },
    hidden: {
        opacity: 0,
        y: 72,
    }
};


const HomeFeature = () => {
    const {theme} = useTheme();
    const { dispatch, onCursor } = useGlobalDispatchContext();

    const [arrowHover, setArrowHovered] = useState(false);

    const animation = useAnimation();
    const [featuredRef, inView, entry] = useInView({
        triggerOnce: true,
        rootMargin: '-300px 0px'
    });


    useEffect(() => {
        if(inView) {
            animation.start('visible');
        }
    }, [animation, inView, entry])

    return (
        <motion.div ref={featuredRef} animate={animation} initial="hidden" variants={variants} className={`${style.feature_section} ${style[theme]}`}>
            <div className={style.container}>
                <Link href={"/"}> 
                    <motion.a
                        onHoverStart={()=> setArrowHovered(!arrowHover)}
                        onHoverEnd={()=> setArrowHovered(!arrowHover)}
                        onMouseEnter={()=>{ dispatch({ type: 'CURSOR_TYPE', cursorType: onCursor('hovered')}); }}
                        onMouseLeave={()=>{ dispatch({ type: 'CURSOR_TYPE', cursorType: onCursor()}); }}
                    >
                        <div className={style.content}>
                            <div className={`${style.flex}`}>
                                <h3>Featured Project</h3>
                                <motion.div 
                                    animate={{opacity: arrowHover ? 1 : 0}}
                                    transition={{duration: .6, ease: [.6, .05, -.01, .9]}}
                                    className={style.meta}>
                                        <h4>PEI Seafood</h4>
                                        <h4>2019</h4>
                                </motion.div>
                            </div>
                            <h2 className={style.feature_title}>
                                NOT <br/> HUMBLE
                                <span className={style.arrow}>
                                    <motion.svg
                                        animate={{x: arrowHover ? 48 : 0}}
                                        transition={{duration: .6, ease: [.6, .05, -.01, .9]}}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 101 57"
                                    >
                                        <path
                                            d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                                            fill="#FFF"
                                            fillRule="evenodd"
                                        ></path>
                                    </motion.svg> 
                                </span>
                            </h2>
                            <div className={style.featured_video}>
                                <video loop autoPlay src="/video/featured-video.mp4"></video>
                            </div>
                        </div>
                    </motion.a>
                </Link>
            </div>
            <div className={style.container}>
                <div className={style.featured_projects}>
                    <div className={`${style.flex} ${style["flex-end"]}`}>
                        <button>
                            <span> All Projects </span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default HomeFeature
