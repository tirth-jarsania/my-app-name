import React, { useState,useEffect,useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from './ThemeContext';
function SearchParams() {

  const [location, updateLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme,setTheme] = useContext(ThemeContext);
  async function reqPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });
    setPets(animals || []);
  };
  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedName =
      (breeds === undefined) ? [] : breeds.map(({ name }) => name);
      setBreeds(breedName);
    },
      console.error);
  }, [setBreed, setBreeds, animal]);
  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault();
        reqPets();
      } }>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => updateLocation(e.target.value)} />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select 
               value={theme}
               onChange={e=> setTheme(e.target.value)}
               onBlur={e=> setTheme(e.target.value)}>
                 <option value="peru">Peru</option>
                 <option value="darkblue">Dark Blue</option>
                 <option value="mediumorchid">Medium Orchid</option>
                 <option value="red">Red</option>
          </select>
        </label>
        <button style={{backgroundColor: theme}}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;