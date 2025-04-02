import { Icon } from '../Icon';
import { Text } from '../Text'
import './navbar.css';

export const Navbar = ({ onSelect, items, activeIndex }) => {
    
    return (
        <nav>
            {items.map((item, index) => (
                <div 
                    className={`navbar-content-container ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => {
                        onSelect(item.text);
                    }}
                    key={index}
                >
                    <div className="navbar-content">   
                        <Icon name={item.icon} size={18}/>
                        <Text variant={'subtitle'}>{item.text}</Text>
                    </div>
                </div>
            ))}
        </nav>
    );
};