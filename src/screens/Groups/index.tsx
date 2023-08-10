import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Container } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { getAllGroups } from '@storage/group/getAllGroups';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const data = await getAllGroups()

      setGroups(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Turmas', 'Não foi possível carregar as turmas.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    console.log("useEffect aa")
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='jogue com a sua turma' />
      {isLoading ? <Loading /> :
        <FlatList
          data={groups}
          keyExtractor={item => item}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message='Que tal cadastrar a primeira turma?' />
          )}
        />
      }
      <Button title='Criar nova turma' onPress={handleNewGroup} />
    </Container>
  );
}
