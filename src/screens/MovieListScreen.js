import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import Card from '../components/Card';
import {API_KEY, BASE_URL} from '../config';
import Favorite from '../icons/Favorite';
import {addFavorites, deleteFavorites} from '../redux/actions/favoritesActions';
import {useDispatch, useSelector} from 'react-redux';
import {notifier} from '../utils/notifier';

const MovieListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {favorites} = useSelector(state => state.favoritesReducer);
  const [movies, setMovies] = useState([]);
  const [nextPageLoading, setNextPageLoading] = useState(false);
  const [lastPageApi, setLastPageApi] = useState(false);
  const [lastPage, setLastPage] = useState(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Movie List',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Favorites');
          }}>
          <Favorite stroke={'#FFFFFF'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = (page = 1, loadMore = false) => {
    let url = `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`;
    axios
      .get(url)
      .then(response => {
        if (loadMore === true) {
          setMovies(movies.concat(response.data.results));
        } else {
          setMovies(response.data.results);
        }
        if (response.data.count === 0) {
          setLastPageApi(true);
        }
        setLastPage(page);
        setNextPageLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const loadMore = async () => {
    if (!lastPageApi) {
      setNextPageLoading(true);
      getMovie(lastPage + 1, true);
    }
  };

  const renderFooter = () => {
    if (!nextPageLoading) {
      return null;
    }
    return (
      <ActivityIndicator
        size={'large'}
        color={'#FFFFFF'}
        style={styles.activityIndicator}
      />
    );
  };

  const handleAddFavorite = item => {
    const selected = favorites.some(favorite => favorite.id === item.id);
    if (selected) {
      dispatch(deleteFavorites(item.id));
      notifier(
        'Success',
        'Successfully removed from your favorites',
        'success',
      );
    } else {
      dispatch(addFavorites(item));
      notifier('Success', 'Successfully added to your favorites', 'success');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        style={styles.listContainer}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <Card
            {...item}
            key={index}
            onPress={() =>
              navigation.navigate('MovieDetail', {
                id: item.id,
                selected: item.selected,
              })
            }
            onPressFavorite={() => handleAddFavorite(item)}
            fill={
              favorites.some(favorite => favorite.id === item.id)
                ? '#000000'
                : 'none'
            }
          />
        )}
        //Sayfalama
        onEndReached={loadMore}
        onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 5}
        ListFooterComponent={renderFooter()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#000000',
  },
  listContainer: {},
  activityIndicator: {
    marginTop: 10,
    color: '#FFFFFF',
  },
});

export default MovieListScreen;
