import {
  useContext,
  useCallback,
  useReducer,
  useEffect,
  createContext,
} from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:9000';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted': {
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
      };
    }
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'fetchCities::Error loading cities',
        });
      }
    }
    fetchCities();
  }, []);

  const fetchCityById = useCallback(
    async function (cityId) {
      if (Number(cityId) === currentCity.id) return;
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities/${cityId}`);
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'fetchCityById::Error loading city',
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'createCity::Error creating city',
      });
    }
  }

  async function deleteCityById(cityId) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: cityId });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'deleteCityById::Error deleting city',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        fetchCityById,
        createCity,
        deleteCityById,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside of CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
