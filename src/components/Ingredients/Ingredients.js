import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientsHandler = ingredient => {
    setUserIngredients(prevIngredients => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredient }
    ]);
  };
  const removeIngredients = id => {
    const newIngredients = [...userIngredients].slice(id, 0);
    setUserIngredients(prevIngredients => [
      ...userIngredients
    ].slice(id,  ));
  };

  return (
    <div className="App">
      <IngredientForm onAddIng={addIngredientsHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredients}
        />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
