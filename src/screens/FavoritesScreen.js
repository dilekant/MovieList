import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import Card from "../components/Card";

const FavoritesScreen = ({favorites}) => {
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
                        onPressFavorite={() => console.log('likeee')}
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

export default connect(mapStateToProps)(FavoritesScreen);
