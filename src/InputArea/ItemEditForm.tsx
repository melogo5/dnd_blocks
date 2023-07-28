import { MenuItem, TextField, InputLabel, Button, Select } from '@mui/material';
import { useState } from 'react';

const ItemEditForm = (props: {
    text?: string,
    type?: string,
    isCreating: boolean,
    editItemCallback: Function
}) => {
    const [newItemType, setNewItemType] = useState(props.type ?? 'main-header');
    const [newItemText, setNewItemText] = useState(props.text ?? '');
    return (<div className='item-edit-form--container'>
        <h3>{props.isCreating ? 'Создать новый блок' : 'Изменить блок'}</h3>  
      <TextField
        id="outlined-basic"
        error={!newItemText}
        label="Текст"
        variant="outlined"
        value={newItemText}
        helperText="Текст не должен быть пустым"
        onChange={(event) => setNewItemText(event.target.value)}
      />
      <InputLabel id="type-select-label">Тип</InputLabel>
      <Select
        className='item-edit-form--type-select'
        labelId="type-select-label"
        id="type-select"
        value={newItemType}
        label="Тип"
        onChange={(event) => setNewItemType(event.target.value)}
      >
        <MenuItem value={'main-header'}>h1 - Основной заголовок</MenuItem>
        <MenuItem value={'header'}>h2 - Подзаголовок</MenuItem>
        <MenuItem value={'text'}>p - Текст, абзац</MenuItem>
      </Select>
      <Button
        className='item-edit-form--submit-btn'
        variant="contained"
        onClick={() => {
            if (!newItemText) {
                return;
            }
            props.editItemCallback(newItemText, newItemType)}
        }
      > {props.isCreating ? 'Создать' : 'Сохранить'}
      </Button>
    </div>);
};
  export default ItemEditForm;