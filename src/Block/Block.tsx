import { useState } from 'react';
import './Block.css';
import { Draggable } from 'react-beautiful-dnd';
import { Stack, Button } from '@mui/material';
import { TBlock } from '../interfaces';
import useContextMenu from '../customHooks/useContextMenu';
import { ContextMenu } from '../styles';
import ItemEditForm from '../InputArea/ItemEditForm';

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: 16,
  margin: `0 0 ${8}px 0`,

  background: isDragging ? "lightgreen" : "antiquewhite",

  ...draggableStyle
});

const Wrapper = (props: TBlock) => {
  const { type, text } = props;
  return (
    <Stack>
      {type === 'main-header' ? <h1 title={text} className="block--text">{text}</h1> : (
        type === 'header' ? <h2 title={text} className="block--text">{text}</h2> : (
          type === 'text' ? <p title={text} className="block--text">{text}</p> :
                            <div title={text} className="block--text">{text}</div>
        )
      )}
    </Stack>
  );
}

export default function Block(props: TBlock & {
  id: number,
  draggableId: string,
  removeItemCallback: Function,
  updateItemCallback?: Function,
  index: number
}) {
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  const [ isEditing, setIsEditing ] = useState(false);

  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided, snapshot) => (
        <div
          className='block'
          onContextMenu={(e) => {
            e.preventDefault();
            if (isEditing) return;
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Wrapper {...props}/>
          {isEditing && (
            <div >
              <ItemEditForm
                editItemCallback={(text: string, type: string) => {
                  setIsEditing(false);
                  props.updateItemCallback?.(text, type)
                }}
                isCreating={false}
                text={props.text}
                type={props.type}
              ></ItemEditForm>
              {!isEditing ? (<Button style={{width: '100%'}} variant="contained" onClick={() => setIsEditing(false)}>Ок</Button>) : <></> }
            </div>
          )}
          {clicked && (
            //@ts-ignore
            <ContextMenu top={points.y} left={points.x}>
              <ul>
                <li onMouseDown={() => setIsEditing(true)}>Изменить</li>
                <li onMouseDown={() => props.removeItemCallback()}>Удалить</li>
              </ul>
            </ContextMenu>
          )}
        </div>
      )}
    </Draggable>
  );
}