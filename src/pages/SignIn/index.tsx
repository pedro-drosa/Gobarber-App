import React, {useCallback, useRef} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  interface SignInFormData {
    email: string;
    password: string;
  }

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schemma = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schemma.validate(data, {
          abortEarly: false,
        });

        // signIn({
        //   email: data.email,
        //   password: data.password,
        // });

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer login, verifique as credenciais",
        );
      }
    }, []);

  return (
    <>
      <KeyboardAvoidingView
      style={{flex:1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex:1}}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu Logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn} style={{width: '100%'}}>
              <Input
                autoCorrect = {false}
                autoCapitalize = "none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing = {()=>{
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing = {()=>{
                  formRef.current?.submitForm();
                }}
              />
              <Button onPress={()=>{
                formRef.current?.submitForm();
              }}>Entrar</Button>
            </Form>
              <ForgotPassword onPress={()=>{}}>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
              </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={()=> navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20}  color="#ff9000"/>
        <CreateAccountButtonText>Criar uma Conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}

export default SignIn;
