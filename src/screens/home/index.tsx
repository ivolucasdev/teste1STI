import React, { useEffect, useState } from 'react';
import {
  View, ScrollView, Text, StyleSheet, Dimensions, ImageBackground,
  TextInput, TouchableOpacity, Image, FlatList, SafeAreaView
} from 'react-native';

import { api } from '../../services/api';

interface DataProps {
  id: string,

  attributes: {
    posterImage: {
      large: string
    },
    titles: {
      en: string
    }
  }

}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function Home() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [anime, setAnime] = useState()
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const { data: response } = await api.get('/anime');
        const dadosDoctor = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            image: data.attributes.posterImage.large,
            titles: data.attributes.titles.en
          }
        })
        setData(dadosDoctor);
        console.log(dadosDoctor, 'dados')
        console.log(data, 'data')
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
      />
    </SafeAreaView>
  )
}

