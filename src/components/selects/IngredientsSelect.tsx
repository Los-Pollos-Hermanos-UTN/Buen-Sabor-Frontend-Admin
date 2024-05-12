import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Ingredients } from '../../types/Ingredients';


const ingredients: Ingredients[] = [
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

// Añade las propiedades aquí
interface FixedTagsProps {
    id: string;
    value: { title: string }[];
    onChange: (event: any, newValue: any) => void;
}

export default function FixedTags({ id,  value: valueProp, onChange }: FixedTagsProps) {
    const [value, setValue] = React.useState<Record<string, number>>({
        ...valueProp.reduce((acc, curr) => ({ ...acc, [curr.title]: 1 }), {}),
    });

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
        <Autocomplete<Ingredients, true, undefined, undefined>
            multiple
            id={id}
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
                <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                    {Object.entries(value).map(([title, count], index) => (
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
                    ))}
                </div>
            }
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label="Ingredientes" placeholder="Favoritos" />
            )}
        />
    );
}
