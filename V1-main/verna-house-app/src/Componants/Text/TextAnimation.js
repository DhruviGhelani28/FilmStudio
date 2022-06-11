// import { keyframes } from "@emotion/react";
import React from "react";
import styled, {keyframes} from "styled-components";

const TextAnimation = () => {
    const string = " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a \n Lorem Ipsum is simply dummy text of the printing and type-setting industry. Lorem Ipsum has been the < br /> industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a \n Lorem Ipsum is simply dummy text of the printing and type-setting industry. Lorem Ipsum has been the < br /> industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a \n "
    const text1 = string.split("\n")
    return (
        <Wrapper>
            {text1.map((item, index) =>
                <span key={index}>{item}</span>
           )}
        </Wrapper>
    )
}
export default TextAnimation;

const animation = keyframes`
    0% {opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px); }
    25% {opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);}
    75% {opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);}
    100% {opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px);}
`

const Wrapper = styled.span`
    display: inline-block;
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 7s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;

`