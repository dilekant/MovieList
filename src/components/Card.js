import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {IMAGE_URL} from '../config';
import FavoriteButton from "./FavoriteButton";

const Card = ({title, overview, poster_path,  onPress, onPressFavorite}) => {
    return(
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.card}>
            <View style={styles.container}>
                <Text style={styles.titleText}>{title}</Text>
                <View style={styles.line} />
                <Text numberOfLines={3} style={styles.descriptionText}>{overview}</Text>
            </View>
            <Image source={{uri: `${IMAGE_URL}${poster_path}`}} style={styles.image} />
            <FavoriteButton style={styles.favoriteButton} onPress={onPressFavorite} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 185,
        marginTop: 20,
        borderRadius: 8,
    },
    image: {
        marginLeft: 15,
        position: 'absolute',
        height: 175,
        width: 120,
    },
    container: {
        backgroundColor: '#555353',
        borderRadius: 5,
        height: 150,
        marginTop:  35,
        paddingLeft: 160,
        paddingRight: 15,
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 15,
    },
    line: {
        marginVertical: 10,
        height: 1.5,
        width: '100%',
        backgroundColor: '#000000',
    },
    descriptionText: {
        color: 'white',
        fontSize: 13,
    },
    favoriteButton: {
        position: 'absolute',
        right: 8,
        top: 20,
    },
});

export default Card;
