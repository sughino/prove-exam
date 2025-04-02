import { motion } from 'framer-motion';
import { Icon } from '../Icon';
import { Text } from '../Text';
import './inputField.css';
import { useContext, useState, useEffect, useRef } from 'react';
import { ThemeContext } from 'styled-components';

export const InputField = ({
    onChange, 
    value, 
    placeholder, 
    type, 
    isCorrect, 
    onBlur, 
    name, 
    errorMessage, 
    style, 
    isDisabled,
    isRequired = true
}) => {
    const theme = useContext(ThemeContext);
    const MotionText = motion(Text);
    const inputRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const [hasContent, setHasContent] = useState(!!value);

    const shouldFloat = isFocused || hasContent;

    useEffect(() => {
        setHasContent(!!value);
    }, [value]);

    const labelColor = isCorrect === undefined || isCorrect === null
    ? theme.colors.white 
    : isCorrect 
        ? theme.colors.success 
        : theme.colors.warning;

    const textVariants = {
        down: {
          y: 3,
          fontSize: "1.2rem"
        },
        up: {
          y: -5,
          fontSize: "0.8rem"
        }
    };

    return (
        <div className="inputContainer-wrapper" style={{opacity: isDisabled ? .5 : 1}}>
            <div className="inputField-main-container">
                <div className="inputField-container">
                    <MotionText 
                        variant={'body1'} 
                        className={`inputField-text ${!shouldFloat && isRequired ? 'required' : ''}`}
                        variants={textVariants} 
                        initial={value ? "up" : "down"}
                        animate={shouldFloat ? "up" : "down"}
                        transition={theme.transition.main}
                        color={labelColor}
                    >
                        {placeholder}
                    </MotionText>
                    <input 
                        ref={inputRef}
                        onChange={(e) => {
                            onChange(e);
                            setHasContent(!!e.target.value);
                        }}
                        name={name}
                        value={value} 
                        type={type || 'text'} 
                        className='inputField'
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false); 
                            onBlur();
                        }}
                        autocomplete="off"
                        style={style}
                        disabled={isDisabled}
                    />
                </div>
                {isCorrect !== undefined && (
                    <Icon 
                        name={isCorrect ? 'check' : 'x'} 
                        size={24} 
                        className="inputField-feedback"
                        color={isCorrect ? theme.colors.success : theme.colors.warning}
                    />
                )}
            </div>
            <div className="error-message">
                <Text variant={'body2'} >{errorMessage}</Text>
            </div>
        </div>
    )
}