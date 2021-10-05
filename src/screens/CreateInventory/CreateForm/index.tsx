import { Form } from '@unform/mobile';
import React, { useRef } from 'react';
import { CustomTextInput } from '../../../components/FormComponents';
import * as S from './styles';

const CreateForm = () => {
  const formRef = useRef<any>(null);

  const handleSubmit = (data: any) => {
    console.log(data);
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
    <S.FormWrapper>
      <CustomTextInput label="location" name='location' />
      <CustomTextInput label="room" name='room' />
      <CustomTextInput label="active type" name='activeType' />
      <CustomTextInput label="subActive" name='room' />
      <CustomTextInput label="tag" name='tag' />
      <CustomTextInput label="patrimony number" name='patrimonyNumber' />
      <CustomTextInput label="serialNumber" name='room' />
      <CustomTextInput label="description" name='description' />
      <S.ActionWrapper>
        <S.CreateButton activeOpacity={0.8} onPress={() => formRef?.current.submitForm()}>
          <S.CreateButtonText>
            Cadastrar nova vistoria
          </S.CreateButtonText>
        </S.CreateButton>
      </S.ActionWrapper>
    </S.FormWrapper>
    </Form>
  )
}

export default CreateForm;
