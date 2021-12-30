import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Card from "../components/Card";
import {addFavorites, deleteFavorites} from "../actions/counterActions";

const FavoritesScreen = ({navigation}) => {
    const favorites = useSelector(state => state.counterReducer.favorites);
    const dispatch = useDispatch();

    const handleAddFavorite = (item) => {
        const selected = favorites.some(favorite => favorite.id === item.id);
        if(selected) {
            dispatch(deleteFavorites(item.id));
        } else {
            dispatch(addFavorites(item));
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                style={styles.listContainer}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                    <Card
                        {...item}
                        key={index}
                        onPress={() => navigation.navigate('MovieDetail', {id: item.id})}
                        onPressFavorite={() => handleAddFavorite(item)}
                        fill={favorites.some(favorite => favorite.id === item.id) ? '#000000' : 'none'}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#000000',
    },
    listContainer: {},
});

export default FavoritesScreen;
