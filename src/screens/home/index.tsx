import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ImageBackground,
  TouchableOpacity, Image, TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Carousel from 'react-native-snap-carousel';

import { api } from '../../services/api';

interface DataProps {
  id: string,

  attributes: {
    posterImage: {
      tiny: string
    },
    titles: {
      en: string
    },
    synopsis: string
  }

}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function Home({ id, attributes, }: DataProps) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataProps[]>([])
  const [anime, setAnime] = useState([])
  const carouselRef = useRef(null);
  const [background, setBackground] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const { data: response } = await api.get('/anime');
        const dadosDoctor = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            image: data.attributes.posterImage.tiny,
            titles: data.attributes.titles.en,
            sinopse: data.attributes.synopsis
          }
        })
        setData(dadosDoctor);
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);


  return (
    <Carousel
      style={styles.carousel}
      ref={carouselRef}
      data={data}
      renderItem={({ item }) =>
        <ImageBackground style={styles.viewbackground}
          source={{ uri: item.image }}
          blurRadius={8}
        >
          <TouchableOpacity>
            <View style={styles.viewSearch}>
            <TextInput
                style={styles.input}               
              />
              
              <Icon name="search" color="#FF00FF" size={40} />
            </View>
          </TouchableOpacity>


          <View style={styles.viewimg}>
            <Image style={styles.capafilmes}
              source={{ uri: item.image }}
            />
            <View style={styles.textView}>
              <Text style={styles.textTitle}> {item.titles}</Text>
            </View>
          </View>
        </ImageBackground>
      }
      sliderWidth={screenWidth}
      itemWidth={420}
      inactiveSlideOpacity={1}
      onSnapToItem={(index) => {
        setBackground(data);
        setActiveIndex(index);
      }}
    />
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  capafilmes: {
    width: 300,
    height: 500,
    borderRadius: 8,
  },
  viewbackground: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',

  },
  viewimg: {
    alignItems: 'center',
    justifyContent: 'center',


  },
  carousel: {
    flex: 1,
    overflow: 'visible'
  },
  textTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#FFF",

  },
  textView: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#ff1493",
    alignItems: 'center',

  },
  viewSearch: {
    marginTop: 20,
    backgroundColor: '#FFF',
    elevation: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  input: {
    width: '90%',
    padding: 13,
    paddingLeft: 20,
    fontSize: 17,
  },
  carouselIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },

})

