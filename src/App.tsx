// Написать блочный редактор на React.
// Есть страница и на нее можно добавлять блоки текста с заданным типом:
// Заголовок 1 (h1), Заголовок 2 (h2) и текст (p).
// Блоков может быть произвольное число. Тип блока можно сменить.
// Блоки можно произвольно переупорядочивать
// В качестве «выходных» данных из редактора должен быть текст с HTML разметкой (в скобках указаны названия тэгов)
import { useState } from 'react';
import './App.css';

import InputArea from './InputArea/InputArea';
import { TBlock } from './interfaces';
import OutputArea from './OutputArea/OtputArea';

const blocksList: TBlock[] = [
  {
    id: 1,
    text: 'a',
    type: 'header'
  },
  {
    id: 2,
    text: 'b',
    type: 'main-header'
  },
  {
    id: 3,
    text: 'c',
    type: 'text'
  },
  {
    id: 4,
    text: 'd',
    type: 'text'
  }
];

function App() {
  const [items, setItems] = useState<TBlock[]>(blocksList);

  return (
    <div className="App">
      <h2 style={{textAlign: 'center'}}>Для удаления или редактирования блока - ПКМ по блоку</h2>
      <div className='container'>
        <InputArea
          items={items}
          setItemsCallback={(newItems: TBlock[]) => setItems(newItems)}
        ></InputArea>
        <OutputArea items={items}></OutputArea>
      </div>
    </div>
  );
}

export default App;
