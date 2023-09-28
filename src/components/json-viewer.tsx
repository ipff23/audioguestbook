'use client';
import ReactJson from 'react-json-view';

export interface JsonViewerProps {
    data?: any;
    collapsed?: boolean;
}

const REACT_JSON_THEME = 'ocean';
const REACT_JSON_STYLES = {
    backgroundColor: 'rgb(15, 23, 42)',
    fontSize: '0.778rem',
};

export default function JsonViewer({ data = {}, collapsed = true }: JsonViewerProps) {
    return (
        <div className='block max-w-full p-4 bg-slate-900'>
            <ReactJson
                src={data}
                theme={REACT_JSON_THEME}
                style={REACT_JSON_STYLES}
                collapsed={collapsed}
            />
        </div>
    );
}
