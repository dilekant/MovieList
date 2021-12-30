import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {API_KEY, BASE_URL, IMAGE_URL} from "../config";
import axios from "axios";
import FavoriteButton from "../components/FavoriteButton";
import Star from "../icons/Star";
import {addFavorites, deleteFavorites} from "../actions/counterActions";
import {useDispatch, useSelector} from "react-redux";

const MovieDetailScreen = ({navigation, route}) => {
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const { favorites } = useSelector(state => state.counterReducer);
    const [detail, setDetail] = useState([]);
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerRight: () => <FavoriteButton fill={isFavorite ? '#000000' : 'none'} onPress={() => handleAddFavorite()} />,
        });
    }, [navigation, detail, isFavorite]);

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
                if(favorites.some(favorite => favorite.id === response.data.id)) {
                    setIsFavorite(true);
                }
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

    const renderGenres = () => {
        return detail?.genres?.map((item, key) => {
            return (
                <Text key={key} style={styles.genresText}>
                    {item.name}
                    {detail?.genres?.length === key + 1 ? '' : ', '}
                </Text>
            );
        });
    };

    const handleAddFavorite = () => {
        if(isFavorite) {
            setIsFavorite(false);
            dispatch(deleteFavorites(detail.id));
        } else {
            setIsFavorite(true);
            dispatch(addFavorites(detail));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.carousel}>
                <ScrollView
                    horizontal={true}
                    ref={scrollRef}
                    scrollEnabled={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                        const {contentOffset} = e.nativeEvent;
                        const viewSize = e.nativeEvent.layoutMeasurement;
                        const pageNum = parseInt(contentOffset.x / viewSize.width);
                        setIndex(pageNum);
                    }}
                >
                    {images.map((i, k) => {
                        return(
                            <View key={k} style={styles.imageContainer}>
                                <Image source={{uri: `${IMAGE_URL}${i.file_path}`}} style={styles.image} />
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={styles.content}>
                <View style={styles.infoContainer}>
                    <Image source={{uri: `${IMAGE_URL}${detail?.poster_path}`}} style={styles.imagePoster} />
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>{detail?.title}</Text>
                        <View>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                {renderGenres()}
                            </ScrollView>
                        </View>
                        <View style={styles.averageContainer}>
                            <Star width={18} height={18} stroke={'#555353'} />
                            <Text style={styles.starText}>{(detail?.vote_average) / 2}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.descText}>{detail?.overview}</Text>
            </View>
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
    carousel: {
        position: 'absolute',
    },
    arrowLeft: {
        bottom: 10,
        left: width*0.3,
        position: 'absolute',
        marginTop: 85,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowRight: {
        bottom: 10,
        right: width*0.3,
        position: 'absolute',
        marginTop: 85,
    },
    rightIcon: {
        transform: [{ rotate: '180deg' }]
    },
    imageContainer: {
        height: 200,
        width: width,
    },
    image: {
        height: '100%',
        width: '100%'
    },
    content: {
        marginTop: 220,
        paddingHorizontal: 20,
    },
    infoContainer: {
        flexDirection: 'row',
    },
    imagePoster: {
        height: 100,
        width: 75,
        borderRadius: 8,
    },
    textContainer: {
        marginLeft: 20,
        flex: 1,
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    genresText: {
        marginTop: 5,
        color: '#555353',
        fontSize: 14,
    },
    averageContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    starText: {
        marginLeft: 5,
        color: '#555353',
        fontSize: 14,
    },
    descText: {
        marginTop: 20,
        color: '#555353',
    },
});

export default MovieDetailScreen;
