import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList, RootStackParamList} from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signup} from '../services/api';
import {SignupSchema} from '../utils/validation';
import {Formik} from 'formik';
import {commonStyles, colors} from '../styles/theme';

const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<
    NativeStackNavigationProp<AuthStackParamList & RootStackParamList>
  >();

  return (
    <ScrollView contentContainerStyle={[commonStyles.container, {width: '100%'}]}>
      <View style={[commonStyles.container, {width: '100%'}]}>
        <Image
          source={require('../assets/buz.png')}
          style={commonStyles.logo}
          resizeMode="contain"
        />
        <Text style={commonStyles.title}>Sign Up</Text>
        <Text style={commonStyles.subtitle}>Enter your credentials to continue</Text>

        <Formik
          initialValues={{email: '', password: '', username: ''}}
          validationSchema={SignupSchema}
          onSubmit={async (values, {setSubmitting}) => {
            try {
              const response = await signup(values);
              await AsyncStorage.setItem('userToken', response.token);
              navigation.replace('Main');
            } catch (error) {
              Alert.alert(
                'Registration Failed',
                'Registration process failed. Please try again.',
              );
              console.error('Signup error:', error);
            } finally {
              setSubmitting(false);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={[commonStyles.inputContainer, {width: '100%'}]}>
              <TextInput
                style={[
                  commonStyles.input,
                  touched.username && errors.username && commonStyles.inputError,
                ]}
                placeholder="Username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                autoCapitalize="none"
                editable={!isSubmitting}
              />
              {touched.username && errors.username && (
                <Text style={commonStyles.errorText}>{errors.username}</Text>
              )}

              <TextInput
                style={[
                  commonStyles.input,
                  touched.email && errors.email && commonStyles.inputError,
                ]}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isSubmitting}
              />
              {touched.email && errors.email && (
                <Text style={commonStyles.errorText}>{errors.email}</Text>
              )}

              <View style={[commonStyles.passwordContainer, {width: '100%'}]}>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.passwordInput,
                    touched.password && errors.password && commonStyles.inputError,
                  ]}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={!showPassword}
                  editable={!isSubmitting}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={commonStyles.eyeIcon}
                  disabled={isSubmitting}>
                  <Text>{showPassword ? '👁️' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={commonStyles.errorText}>{errors.password}</Text>
              )}

              <View style={commonStyles.termsContainer}>
                <Text style={commonStyles.termsText}>
                  By continuing you agree to our{' '}
                  <Text style={commonStyles.linkText}>Terms of Service</Text> and{' '}
                  <Text style={commonStyles.linkText}>Privacy Policy</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={[commonStyles.button, isSubmitting && commonStyles.disabledButton]}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={commonStyles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View style={commonStyles.navigationContainer}>
          <Text style={commonStyles.navigationText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={commonStyles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen; 