import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const RecipeSearch = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const ID = " use your id here";
    const key = " use your key here ";

    const searchRecipes = async () => {
        try {
            const response = await axios.get(
                `https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${key}`
            );
            setRecipes(response.data.hits);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            // Handle error, show error message, etc.
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchRecipes();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchRecipes();
        }
    };

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
        setModalIsOpen(false);
    };

    return (
        <div className="max-w-6xl mx-auto px-4">
            <form onSubmit={handleSubmit} className="mt-8 mb-4 flex items-center justify-center">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress} // Add event listener for key press
                    placeholder="Search for recipes..."
                    className="border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r focus:outline-none focus:ring focus:border-blue-300">
                    Search
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe, index) => (
                    <div key={index} className="bg-white rounded shadow-md">
                        <img src={recipe.recipe.image} alt={recipe.recipe.label} className="w-full h-48 object-cover rounded-t" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{recipe.recipe.label}</h3>
                            <p className="text-sm text-gray-600">{recipe.recipe.source}</p>
                            <div className="flex justify-between mt-4">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300" onClick={() => window.open(recipe.recipe.url, '_blank')}>
                                    View Recipe
                                </button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-green-300" onClick={() => openModal(recipe)}>
                                    Show Ingredients
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="View Ingredients"
                className="modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust overlay color as needed
                    },
                    content: {
                        width: '300px', // Adjust width as needed
                        maxHeight: '80vh', // Adjust height as needed
                        margin: 'auto',
                    }
                }}
            >
                <button onClick={closeModal} className="close-button bg-white">&times;</button>
                {selectedRecipe && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-white">{selectedRecipe.recipe.label}</h2>
                        <div className="grid grid-cols-1 gap-2">
                            {selectedRecipe.recipe.ingredients.map((ingredient, index) => (
                                <div key={index} className="bg-gray-100 p-2 rounded">{ingredient.text}</div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>

        </div>
    );
};

export default RecipeSearch;
