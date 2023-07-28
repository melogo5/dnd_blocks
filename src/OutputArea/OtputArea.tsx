import { useEffect, useState } from 'react';
import { TBlock, TYPE_TAG_BY_NAME } from '../interfaces';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { TextField, Button } from '@mui/material';

const generateContent = (items: TBlock[]): string => {
    let result = '';
    items.map(((item) => {
        const tag = TYPE_TAG_BY_NAME[item.type];
        result += `<${tag}>${item.text}</${tag}>\n`
    }));
    return result;
};

export default function OutputArea(props: {items: TBlock[]}) {
    const [content, setContent] = useState<string>(() => generateContent(props.items));
    useEffect(() => {
        setContent(generateContent(props.items))
    }, [props.items]);
    return (
        <div
        className='output-area'
        style={{display: 'flex', flexDirection: 'column'}}>
            <h3 style={{textAlign: 'center'}}>Исходный код</h3>
            <TextField
                style={{marginBottom: '10px'}}
                id="outlined-multiline-flexible"
                label="HTML"
                multiline
                maxRows={50}
                value={content}
            />
            <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => {
                    // Copy the text inside the text field
                    navigator.clipboard.writeText(content);
                }}
            >
                Скопировать
            </Button>
        </div>
    );
}