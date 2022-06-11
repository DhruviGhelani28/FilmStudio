
// import { alpha } from "@mui/material/styles";
import { styled, alpha } from '@mui/material/styles';

const Search = props => {
    const fun = styled('div')(
        ({ theme }) => ({
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            }
    }));
    return({fun})

};
export default Search;