import { useEffect, useState, useRef, useContext } from 'react';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { motion } from 'framer-motion';
import './select.css';
import { ThemeContext } from 'styled-components';

export const Select = ({selectElements, onSelectedItems}) => {
    const theme = useContext(ThemeContext);

    const [selectedItems, setSelectedItems] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        onSelectedItems(selectElements[selectedItems]);
    }, [])

    useEffect(() => {
        setIsOpen(false);
    }, [selectedItems]);

    useEffect(() => {
        setSelectedItems(0);
    }, [selectElements]);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => {
                setIsVisible(false);
            }, 200);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
        if (isOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const containerVariants = {
        close: { 
            y: -15,
            opacity: 0,
            scale: .8,
        },
        open: {
            scale: 1,
            y: 0,
            opacity: 1,
        }
    }
    const arrowVariants = {
        close: {
            rotate: 0
        },
        open: {
            rotate: 180,
        }
    }

    return (
        <div className='main-select-container' ref={selectRef}>
            <div className="select-container-input" onClick={() => setIsOpen(!isOpen)}>
                <Text variant={'subtitle'}>{selectElements[selectedItems]}</Text>
                <motion.div 
                    className="select-icon-container"
                    variants={arrowVariants} 
                    initial="close"
                    animate={isOpen ? "open" : "close"}
                    transition={theme.transition.main}
                >
                    <Icon name={'chevron-down'} />
                </motion.div>
            </div>
            <motion.div 
                className="select-menu-container"
                variants={containerVariants}
                initial="close"
                animate={isOpen ? "open" : "close"}
                style={{ display: isVisible ? 'block' : 'none' }}
                transition={theme.transition.main}
            >
                {selectElements.map((v, i) => (
                    <div className={`select-menu-children ${selectedItems === i ? 'disabled' : ''}`} onClick={() => {
                        if (selectedItems !== i) {setSelectedItems(i); onSelectedItems(selectElements[i]);}
                    }}><Text variant={'subtitle'}>{v}</Text></div>
                ))}
            </motion.div>
        </div>
    )
}