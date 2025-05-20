import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagerPage = () => {
    const [products, setProducts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [farmers, setFarmers] = useState([]);
    const [farmer, setFarmer] = useState({
        name: "",
        surname: "",
        patr: "",
    });
    const [deleteFarmerId, setDeleteFarmerId] = useState("");
    const [showAddFarmerModal, setShowAddFarmerModal] = useState(false);
    const [showDeleteFarmerModal, setShowDeleteFarmerModal] = useState(false);
    const [deleteRequestId, setDeleteRequestId] = useState("");
    const [showDeleteRequestsModal, setShowDeleteRequestsModal] = useState(false);
    const [showAddRequestsModal, setShowAddRequestsModal] = useState(false);
    const [request, setRequest] = useState({
        name: "",
        goods: "",
        category: "",
        cost: "",
        farmer_id: "",
    })
    const [showAddProductionModal, setShowAddProductionModal] = useState(false);
    const [showDeleteProductionModal, setShowDeleteProductionModal] = useState(false);
    const [deleteProductionId, setDeleteProductionId] = useState("");
    const [production, setProduction] = useState({
        name: "",
        quality: "",
        amount: "",
        price: "",
        farmer_id: "",
    });

    const UpdateLists = () => {
        axios.get("http://localhost:8000/api/production").then((response) => {
            setProducts(response.data.production);
        });

        axios.get("http://localhost:8000/api/requests").then((response) => {
            setRequests(response.data.requests);
        });

        axios.get("http://localhost:8000/api/farmers").then((response) => {
            setFarmers(response.data.farmers);
        });
    };

    useEffect(() => {
        UpdateLists();
    }, []);

    return (
        <div className="min-h-screen bg-gray-800 p-6 text-white">
            <h1 className="text-3xl font-bold text-center mb-6">CRM Фермер</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Farmers List */}
                <div className="bg-gray-600 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Список фермеров</h2>
                    <ul className="space-y-2">
                        {farmers.map((farmer) => (
                            <li key={farmer[0]} className="bg-gray-700 p-4 rounded-lg mb-4">
                                {farmer[0]} - {farmer[1]} {farmer[3]} {farmer[2]}, Расходы - {farmer[4]} руб. Заработок - {farmer[5]} руб. Доход - {farmer[6]} руб.
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                            onClick={() => setShowAddFarmerModal(true)}
                        >
                            Добавить
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            onClick={() => setShowDeleteFarmerModal(true)}
                        >
                            Удалить
                        </button>
                    </div>
                </div>

                {/* Add Farmer Modal */}
                {showAddFarmerModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4 text-white">Добавить фермера</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    axios
                                        .post("http://localhost:8000/api/farmers", {
                                            name: farmer.name,
                                            surname: farmer.surname,
                                            patr: farmer.patr,
                                        })
                                        .then(() => {
                                            UpdateLists();
                                            setShowAddFarmerModal(false);
                                        });
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Имя</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={farmer.name}
                                        onChange={(e) =>
                                            setFarmer((prev) => ({ ...prev, name: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Фамилия</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={farmer.surname}
                                        onChange={(e) =>
                                            setFarmer((prev) => ({ ...prev, surname: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Отчество</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={farmer.patr}
                                        onChange={(e) =>
                                            setFarmer((prev) => ({ ...prev, patr: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                                        onClick={() => setShowAddFarmerModal(false)}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                    >
                                        Добавить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Farmer Modal */}
                {showDeleteFarmerModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4 text-white">Удалить запрос</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    axios
                                        .delete(`http://localhost:8000/api/farmers/${deleteFarmerId}`)
                                        .then(() => {
                                            UpdateLists();
                                            setShowDeleteRequestsModal(false);
                                            setDeleteRequestId("");
                                        });
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-white mb-2">ID запроса</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={deleteRequestId}
                                        onChange={(e) => setDeleteRequestId(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                                        onClick={() => setShowDeleteFarmerModal(false)}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Requests List */}
                <div className="bg-gray-600 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Список запросов</h2>
                    <ul className="space-y-2">
                        {requests.map((request) => (
                            <li key={request[0]} className="bg-gray-700 p-4 rounded-lg mb-4">
                                {request[0]}. {request[1]} - {request[2]} ({request[3]}) - {request[4]} руб.
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                        <button 
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                            onClick={() => setShowAddRequestsModal(true)}
                        >Добавить</button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            onClick={() => setShowDeleteRequestsModal(true)}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
                
                

                {showDeleteRequestsModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    axios
                                        .delete(`http://localhost:8000/api/requests/${deleteFarmerId}`)
                                        .then(() => {
                                            UpdateLists();
                                            setShowDeleteFarmerModal(false);
                                            setDeleteFarmerId("");
                                        });
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-white mb-2">ID Запроса</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={deleteFarmerId}
                                        onChange={(e) => setDeleteFarmerId(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                                        onClick={() =>  setShowDeleteRequestsModal(false)}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Add Requests Modal */}
                {showAddRequestsModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4 text-white">Добавить запрос</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    axios
                                        .post("http://localhost:8000/api/requests", {
                                            name: request.name,
                                            good: request.goods,
                                            category: request.category,
                                            cost: request.cost,
                                            farmer_id: request.farmer_id,
                                        })
                                        .then(() => {
                                            UpdateLists();
                                            setShowAddRequestsModal(false);
                                        });
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Имя</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={request.name}
                                        onChange={(e) =>
                                            setRequest((prev) => ({ ...prev, name: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Товар</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={request.goods}
                                        onChange={(e) =>
                                            setRequest((prev) => ({ ...prev, goods: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Категория</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={request.category}
                                        onChange={(e) =>
                                            setRequest((prev) => ({ ...prev, category: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Цена</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={request.cost}
                                        onChange={(e) =>
                                            setRequest((prev) => ({ ...prev, cost: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white mb-2">ID Фермера</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={request.farmer_id}
                                        onChange={(e) =>
                                            setRequest((prev) => ({ ...prev, farmer_id: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                                        onClick={() => setShowAddRequestsModal(false)}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                    >
                                        Добавить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Production List */}
                <div className="bg-gray-600 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Список продукции</h2>
                    <ul className="space-y-2">
                        {products.map((item) => (
                            <li key={item[0]} className="bg-gray-700 p-4 rounded-lg mb-4">
                                {item[0]}.{item[1]} {item[2]} качества ({item[3]} шт.) - {item[4]}
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                        <button 
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                            onClick={() => setShowAddProductionModal(true)}
                        >Добавить</button>
                        <button 
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            onClick={() => setShowDeleteProductionModal(true)}
                        >Удалить</button>
                    </div>
                </div>

                {/* Add Production Modal */}
                {showAddProductionModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4 text-white">Добавить продукцию</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    axios
                                        .post("http://localhost:8000/api/production", {
                                            name: production.name,
                                            quality: production.quality,
                                            amount: production.amount,
                                            price: production.price,
                                            farmer_id: production.farmer_id,
                                        })
                                        .then(() => {
                                            UpdateLists();
                                            setShowAddProductionModal(false);
                                        });
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Имя</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={production.name}
                                        onChange={(e) =>
                                            setProduction((prev) => ({ ...prev, name: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Качество</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={production.quality}
                                        onChange={(e) =>
                                            setProduction((prev) => ({ ...prev, quality: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Количество</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={production.amount}
                                        onChange={(e) =>
                                            setProduction((prev) => ({ ...prev, amount: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white mb-2">Цена</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={production.price}
                                        onChange={(e) =>
                                            setProduction((prev) => ({ ...prev, price: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white mb-2">ID Фермера</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={production.farmer_id}
                                        onChange={(e) =>
                                            setProduction((prev) => ({ ...prev, farmer_id: e.target.value }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                                        onClick={() => setShowAddProductionModal(false)}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                    >
                                        Добавить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Production Modal */}
                {showDeleteProductionModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4 text-white">Удалить продукцию</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    axios
                                        .delete(`http://localhost:8000/api/production/${deleteProductionId}`)
                                        .then(() => {
                                            UpdateLists();
                                            setShowDeleteProductionModal(false);
                                            setDeleteProductionId("");
                                        });
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-white mb-2">ID продукции</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={deleteProductionId}
                                        onChange={(e) => setDeleteProductionId(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                                        onClick={() => setShowDeleteProductionModal(false)}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagerPage;
