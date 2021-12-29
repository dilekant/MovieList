import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Favorite from "../icons/Favorite";

const FavoriteButton = ({style, fill, onPress}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.favoriteButton, style]}>
            <Favorite fill={fill} width={15} height={15} stroke={'#000000'} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    favoriteButton: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FavoriteButton;
