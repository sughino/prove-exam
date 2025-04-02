import { useContext } from 'react';
import { SpotlightCard } from './SpotlightCard';
import { ThemeContext } from 'styled-components';
import Text from '../Text';
import { Button } from '../buttons';
import { Separator } from '../Separator';
import { Icon } from '../Icon';
import { Dot } from '../Dot';
import { FadeIn } from '../FadeIn';
import './cardType.css';

export const Card = ({
    serial,
    name,
    surname,
    email,
    address,
    zip,
    city,
    province,
    onModify,
    onDelete
}) => {
    const theme = useContext(ThemeContext);
    const studentData = {
        serial: serial,
        name: name,
        surname: surname,
        email: email,
        address: address,
        zip: zip,
        city: city,
        province: province
    };

    return (
        <FadeIn size={'100%'}>
            <SpotlightCard className='main-card' spotlightColor={theme.colors.white20}>
                <div className="card-content-container">
                    <div className="card-top-content-container">
                        <Text variant={'h6'} color={theme.colors.white30}>{serial}</Text>
                        <Text variant={'h4'} className={'card-ellipsis'}>{name} {surname}</Text>
                        <Text variant={'subtitle'}>{email}</Text>
                    </div>
                    <Separator color={theme.colors.white10}/>
                    <div className="card-bottom-content-container">
                        <div className="card-content-container-horizontal">
                            <Icon name={'map-pin-house'} size={20}/>
                        </div>
                        <div className="card-content-bottom-wrapper">
                            <div className="card-content-container-horizontal">
                                <Text variant={'body'}>{address}</Text>
                                <Dot width={5}/>
                                <Text variant={'body'}>{zip}</Text>
                            </div>
                            <div className="card-content-container-horizontal">
                                <Text variant={'body'}>{city}&nbsp;({province})</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-button-container">
                    <Button onlyicon={true} iconName={'trash'} variant={'secondaryWarning'} size={'big'} style={{width: '100%'}} onClick={() => onDelete(studentData)}/>
                    <Button onlyicon={true} iconName={'pencil'} variant={'accent'} size={'big'} style={{width: '100%'}} onClick={() => onModify(studentData)}/>
                </div>
            </SpotlightCard>
        </FadeIn>
    )
}