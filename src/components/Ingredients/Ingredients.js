import React, { useState, useEffect, useCallback } from "react";

import ErrorModal from '../UI/ErrorModal';
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    setLoading(true);
    fetch("https://react-hooks-project-fa3e1.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        setLoading(false);
        return response.json();
      })
      .then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = ingredientId => {
    setLoading(true)
    fetch(
      `https://react-hooks-project-fa3e1.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE"
      }
    ).then(response => {
      setLoading(false)
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
    }).catch(error => {
      setError(error.message)
      setLoading(false)
    });
  };
  const clearError = ()=> {
    setError(null)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm 
      onAddIngredient={addIngredientHandler}
      loading = {isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
