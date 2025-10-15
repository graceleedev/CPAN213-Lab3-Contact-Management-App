/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react'
import { StyleSheet, View, FlatList, Text, TextInput } from 'react-native';

import ContactListItem from './src/components/common/ContactListItem'
import { sampleContacts } from './src/data/contactsData.js'

const contact = sampleContacts;

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredContact, setFilteredContact] = useState(contact);

  const handlePress = (item) => {
    console.log('Pressed', item);
  };
  const handleFavoritePress = (id) => {
    console.log('Favorite pressed', id);
  };
  const handleCallPress = (phone) => {
    console.log('Call', phone);
  };
  const handleMessagePress = (phone) => {
    console.log('Message', phone);
  };
  // console.log(searchInput);
  const handleSearch = (text) => {
  setSearchInput(text);
  const filtered = contact.filter(contact =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(text.toLowerCase())
  );
  setFilteredContact(filtered);
};


  return (
    <View style={styles.container}>
      <TextInput
        value={searchInput}
        placeholder="Enter search keywords"
        onChangeText={(text) => handleSearch(text)}
        />
      <FlatList
        data={filteredContact}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactListItem
            contact={item}
            onPress={handlePress}
            onFavoritePress={handleFavoritePress}
            onCallPress={handleCallPress}
            onMessagePress={handleMessagePress}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    backgroundColor: 'beige',
  },
});

export default App;
