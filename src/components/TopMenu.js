import React from 'react';
import { Link } from 'react-router-dom';

const TopMenu = () => {
    return (
        <div className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex space-x-10 items-center">
                    <div className="text-lg font-bold">CRM Фермер</div>
                    <nav className="space-x-4">
                        <a href="#home" className="hover:text-gray-400">
                            Главная
                        </a>
                        <a href="#about" className="hover:text-gray-400">
                            О нас
                        </a>
                    </nav>
                </div>
                <Link to="/Login" className="px-20">Войти</Link>
            </div>
        </div>
    );
};

export default TopMenu;