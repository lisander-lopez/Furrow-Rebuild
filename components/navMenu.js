import styles from "../styles/navMenu.module.scss";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from "next-themes";
import { useState } from 'react';
import {useGlobalDispatchContext} from '../context/globalContext';


const navRoutes = [
    {id: 0, title: 'note humble', path: '/not-humble', video: 'featured-video.mp4'},
    {id: 1, title: 'bleeping easy', path: '/bleeping-easy', video: 'easy.mp4'},
    {id: 2, title: 'make it zero', path: '/make-it-zero', video: 'make-it-zero.mp4'},
    {id: 3, title: 'it takes an island', path: '/it-takes-an-island', video: 'it-takes-an-island.mp4'},
    {id: 4, title: '50 beaches', path: '/50-beaches', video: '50-beaches.mp4'},
]

const NavMenu = ({setToggleMenu, toggleMenu}) => {
    const {theme} = useTheme();
    const [video, setVideo] = useState({
        show: false,
        video: navRoutes[0].video,
        key: 0
    });
    const {dispatch, onCursor} = useGlobalDispatchContext();

    return (
        <motion.nav className={`${styles.nav} ${styles[theme]}`}
            initial={{ x: "-100%"}}
            exit={{ x: "-100%"}}
            animate={{ x: toggleMenu ? 0: "-100%" }}
            transition={{duration: .8, ease: [.6, .05, -.01, .9]}}
        >
            <div className={styles.container}>
                <div className={styles.nav_header}>
                    <h2>Projects</h2>
                    <div className={styles.nav_close}>
                        <button onClick={()=>{setToggleMenu(!toggleMenu)}}
                            onMouseEnter={()=>{ dispatch({type: 'CURSOR_TYPE', cursorType: onCursor('hovered')}); }}
                            onMouseLeave={()=>{ dispatch({type: 'CURSOR_TYPE', cursorType: onCursor()}); }}
                        >
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>

                <div className={styles.nav_list}>
                    <ul>
                        {
                            navRoutes.map(route => {
                                return (
                                    <li key={route.id}>
                                        <motion.div className={styles.li_wrapper}
                                            initial={{x: -108}}
                                            whileHover={{
                                                x: -40,
                                                transition:{ duration: .4, ease: [.6, .05, -.01, .9] }
                                            }}
                                            onHoverStart={() => {
                                                setVideo({
                                                    show: true,
                                                    video: route.video,
                                                    key: route.id
                                                });
                                            }}
                                            onHoverEnd={() => {
                                                setVideo({
                                                    show: false,
                                                    video: route.video,
                                                    key: route.id
                                                });
                                            }}
                                            onMouseEnter={()=>{ dispatch({type: 'CURSOR_TYPE', cursorType: onCursor('hovered')}); }}
                                            onMouseLeave={()=>{ dispatch({type: 'CURSOR_TYPE', cursorType: onCursor()}); }}
                                        >
                                            <span
                                                className={styles.nav_arrow}>
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 101 57"
                                                >
                                                    <path
                                                    d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                                                    fill="#FFF"
                                                    fillRule="evenodd"
                                                    ></path>
                                                </svg> 
                                            </span>

                                            <Link href={`/projects/${route.path}`}>                                
                                                <a className={styles.nav_link}>{route.title}</a>
                                            </Link>
                                        </motion.div>

                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                <div className={styles.nav_footer}>
                    d
                </div>

                <div className={styles.nav_video_container}>
                    <motion.div className={styles.reveal}
                        animate={{ width: video.show ? 0 : "100%"}}>

                    </motion.div>
                    <div className={styles.video}>
                        <AnimatePresence initial={false} exitBeforeEnter>
                            <motion.video 
                                key={video.key}
                                initial={{opacity: 0}}
                                exit={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition = {{
                                    duration: 0.1,
                                    ease: "easeInOut"
                                }}
                                src={`video/${video.video}`} loop autoPlay>

                            </motion.video>
                        </AnimatePresence>
                    </div>
                </div>

                
            </div>
        </motion.nav>
    )
}

export default NavMenu;