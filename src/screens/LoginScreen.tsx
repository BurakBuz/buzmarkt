import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList, RootStackParamList} from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../services/api';
import {commonStyles, colors} from '../styles/theme';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<
    NativeStackNavigationProp<AuthStackParamList & RootStackParamList>
  >();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await login({email, password});
      await AsyncStorage.setItem('userToken', response.token);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        'Invalid email or password. Please try again.',
      );
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Image
        source={require('../assets/buz.png')}
        style={commonStyles.logo}
        resizeMode="contain"
      />
      <Text style={commonStyles.title}>Login</Text>
      <Text style={commonStyles.subtitle}>Enter your email and password</Text>

      <View style={commonStyles.inputContainer}>
        <TextInput
          style={[commonStyles.input, !email && commonStyles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
        <View style={commonStyles.passwordContainer}>
          <TextInput
            style={[commonStyles.input, commonStyles.passwordInput, !password && commonStyles.inputError]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={commonStyles.eyeIcon}
            disabled={loading}>
            <Text>{showPassword ? '👁️' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[commonStyles.button, loading && commonStyles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={commonStyles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={commonStyles.navigationContainer}>
        <Text style={commonStyles.navigationText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={commonStyles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
