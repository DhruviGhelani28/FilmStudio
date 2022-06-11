import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Stack from '@mui/material/Stack';

const Input = styled('input')({
    display: 'none',
});

export default function UploadButton(props) {
    return (

        <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera className={props.className}/>
            </IconButton>
        </label>

    );
}