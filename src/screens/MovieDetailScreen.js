import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {API_KEY, BASE_URL, IMAGE_URL} from "../config";
import axios from "axios";
import Favorite from "../icons/Favorite";
import FavoriteButton from "../components/FavoriteButton";

const MovieDetailScreen = ({navigation, route}) => {
    const scrollRef = useRef();
    const [detail, setDetail] = useState([]);
    const [images, setImages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerRight: () => <FavoriteButton onPress={() => console.log('likeee')} />,
        });
    }, [navigation]);

    useEffect(() => {
        getDetail();
        getImages();
    }, [route]);

    const getDetail = () => {
        let url = `${BASE_URL}movie/${route.params.id}?api_key=${API_KEY}`;
        axios
            .get(url)
            .then(response => {
                setDetail(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const getImages = () => {
        let url = `${BASE_URL}movie/${route.params.id}/images?api_key=${API_KEY}`;
        axios
            .get(url)
            .then(response => {
                setImages(response.data.backdrops);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flex: 1}}
                horizontal={true}
                scrollEnabled={true}
                ref={scrollRef}
                pagingEnabled={true}
                onMomentumScrollEnd={(e) => {
                    const {contentOffset} = e.nativeEvent;
                    const viewSize = e.nativeEvent.layoutMeasurement;
                    const pageNum = parseInt(contentOffset.x / viewSize.width);
                    //console.log(pageNum);
                }}
            >
                {images?.map((i, k) => {
                    return(
                        <View style={styles.imageContainer}>
                            <Image source={{uri: `${IMAGE_URL}${i.file_path}`}} style={styles.image} />
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    favoriteButton: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        backgroundColor: 'red',
    },
    imageContainer: {
        flex: 1,
        height: 200,
        width: width,
        backgroundColor: 'green',
    },
    image: {
        height: '100%',
        width: '100%'
    },
});

export default MovieDetailScreen;
