import React, {useEffect, useLayoutEffect, useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import Card from "../components/Card";
import {API_KEY, BASE_URL} from "../config";

const MovieListScreen = ({navigation}) => {
    const [movies, setMovies] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Movie List',
            headerRight: () => (
                <TouchableOpacity onPress={() => {navigation.navigate('Favorites')}}>
                    <Text>Favorite</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        getMovie();
    }, []);

    const getMovie = () => {
        console.log('get axios');
        let url = `${BASE_URL}movie/popular?api_key=${API_KEY}`;
        axios
            .get(url)
            .then(response => {
                console.log(response.data.results);
                setMovies(response.data.results);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={movies}
                style={styles.listContainer}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                    <Card {...item} key={index} onPress={() => navigation.navigate('MovieDetail', {id: item.id})} />
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
    listContainer: {

    },
});

export default MovieListScreen;
