import React, { useEffect, useState, useRef } from 'react';

import {
    View, Text, StyleSheet, TextInput,
    TouchableOpacity, FlatList, Image, Button,
} from 'react-native';

import { api } from '../../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

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


export function Search({ id, attributes }: DataProps) {
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

                const { data: response } = await api.get('/anime?filter[text]=cowboy%20bebop');
                const dadosDoctor = response.data.map((data: DataProps) => {
                    return {
                        id: data.id,
                        image: data.attributes.posterImage.tiny,
                        titles: data.attributes.titles.en,
                        sinopse: data.attributes.synopsis
                    }
                })
                setData(dadosDoctor);
                console.log(data)
            } catch (error: any) {
                console.error(error.message);
            }
            setLoading(false);
        }
        console.log(data)

        fetchData();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.viewSearch}>
                <TextInput
                    style={styles.input}

                />
                <TouchableOpacity style={styles.icon}>
                    <Icon name="search" color="#FF00FF" size={40} />
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <View>
                        <View>
                            <Image
                                source={{ uri: item.image }}
                            />
                        </View>
                        <Text> {item.titles}</Text>
                    </View>
                }
            />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#696969'
    },
    viewSearch: {
        marginTop: 20,
        backgroundColor: '#696969',
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
        backgroundColor: '#696969',
        color: '#FFF'
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 15,
    },
})

