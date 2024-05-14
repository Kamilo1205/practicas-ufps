import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest'
//import './Autocomplete.css'; // Estilo CSS opcional

interface Option {
  id: string | number
  label: string;
}

// Lista de opciones disponibles
const availableOptions = [
  { id: 1, label: 'Opción 1' },
  { id: 2, label: 'Opción 2' },
  { id: 3, label: 'Opción 3' },
  { id: 4, label: 'Opción 4' },
  { id: 5, label: 'Opción 5' }
];

// Función para obtener las sugerencias que coincidan con el valor ingresado por el usuario
const getSuggestions = (value:string) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : availableOptions.filter(option =>
    option.label.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// Componente de autocompletado
export const AutocompleteInput = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<Option[]>([]);

  // Función para manejar los cambios en el valor del input
  const onChange = (event, { newValue }:{newValue:string}) => {
    //console.log('onChange', newValue);
    setValue(newValue);
  };

  // Función para manejar el cambio de sugerencias al escribir
  const onSuggestionsFetchRequested = ({ value }:{value:string}) => {
    setSuggestions(getSuggestions(value));
  };

  // Función para limpiar las sugerencias al borrar el input
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Renderizado de las sugerencias
  const renderSuggestion = (suggestion:Option) => (
    <div>
      {suggestion.label}
    </div>
  );

  // Configuración de Autosuggest
  const inputProps = {
    placeholder: 'Selecciona una opción',
    value,
    onChange: onChange,
    className: 'w-full h-10 px-2 py-2 border border-gray-300 rounded'
  };

  const containerClassNames = {
    container: "relative",
    suggestionsContainer: "absolute top-10 w-full border border-gray-100 bg-white rounded z-10",
    suggestion: "cursor-pointer px-2 py-2",
    suggestionHighlighted: "bg-blue-200"
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={suggestion => suggestion.label}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={containerClassNames}
    />
  );
};

export default AutocompleteInput;
