import { BlurText } from '../../utils/BlurText';
import { ReadmeComponent } from '../../utils/Markdown';
import { Button } from '../../utils/buttons';
import { Text } from '../../utils/Text';
import { useRef, useContext } from "react";
import { ThemeContext } from 'styled-components';
import { Spacer } from '../../utils/Spacer';
import { useNavigate } from 'react-router-dom';
import "./heroPage.css"
import { FadeIn } from '../../utils/FadeIn';
import { Icon } from '../../utils/Icon';

export const HeroPage = () => {
    const theme = useContext(ThemeContext);
    const readmeRef = useRef(null);
    const navigate = useNavigate(); 

    const seeDocumentation = () => {
        readmeRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    const goToExam = () => {
        navigate('/students');
    };

    return (
        <>
            <div className="hero-container">
                <FadeIn>
                    <BlurText
                        text="Esame full stack web developer"
                        className="BlurText"
                    />
                </FadeIn>
                <FadeIn>
                    <BlurText
                        text="presented by Grasso Ludovico"
                        className="BlurName"
                        initialDelay={800}
                    />
                </FadeIn>
                <Spacer height={theme.sizes.gap6}/>
                <FadeIn>
                    <div className='animated-hero-container'>
                        <Text variant={'body'}>My name is Ludovico Grasso and I am a full stack web development student.
                            In this site you will find my exam, a project that reflects my learning journey and
                            my passion for creating innovative web applications.</Text>
                        <div className='animated-hero-button-container'>
                            <Button icon={'end'} iconName={'chevron-right'} size={'regular'} variant={'primary'} onClick={goToExam}>Go to exam</Button>
                        </div>
                    </div>
                </FadeIn>

                <div className='hero-chevronIcon-container' onClick={seeDocumentation}>
                    <Icon name={'chevrons-down'} size={40}/>
                </div>
 
            </div>
            
            <ReadmeComponent ref={readmeRef}/>
        </>
    )
}

export default HeroPage;