import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Geçersiz e-posta').required('Zorunlu'),
  password: Yup.string().min(6, 'En az 6 karakter').required('Zorunlu'),
});

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post('https://reqres.in/api/login', values);
      dispatch(loginSuccess(response.data.token));
      console.log('Giriş başarılı');
    } catch (error) {
      console.log('Giriş başarısız', error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="E-posta"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              placeholder="Şifre"
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Button title="Giriş Yap" onPress={handleSubmit as () => void} />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 100 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', marginBottom: 10 },
});

export default LoginScreen;
