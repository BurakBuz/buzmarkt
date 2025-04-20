import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // 2 saniyelik yapay gecikme ekleyelim ki splash screen görülebilsin
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (userToken) {
        // Kullanıcı giriş yapmış
        navigation.replace('Main');
      } else {
        // Kullanıcı giriş yapmamış
        navigation.replace('Auth');
      }
    } catch (error) {
      console.error('Authentication check error:', error);
      navigation.replace('Auth');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/buz.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Buzmarkt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SplashScreen; 