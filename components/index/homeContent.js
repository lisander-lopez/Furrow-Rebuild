import {useEffect} from 'react'
import styles from "../../styles/index/homeContent.module.scss";
import { useTheme } from 'next-themes';
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

const HomeContent = () => {
    const {theme} = useTheme();
    const animation = useAnimation();
    const [contentRef, inView, entry] = useInView({
        triggerOnce: true,
        rootMargin: '-100px 0px'
    });


    useEffect(() => {
        if(inView) {
            animation.start('visible');
        }
    }, [animation, inView, entry])
    return (
        <motion.div 
            className={`${styles.content_section} ${styles[theme]}`}
            ref={contentRef}
            animate={animation}
            initial='hidden'
            variants= {variants}
        >
            <div className={styles.container}>
                <h2 className={styles.content}>
                Great stories don’t just happen— <br/> they need to be uncovered. And we dig deep 
                to discover the great stories that lie just below the surface. Dirt under our fingernails and all.
                </h2>
            </div>
        </motion.div>
    )
}

export default HomeContent
