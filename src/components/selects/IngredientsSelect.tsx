import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

interface IngredientOptionType {
  title: string;
}

const ingredients: IngredientOptionType[] = [
  // ... tus ingredientes aquí ...
  { title: 'Tomate' },
  { title: 'Cebolla' },
  { title: 'Ajo' },
  { title: 'Pimiento' },
  { title: 'Zanahoria' },
  { title: 'Papa' },
  { title: 'Calabacín' },
  { title: 'Berenjena' },
  { title: 'Brócoli' },
  { title: 'Espinaca' },
  { title: 'Lechuga' },
  { title: 'Pepino' },
  { title: 'Apio' },
  { title: 'Remolacha' },
  { title: 'Guisantes' },
  { title: 'Maíz' },
  { title: 'Champiñones' },
  { title: 'Calabaza' },
  { title: 'Rábano' },
  { title: 'Batata' },
  // ... y así sucesivamente ...
];

export default function FixedTags() {
  const [value, setValue] = React.useState<Record<string, number>>({});

  const handleIncrement = (title: string) => {
    setValue(prevValue => ({
      ...prevValue,
      [title]: (prevValue[title] || 0) + 1
    }));
  };

  const handleDecrement = (title: string) => {
    setValue(prevValue => {
      const newValue = { ...prevValue };
      if (newValue[title] > 1) {
        newValue[title] -= 1;
      } else {
        delete newValue[title];
      }
      return newValue;
    });
  };

  const handleDelete = (title: string) => {
    setValue(prevValue => {
      const newValue = { ...prevValue };
      delete newValue[title];
      return newValue;
    });
  };

  return (
    <Autocomplete<IngredientOptionType, true, undefined, undefined>
      multiple
      id="fixed-tags-demo"
      options={ingredients}
      getOptionLabel={(option) => option.title}
      onChange={(event, newValue) => {
        if (newValue[newValue.length - 1]) {
          setValue(prevValue => ({
            ...prevValue,
            [newValue[newValue.length - 1].title]: 1
          }));
        }
      }}
      renderTags={(tagValue, getTagProps) =>
        Object.entries(value).map(([title, count], index) => (
          <Chip
            label={`${title} x${count}`}
            {...getTagProps({ index })}
            deleteIcon={
              <>
                <IconButton onClick={() => handleIncrement(title)} size="small">
                  <AddIcon fontSize="inherit" />
                </IconButton>
                <IconButton onClick={() => handleDecrement(title)} size="small">
                  <RemoveIcon fontSize="inherit" />
                </IconButton>
                <IconButton onClick={() => handleDelete(title)} size="small">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </>
            }
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Ingredientes" placeholder="Favoritos" />
      )}
    />
  );
}
