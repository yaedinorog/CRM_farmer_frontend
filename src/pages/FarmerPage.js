import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

const FarmerPage = () => {
    const [products, setProducts] = useState([]);
    const [requests, setRequests] = useState([]); // New state for requests
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        quality: "",
        amount: "",
        description: "",
        price: "",
        farmer_id: 1,
    });
    const [requestData, setRequestData] = useState({
        name: "",
        good: "",
        category: "",
        cost: "",
        farmer_id: 1,
    });

    const productModalRef = useRef(null);
    const requestModalRef = useRef(null);

    const fetchFarmerProducts = () => {
        axios.get("http://localhost:8000/api/production").then((response) => {
            setProducts(response.data.production);
        });
    };

    const fetchFarmerRequests = () => {
        axios.get("http://localhost:8000/api/requests").then((response) => {
            setRequests(response.data.requests);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRequestInputChange = (e) => {
        const { name, value } = e.target;
        setRequestData({ ...requestData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/production", formData).then(() => {
            fetchFarmerProducts();
            setIsProductModalOpen(false);
            setFormData({ name: "", quality: "", amount: "", price: "" });
        });
    };

    const handleRequestFormSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/requests", requestData).then(() => {
            fetchFarmerRequests();
            setIsRequestModalOpen(false);
            setRequestData({ name: "", good: "", category: "", cost: "" });
        });
    };

    const handleOutsideClick = (e) => {
        if (productModalRef.current && !productModalRef.current.contains(e.target)) {
            setIsProductModalOpen(false);
        }
        if (requestModalRef.current && !requestModalRef.current.contains(e.target)) {
            setIsRequestModalOpen(false);
        }
    };

    useEffect(() => {
        if (isProductModalOpen || isRequestModalOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isProductModalOpen, isRequestModalOpen]);

    useEffect(() => {
        fetchFarmerProducts();
        fetchFarmerRequests();
    }, []);

    return (
        <div className='flex min-h-screen bg-gray-900 text-white justify-center p-10 relative'>
            <div className='w-1/2'>
                {/* Top part: List of products */}
                <div className='flex-grow p-4'>
                    <div className='mb-4'>Список последней внесенной продукции</div>
                    <ul>
                        {products.map((item) => (
                            <li key={item[0]} className="bg-gray-700 p-4 rounded-lg mb-4">
                                {item[1]} {item[2]} качества ({item[3]} шт.) - {item[4]}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='w-1/2'>
                <div className='flex-grow p-4'>
                    <div className='mb-4'>Список требований</div>
                    <ul>
                        {requests.map((request) => (
                            <li key={request[0]} className="bg-gray-700 p-4 rounded-lg mb-4">
                                {request[1]} - {request[2]} ({request[3]}) - {request[4]} руб.
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom part: Buttons */}
            <div className='absolute bottom-0 left-0 right-0 flex justify-center p-4'>
                <button
                    className='w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l'
                    onClick={() => setIsProductModalOpen(true)}
                >
                    Добавить продукт
                </button>
                <button
                    className='w-1/4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r'
                    onClick={() => setIsRequestModalOpen(true)}
                >
                    Добавить требование
                </button>
            </div>

            {/* Product Modal */}
            {isProductModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div ref={productModalRef} className="bg-gray-800 p-6 rounded-lg w-1/3">
                        <h2 className="text-xl mb-4">Добавить продукт</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Название</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Качество</label>
                                <input
                                    type="text"
                                    name="quality"
                                    value={formData.quality}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Количество</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Стоимость</label>
                                <textarea
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsProductModalOpen(false)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Request Modal */}
            {isRequestModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div ref={requestModalRef} className="bg-gray-800 p-6 rounded-lg w-1/3">
                        <h2 className="text-xl mb-4">Добавить требование</h2>
                        <form onSubmit={handleRequestFormSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Название</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={requestData.name}
                                    onChange={handleRequestInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Товар</label>
                                <input
                                    type="text"
                                    name="good"
                                    value={requestData.good}
                                    onChange={handleRequestInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Категория</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={requestData.category}
                                    onChange={handleRequestInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Стоимость</label>
                                <input
                                    type="number"
                                    name="cost"
                                    value={requestData.cost}
                                    onChange={handleRequestInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsRequestModalOpen(false)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FarmerPage;