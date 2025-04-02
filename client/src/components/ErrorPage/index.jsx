import { useContext } from "react"
import Text from "../../utils/Text"
import { ThemeContext } from "styled-components";
import "./ErrorPage.css"
import { Button } from "../../utils/buttons";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
    const theme = useContext(ThemeContext);
    const navigate = useNavigate(); 

    return (
        <div className="pageError-container">
            <div className="pageError-text-container">
                <Text variant={'h1'} color={theme.colors.white50}>404</Text>
                <Text variant={'h4'} color={theme.colors.white50}>Page not found</Text>
            </div>
            <Button variant="primary" size={"regular"} icon={"start"} iconName={"chevron-left"} onClick={() => navigate(-1)}>Go back</Button>
        </div>
    )
}