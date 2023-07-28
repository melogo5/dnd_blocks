import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import Block from '../Block/Block';
import { TBlock } from '../interfaces';
import {v4 as uuidv4} from 'uuid';
import './InputArea.css';
import ItemEditForm from './ItemEditForm';

// a little function to help us with reordering the result
const reorder = (list: TBlock[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function InputArea(props: {items: TBlock[], setItemsCallback: Function}) {  
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      props.items,
      result.source.index,
      result.destination.index
    );

    props.setItemsCallback(items);
  }

  const createItemHandler = (text: string, type: string) => {
    props.setItemsCallback([
      ...props.items,
      {
        id: uuidv4(),
        text,
        type
      }
    ])
  };

  return (
    <div className='input-area'>
      <ItemEditForm isCreating={true} editItemCallback={createItemHandler}/>
      <DragDropContext
          onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
              <div
                className='input-area__items-container'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {props.items.map((item: TBlock, index) => (
                  <Block
                    {...item}
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                    removeItemCallback={() => {
                      const newItems = props.items.filter((elem) => elem.id !== item.id);
                      props.setItemsCallback(newItems);
                    }}
                    updateItemCallback={(newText: string, newType: string) => {
                      const newItems = props.items.map((elem) => {
                        if (elem.id === item.id) {
                          elem.text = newText;
                          // @ts-ignore
                          elem.type = newType;
                        }
                        return elem;
                      });
                      props.setItemsCallback(newItems);
                    }}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  );
}