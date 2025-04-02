import { useEffect, useState } from "react";
import { Navbar } from '../../utils/Navbar';
import { useNavigate, Outlet } from 'react-router-dom';
import './DataLayout.css';

export const DataLayout = () => {
    const navigate = useNavigate(); 

    const activeTextStorage = sessionStorage.getItem('activeText');
    const initialActiveText = activeTextStorage ? activeTextStorage : "Students";
    const [activeText, setActiveText] = useState(initialActiveText);
    
    useEffect(() => {
        sessionStorage.setItem('activeText', activeText);
    }, [activeText])


    const items = [
        { icon: 'user', text: 'Students' },
        { icon: 'book', text: 'Courses' },
        { icon: 'graduation-cap', text: 'Exams' }
    ];

    useEffect(() => {
        navigate(`/${activeText.toLowerCase()}`);
    }, [activeText])

    //TODO se vuoi fare che quando vai hover sulla navbar dietro ci sono le altre pagine tipo: https://ui.aceternity.com/components/tabs
    
    return (
        <div className='bg-exam-container'>
            <Navbar items={items} activeIndex={items.findIndex(item => item.text === activeText)} onSelect={setActiveText} />
            <Outlet/>
        </div>
    );
};

export default DataLayout;