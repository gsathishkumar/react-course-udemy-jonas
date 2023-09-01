import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your city by clicking on a city in the Map" />;

  const countries = cities.reduce((array, city) => {
    if (array.map(element => element.country).includes(city.country)) {
      return array;
    } else {
      return [...array, { country: city.country, emoji: city.emoji }];
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
