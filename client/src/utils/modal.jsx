import { motion } from 'framer-motion';
import { ThemeContext } from 'styled-components';
import { useContext, useRef } from 'react';
import { useClickOutside } from 'react-haiku';

export const Modal = ({children, isOpen, onClose}) => {

    const theme = useContext(ThemeContext);
    const ref = useRef(null);

    const handleClickOutside = () => {
        onClose();
    };
    useClickOutside(ref, handleClickOutside);

    const style = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.black50
    }
    
    const bgVariants = {
        hidden: { 
            opacity: 0,
            zIndex: -10,
            transition: {
                delay: .5
            }
        },
        show: {
            opacity: 1,
            zIndex: 10,
        }
    }

    const ModalVariants = {
        closed: {
            y: -15,
            opacity: 0,
            scale: .3,
        },
        open: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                delay: .5
            }
        }
    }
    
    return (
        <motion.div
            style={style}
            variants={bgVariants} 
            initial="hidden"
            transition={theme.transition.main}
            animate={isOpen ? "show" : "hidden"}
        >
            <motion.div
                variants={ModalVariants} 
                initial="closed"
                transition={theme.transition.main}
                animate={isOpen ? "open" : "closed"}
                ref={ref}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}