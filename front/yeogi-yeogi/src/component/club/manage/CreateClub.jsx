import React from 'react';
import styled from 'styled-components';

const StyledCreateClubdiv = styled.div`
    &{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 70px;
        margin-bottom: 70px;
        div{
            width: 600px;
            height: 800px;
            background-color: pink;
            display: grid;
            
        }
    }
`;

const CreateClub = () => {

    return (
        <StyledCreateClubdiv>
                <div>

                </div>
        </StyledCreateClubdiv>
    );
};

export default CreateClub;