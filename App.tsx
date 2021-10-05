import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { AuthProvider } from './src/contexts/auth.context';
import CreateInventory from './src/screens/CreateInventory';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <ScrollView>
      <AuthProvider>
        <CreateInventory />
      </AuthProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
