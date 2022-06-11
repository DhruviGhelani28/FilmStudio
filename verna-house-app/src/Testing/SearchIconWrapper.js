
import styled from "@emotion/styled";
const SearchIconWrapper = props => {
    const fun2 = styled('div')(
        ({ theme }) => ({
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }));
    return({fun2})
};
export default SearchIconWrapper;