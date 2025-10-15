import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useContacts } from '../../utils/ContactContext';

const ContactDetails = ({ route, navigation }) => {
  const { contactId } = route.params;
  const { contacts, deleteContact, toggleFavorite } = useContacts();

  const contact = contacts.find(c => c.id === contactId);

  if (!contact) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Contact not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {contact.firstName} {contact.lastName}
        </Text>

        <TouchableOpacity onPress={() => toggleFavorite(contact.id)}>
          <Icon
            name={contact.favorite ? 'star' : 'star-border'}
            size={28}
            color={contact.favorite ? 'gold' : 'gray'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{contact.phone || '-'}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{contact.email || '-'}</Text>

        <Text style={styles.label}>Company</Text>
        <Text style={styles.value}>{contact.company || '-'}</Text>

        <Text style={styles.label}>Notes</Text>
        <Text style={styles.value}>{contact.notes || '-'}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() =>
            navigation.navigate('AddContact', { contact: contact })
          }
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteContact(contact.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notFound: { fontSize: 18, color: 'gray' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: { fontSize: 24, fontWeight: '600' },
  infoSection: { marginBottom: 40 },
  label: { fontSize: 14, color: 'gray', marginTop: 10 },
  value: { fontSize: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-around' },
  button: {
    padding: 12,
    borderRadius: 8,
    width: 120,
    alignItems: 'center',
  },
  editButton: { backgroundColor: '#007bff' },
  deleteButton: { backgroundColor: '#ff4d4d' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default ContactDetails;
