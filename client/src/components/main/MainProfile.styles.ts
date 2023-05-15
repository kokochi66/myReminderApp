import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
      },
      profileName: {
        marginLeft: 12,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 4,
      },
});