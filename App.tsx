import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContactProvider, useContacts } from './src/utils/ContactContext';
import ContactListItem from './src/components/common/ContactListItem';
import AddContactScreen from './src/screens/AddContact/AddContactScreen';
import ContactDetails from './src/screens/ContactDetails/ContactDetails';

const Stack = createNativeStackNavigator();

function ContactListScreen({ navigation }) {
  const { contacts } = useContacts();
  const [searchInput, setSearchInput] = useState('');
  const [filteredContact, setFilteredContact] = useState(contacts);

  useEffect(() => {
    setFilteredContact(contacts);
  }, [contacts]);

  const handlePress = item => {
    navigation.navigate('ContactDetails', { contactId: item.id });
  };

  const handleFavoritePress = id => {
    console.log('Favorite pressed', id);
  };
  const handleCallPress = phone => {
    console.log('Call', phone);
  };
  const handleMessagePress = phone => {
    console.log('Message', phone);
  };

  const handleSearch = text => {
    setSearchInput(text);
    const filtered = contacts.filter(contact =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(text.toLowerCase()),
    );
    setFilteredContact(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={searchInput}
        placeholder="Enter search keywords"
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredContact}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactListItem
            contact={item}
            onPress={() => handlePress(item)}
            onFavoritePress={handleFavoritePress}
            onCallPress={handleCallPress}
            onMessagePress={handleMessagePress}
          />
        )}
      />
      <Button
        title="Add contact"
        onPress={() => navigation.navigate('AddContact')}
      />
    </View>
  );
}

export default function App() {
  return (
    <ContactProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ContactList"
            component={ContactListScreen}
            options={{ title: 'Contacts' }}
          />
          <Stack.Screen
            name="AddContact"
            component={AddContactScreen}
            options={({ route }) => ({
              title: route?.params?.contact ? 'Edit Contact' : 'Add Contact',
            })}
          />
          <Stack.Screen name="ContactDetails" component={ContactDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
  },
  searchInput: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
