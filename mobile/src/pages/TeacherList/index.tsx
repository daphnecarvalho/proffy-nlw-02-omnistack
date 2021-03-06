import React, { useState } from 'react';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../Services/api';

import styles from './styles';

function TeacherList() {
    const [isFilterVisible, setIsFiltersVisible] = useState(true);

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
    
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    )

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFilterVisible);
    }

    async function handleFiltersSubmit() {
        console.log({
            subject, 
            week_day,
            time
        });

        loadFavorites();
        
        const response = await api.get('classes', {
            params: {
                subject, 
                week_day,
                time
            }
        });

        console.log(response.data);

        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                { isFilterVisible && 
                    (
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <TextInput 
                                placeholderTextColor="#C1BCCC" 
                                style={styles.input} 
                                placeholder="Qual a matéria?"
                                value={subject} 
                                onChangeText={text => setSubject(text)}
                            />

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da Semana</Text>
                                    <TextInput 
                                        placeholderTextColor="#C1BCCC" 
                                        style={styles.input} 
                                        placeholder="Qual o dia?"
                                        value={week_day} 
                                        onChangeText={text => setWeekDay(text)}
                                    />
                                </View>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput 
                                        placeholderTextColor="#C1BCCC" 
                                        style={styles.input} 
                                        placeholder="Qual horário?"
                                        value={time} 
                                        onChangeText={text => setTime(text)}
                                    />
                                </View>
                            </View>

                            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                                <Text style={styles.submitButtonText}>Filtrar</Text>
                            </RectButton>
                        </View>
                    )
                }
            </PageHeader>

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}
                    />;
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;