import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import Card from "../components/Card";
import {addFavorites, deleteFavorites} from "../actions/counterActions";

const FavoritesScreen = ({navigation, favorites, addFavorites, deleteFavorites}) => {

    const handleAddFavorite = (item) => {
        const selected = favorites.filter(favorite => favorite.id === item.id).length !== 0;
        if(selected) {
            deleteFavorites(item.id);
        } else {
            addFavorites(item);
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
                        fill={favorites.filter(favorite => favorite.id === item.id).length !== 0 ? '#000000' : 'none'}
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

const mapStateToProps = (state, ownProps) => {
    return {
        favorites: state.counterReducer.favorites,
    }
}

const mapDispatchToProps = {addFavorites, deleteFavorites};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
