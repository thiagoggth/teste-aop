import React from 'react';
import CreateForm from './CreateForm';
import * as S from './styles';

const CreateInventory= () => {
  return (
    <S.CreateInventoryWrapper>
      <S.Title>Create inventory</S.Title>
        <CreateForm />
    </S.CreateInventoryWrapper>
  )
}

export default CreateInventory;
