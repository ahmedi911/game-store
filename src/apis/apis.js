import { data } from "react-router-dom";
import { BASE_API, DOMAIN } from "./config";

// Game-related API calls
export const fetchGames = async (jwtToken) => {
  console.log("fetchGames");

  const requestOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwtToken,
    },
  };

  try {
    const response = await fetch(`${BASE_API}/games`, requestOption);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return [data, ""];
    }

    const errorMessage = await response.text();
    console.log("Error:", errorMessage);
    return ["", `Server error: ${errorMessage}`];

  } catch (error) {
    console.log("Network Error:", error);
    return ["", `Server down: ${error.message}`];
  }
};


export const fetchGame = async (jwtToken, id) => {
  console.log("fetchGame");
  const requestOption = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    }
  };

  try {
    // This line needs to be changed from gameId to id
    const response = await fetch(`${BASE_API}/games/${id}`, requestOption);
    if (response.ok) {
      const data = await response.json();
      return [data, ''];
    }
    const errorMessage = await response.text();
    return ['', `Server error: ${errorMessage}`];
  } catch (error) {
    return ['', `Server down: ${error}`];
  }
};

export const createGame = async (jwtToken, gameData) => {
  console.log("createGame");
  const requestOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    },
    body: JSON.stringify({ game: gameData })
  };

  try {
    const response = await fetch(`${BASE_API}/games`, requestOption);
    if (response.ok) {
      const data = await response.json();
      return [data, ''];
    }
    const errorMessage = await response.text();
    return ['', `Server error: ${errorMessage}`];
  } catch (error) {
    return ['', `Server down: ${error}`];
  }
};

export const updateGame = async (jwtToken, id, gameData) => {
  console.log("updateGame");
  const requestOption = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    },
    body: JSON.stringify({ game: gameData })
  };

  try {
    const response = await fetch(`${BASE_API}/games/${id}`, requestOption);
    if (response.ok) {
      const data = await response.json();
      return [data, ''];
    }
    const errorMessage = await response.text();
    return ['', `Server error: ${errorMessage}`];
  } catch (error) {
    return ['', `Server down: ${error}`];
  }
};

export const deleteGame = async (jwtToken, id) => {
  console.log("deleteGame");
  const requestOption = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    }
  };

  try {
    const response = await fetch(`${BASE_API}/games/${id}`, requestOption);
    if (response.ok) {
      return [true, ''];
    }
    const errorMessage = await response.text();
    return ['', `Server error: ${errorMessage}`];
  } catch (error) {
    return ['', `Server down: ${error}`];
  }
};

// Cart-related API calls
export const fetchCart = async (jwtToken, cartId) => {
  console.log("fetchCart");
  const requestOption = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    }
  };

  try {
    const response = await fetch(`${BASE_API}/carts/${cartId}`, requestOption);
    if (response.ok) {
      const data = await response.json();
      return [data, ''];
    }
    const errorMessage = await response.text();
    return ['', `Server error: ${errorMessage}`];
  } catch (error) {
    return ['', `Server down: ${error}`];
  }
};

export const createCart = async (jwtToken, userId = 1) => {
  console.log("createCart");
  const requestOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    },
    body: JSON.stringify({ cart: { user_id: userId } })
  };

  try {
    const response = await fetch(`${BASE_API}/carts`, requestOption);
    if (response.ok) {
      const data = await response.json();
      return [data, ''];
    }
    const errorMessage = await response.text();
    return ['', `Server error: ${errorMessage}`];
  } catch (error) {
    return ['', `Server down: ${error}`];
  }
};

export const addToCart = async (jwtToken, cartId, gameId, quantity = 1) => {
  console.log("addToCart");
  const requestOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    },
    body: JSON.stringify({
      cart_item: {
        cart_id: cartId,
        game_id: gameId,
        quantity: quantity
      }
    })
  };

  try {
    const response = await fetch(`${BASE_API}/cart_items`, requestOption);
    if (response.ok) {
      const data = await response.json();
      return [data, ''];
    }
    const errorMessage = await response.text();
    return ['', `Server error: ${errorMessage}`];
  } catch (error) {
    return ['', `Server down: ${error}`];
  }
};

export const updateCartItem = async (jwtToken, cartItemId, quantity) => {
  console.log("updateCartItem");
  const requestOption = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    },
    body: JSON.stringify({
      cart_item: {
        quantity: quantity
      }
    })
  };

  try {
    const response = await fetch(`${BASE_API}/cart_items/${cartItemId}`, requestOption);
    if (response.ok) {
      const data = await response.json();
      return [data, ''];
    }
    const errorMessage = await response.text();
    return ['', `Server error: ${errorMessage}`];
  } catch (error) {
    return ['', `Server down: ${error}`];
  }
};

export const removeFromCart = async (jwtToken, cartItemId) => {
  console.log("removeFromCart");
  const requestOption = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    }
  };

  try {
    const response = await fetch(`${BASE_API}/cart_items/${cartItemId}`, requestOption);
    if (response.ok) {
      return [true, ''];
    }
    const errorMessage = await response.text();
    return ['', `Server error: ${errorMessage}`];
  } catch (error) {
    return ['', `Server down: ${error}`];
  }
};