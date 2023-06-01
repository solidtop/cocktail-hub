import { FC } from 'react';
import Navbar from '@/components/Navbar';

const Header: FC = () => {
    return (
        <header className='flex justify-between'>
            <h1>CocktailHub</h1>
            <Navbar />
        </header>
    );
}

export default Header;
