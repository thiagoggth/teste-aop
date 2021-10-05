import { useField } from '@unform/core';
import React, { useCallback, useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

const StyledCustomInput = styled.TextInput`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.54);
`;

const InputLabelText = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
`;


export interface CustomCustomInputProps extends TextInputProps {
  name: string;
  label?: string;
}

export const CustomTextInput = ({ name, label, onChangeText, ...rest }: CustomCustomInputProps) => {
  const inputRef = useRef<any>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    if(!inputRef.current) return;
    inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);
  const handleChangeText = useCallback(
    text => {
      if (inputRef.current) inputRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText],
  );
  return (
    <>
      {label && <InputLabelText>{label}</InputLabelText>}
      <StyledCustomInput
        ref={inputRef}
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        {...rest}
      />
    </>
  );
}

