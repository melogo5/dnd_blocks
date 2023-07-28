export type TBlock = {
    id: number;
    text: string;
    type: 'main-header' | 'header' | 'text';
};

export const TYPE_TAG_BY_NAME = {
    'main-header': 'h1',
    'header': 'h2',
    'text': 'p'
};